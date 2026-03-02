#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_JSON="$ROOT_DIR/config/book1_scene_prompts.json"
OUT_DIR="$ROOT_DIR/web/assets/book1_scenes_hd"
MODEL="${MODEL:-gpt-image-1}"
SIZE="${SIZE:-1536x1024}"
ENV_LOCAL="$ROOT_DIR/.env.local"

mkdir -p "$OUT_DIR"

if [[ -f "$ENV_LOCAL" ]]; then
  # shellcheck disable=SC1090
  source "$ENV_LOCAL"
  export OPENAI_API_KEY
fi

if ! command -v openai >/dev/null 2>&1; then
  echo "openai CLI not found." >&2
  exit 1
fi

if [[ ! -f "$PROMPTS_JSON" ]]; then
  echo "Missing prompt file: $PROMPTS_JSON" >&2
  exit 1
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is not set. Export it or place it in $ENV_LOCAL as OPENAI_API_KEY=..." >&2
  exit 1
fi

python3 - <<'PY' "$PROMPTS_JSON" "$OUT_DIR" "$MODEL" "$SIZE"
import json, base64, os, sys, urllib.request, urllib.error
prompts_path, out_dir, model, size = sys.argv[1:]
with open(prompts_path, 'r', encoding='utf-8') as f:
    prompts = json.load(f)

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    print("OPENAI_API_KEY is missing in python process", file=sys.stderr)
    sys.exit(1)

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
        with urllib.request.urlopen(req, timeout=180) as resp:
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
        b64 = first['b64_json']
        with open(out_png, 'wb') as img_f:
            img_f.write(base64.b64decode(b64))
    elif 'url' in first:
        try:
            with urllib.request.urlopen(first['url'], timeout=180) as r:
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
