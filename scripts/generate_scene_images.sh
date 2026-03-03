#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_JSON="${1:-}"
OUT_DIR="${2:-}"
MODEL="${MODEL:-gpt-image-1}"
SIZE="${SIZE:-1536x1024}"
ENV_LOCAL="$ROOT_DIR/.env.local"

if [[ -z "$PROMPTS_JSON" || -z "$OUT_DIR" ]]; then
  echo "Usage: $0 <prompts-json-path> <output-dir>" >&2
  exit 1
fi

if [[ "$PROMPTS_JSON" != /* ]]; then
  PROMPTS_JSON="$ROOT_DIR/$PROMPTS_JSON"
fi
if [[ "$OUT_DIR" != /* ]]; then
  OUT_DIR="$ROOT_DIR/$OUT_DIR"
fi

mkdir -p "$OUT_DIR"

if [[ -f "$ENV_LOCAL" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_LOCAL"
  export OPENAI_API_KEY
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is not set. Put it in $ENV_LOCAL as OPENAI_API_KEY=..." >&2
  exit 1
fi

python3 - <<'PY' "$PROMPTS_JSON" "$OUT_DIR" "$MODEL" "$SIZE"
import json, base64, os, sys, urllib.request, urllib.error
prompts_path, out_dir, model, size = sys.argv[1:]
with open(prompts_path, 'r', encoding='utf-8') as f:
    prompts = json.load(f)

api_key = os.environ.get("OPENAI_API_KEY")
endpoint = "https://api.openai.com/v1/images/generations"

for item in prompts:
    sid = item['id']
    prompt = item['prompt']
    out_png = os.path.join(out_dir, f"{sid}.png")

    payload = json.dumps({
        "model": model,
        "prompt": prompt,
        "n": 1,
        "size": size
    }).encode("utf-8")

    req = urllib.request.Request(
        endpoint,
        data=payload,
        method="POST",
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    )

    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"Failed: {sid}\nHTTP {e.code}: {body}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Failed: {sid}\n{e}", file=sys.stderr)
        sys.exit(1)

    if "data" not in data or not data["data"]:
        print(f"Unexpected response for {sid}: {data}", file=sys.stderr)
        sys.exit(1)

    first = data["data"][0]
    if 'b64_json' in first:
        with open(out_png, 'wb') as img_f:
            img_f.write(base64.b64decode(first['b64_json']))
    elif 'url' in first:
        try:
            with urllib.request.urlopen(first['url'], timeout=240) as r:
                with open(out_png, "wb") as f:
                    f.write(r.read())
        except Exception as e:
            print(f"Failed downloading image URL for {sid}:\n{e}", file=sys.stderr)
            sys.exit(1)
    else:
        print(f"Unexpected image payload for {sid}: missing b64_json/url", file=sys.stderr)
        sys.exit(1)

    print(f"Generated {out_png}")
PY

echo "All images generated in $OUT_DIR"
