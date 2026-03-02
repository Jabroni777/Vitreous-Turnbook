const MAX_STAT = 10;
const MIN_STAT = 0;
const SKINS = ["patina", "amber", "abyss"];
const AUTO_CYCLE_MS = 4500;
const SKIN_THEME_VARS = {
  patina: {
    "--bg-0": "#071718",
    "--bg-1": "#0e2d31",
    "--bg-2": "#2f7b78",
    "--bg-3": "#6a4c33",
    "--ink": "#f4ecdf",
    "--muted": "#c7b8a6",
    "--panel": "rgba(8, 18, 20, 0.78)",
    "--panel-edge": "rgba(203, 180, 147, 0.34)",
    "--accent-1": "#d8834b",
    "--accent-2": "#7eb8a4",
    "--accent-3": "#9ed2c4",
    "--screen-glow": "rgba(113, 179, 155, 0.42)"
  },
  amber: {
    "--bg-0": "#18120a",
    "--bg-1": "#3a2917",
    "--bg-2": "#5f3f26",
    "--bg-3": "#8f6a2f",
    "--ink": "#f8edd9",
    "--muted": "#dbc4a1",
    "--panel": "rgba(31, 19, 10, 0.8)",
    "--panel-edge": "rgba(218, 163, 95, 0.44)",
    "--accent-1": "#e19a4a",
    "--accent-2": "#c9a457",
    "--accent-3": "#f2cf92",
    "--screen-glow": "rgba(218, 146, 75, 0.35)"
  },
  abyss: {
    "--bg-0": "#03080f",
    "--bg-1": "#0a1f2f",
    "--bg-2": "#0f3f4d",
    "--bg-3": "#1a3247",
    "--ink": "#e9f2f6",
    "--muted": "#a8c2ce",
    "--panel": "rgba(7, 14, 21, 0.84)",
    "--panel-edge": "rgba(115, 170, 194, 0.35)",
    "--accent-1": "#4eb1ca",
    "--accent-2": "#7ad3c7",
    "--accent-3": "#96d8eb",
    "--screen-glow": "rgba(59, 170, 220, 0.34)"
  }
};
const SKIN_TRANSITION_MS = 2200;

const BOOKS = [
  { id: "hallux", title: "Her Unbound Hallux" },
  { id: "secretions", title: "Her Lethal Secretions" },
  { id: "pupil", title: "Her Pellucid Pupil" },
  { id: "fingerprint", title: "His Indelible Fingerprint" }
];

// This build implements one full authored adventure for Book 1.
const ACTIVE_BOOK_ID = "hallux";
const CHOICE_IMAGE_BY_LABEL = {
  "Stay hidden until prayer ends": "./assets/book1_options/01_hidden_prayer.svg",
  "Drop down and challenge Mother directly": "./assets/book1_options/02_challenge_mother.svg",
  "Press Yessie for forbidden details": "./assets/book1_options/03_forbidden_details.svg",
  "Protect Yessie and play compliant": "./assets/book1_options/04_play_compliant.svg",
  "Rage against the restraint": "./assets/book1_options/05_rage_restraint.svg",
  "Submit outwardly, memorize every mechanism": "./assets/book1_options/06_memorize_mechanism.svg",
  "Share your plan and ask Arben's aid": "./assets/book1_options/07_arben_alliance.svg",
  "Take the boat instructions and dismiss him": "./assets/book1_options/08_take_and_dismiss.svg",
  "Steer straight toward the island lights": "./assets/book1_options/09_island_lights.svg",
  "Turn toward labor shore to gather witnesses": "./assets/book1_options/10_labor_shore.svg",
  "Scuttle records and drift into open water": "./assets/book1_options/11_drift_open_water.svg",
  "Refuse kneeling and trigger collar overload": "./assets/book1_options/12_collar_overload.svg",
  "Accept the sanctioned temple bead": "./assets/book1_options/13_temple_bead.svg",
  "Leap from the transfer pier at night": "./assets/book1_options/14_transfer_pier.svg",
  "Step into the active char trench": "./assets/book1_options/15_char_trench.svg"
};
const SCENE_IMAGE_BY_ID = {
  roof_perch: "roof_perch",
  kitchen_after: "kitchen_after",
  collar_room: "collar_room",
  arben_visit: "arben_visit",
  boat_launch: "boat_launch",
  final_rite: "final_rite",
  ending_collar: "ending_collar",
  ending_bead: "ending_bead",
  ending_drown: "ending_drown",
  ending_fire: "ending_fire"
};

const scenes = {
  roof_perch: {
    aura: "authority",
    title: "Roof Perch",
    copy:
      "Miobeth balances above the houseyard with slippers in hand, listening to the Emperor's prayer spread across the lake mansions. Lady Anabasi drills the household below. One wrong move means the collar crackles and the old maid suffers with her.",
    choices: [
      {
        label: "Stay hidden until prayer ends",
        summary: "Delay punishment, watch for weakness",
        to: "kitchen_after",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Drop down and challenge Mother directly",
        summary: "Force confrontation now",
        to: "collar_room",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  kitchen_after: {
    aura: "threshold",
    title: "Kitchen Mantra",
    copy:
      "In the kitchen, Yessie stirs mushroom broth and mutters Crefter mantras she is forbidden to explain. Miobeth can pry for Ostral stories, or preserve the maid's safety by pretending obedience while planning elsewhere.",
    choices: [
      {
        label: "Press Yessie for forbidden details",
        summary: "Learn hidden structure of the world",
        to: "arben_visit",
        stats: { defiance: +1, kinship: +1 }
      },
      {
        label: "Protect Yessie and play compliant",
        summary: "Keep suspicion low",
        to: "arben_visit",
        stats: { composure: +1, kinship: +1 }
      }
    ]
  },
  collar_room: {
    aura: "threshold",
    title: "Collar Chamber",
    copy:
      "Lady Anabasi orders restraints. The machine ring locks around Miobeth's ankle while Yessie trembles beside the bed. Through pain and humiliation, Miobeth can break, bargain, or quietly gather intent for a harder escape.",
    choices: [
      {
        label: "Rage against the restraint",
        summary: "Refuse role openly",
        to: "arben_visit",
        stats: { defiance: +2, composure: -1 }
      },
      {
        label: "Submit outwardly, memorize every mechanism",
        summary: "Preserve strength for one attempt",
        to: "arben_visit",
        stats: { composure: +2 }
      }
    ]
  },
  arben_visit: {
    aura: "kin",
    title: "Window Exchange",
    copy:
      "Arben, a Crefter courier with blue eyes, arrives at the service gate with a hidden book and news of boats. Miobeth can trust him with her desire to reach the Emperor's island, or steal only what she needs and cut him off.",
    choices: [
      {
        label: "Share your plan and ask Arben's aid",
        summary: "Build alliance despite hierarchy",
        to: "boat_launch",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Take the boat instructions and dismiss him",
        summary: "Act alone, keep control",
        to: "boat_launch",
        stats: { defiance: +1, composure: +1 }
      }
    ]
  },
  boat_launch: {
    aura: "kin",
    title: "Treefall Escape",
    copy:
      "At dusk Miobeth climbs her tree, falls outside the wall, and reaches a hidden boat. The lake is larger than memory. Wind, fuel, and fear all run thin. She can aim for the Emperor's island, return for allies, or burn the route behind her.",
    choices: [
      {
        label: "Steer straight toward the island lights",
        summary: "Seek judgment at the center",
        to: "final_rite",
        stats: { defiance: +1, composure: -1 }
      },
      {
        label: "Turn toward labor shore to gather witnesses",
        summary: "Trade speed for solidarity",
        to: "final_rite",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Scuttle records and drift into open water",
        summary: "Erase trace, abandon all claims",
        to: "final_rite",
        stats: { composure: +1, defiance: +1 }
      }
    ]
  },
  final_rite: {
    aura: "ending",
    title: "Last Threshold",
    copy:
      "Whether captured at shore, hauled from water, or brought before ritual attendants, Miobeth is denied any living future. The only choice left is the form of death and what meaning, if any, it carries.",
    dynamicChoices: true
  },
  ending_collar: {
    aura: "ending",
    title: "Ending: Collar Arc",
    copy:
      "She spits defiance at the rite and they answer with full collar discharge. The arc climbs her spine and drops her still before the witness bell stops ringing.",
    ending: true
  },
  ending_bead: {
    aura: "ending",
    title: "Ending: Temple Bead",
    copy:
      "Miobeth swallows the sanctioned bead under watch. Her breath slows, her fingers unclench, and her name is entered as a completed duty.",
    ending: true
  },
  ending_drown: {
    aura: "ending",
    title: "Ending: Lake Silence",
    copy:
      "She throws herself from the transfer pier before final confinement. The lake takes her weight and voice together; by dawn, only ripples remain.",
    ending: true
  },
  ending_fire: {
    aura: "ending",
    title: "Ending: Char Trench",
    copy:
      "Assigned to cull labor after capture, she steps into the trench during ignition and refuses extraction. Smoke seals the decision no decree could undo.",
    ending: true
  }
};

const initialBookIndex = BOOKS.findIndex((book) => book.id === ACTIVE_BOOK_ID);

const state = {
  sceneId: "roof_perch",
  turn: 1,
  skin: "patina",
  autoCycleSkins: false,
  autoCycleTimer: null,
  skinAnimationFrame: null,
  currentBookIndex: initialBookIndex,
  completedBookIndices: new Set(),
  stats: {
    composure: 5,
    defiance: 4,
    kinship: 4
  },
  history: ["Miobeth climbs the roof before morning drills begin."],
  meterSnapshot: {
    composure: 5,
    defiance: 4,
    kinship: 4
  }
};

const refs = {
  stage: document.getElementById("stage"),
  turnLabel: document.getElementById("turn-label"),
  aura: document.getElementById("scene-aura"),
  title: document.getElementById("scene-title"),
  sceneImage: document.getElementById("scene-image"),
  copy: document.getElementById("scene-copy"),
  choices: document.getElementById("choices"),
  history: document.getElementById("history"),
  statComposure: document.getElementById("stat-composure"),
  statDefiance: document.getElementById("stat-defiance"),
  statKinship: document.getElementById("stat-kinship"),
  barComposure: document.getElementById("bar-composure"),
  barDefiance: document.getElementById("bar-defiance"),
  barKinship: document.getElementById("bar-kinship"),
  skinCycle: document.getElementById("skin-cycle"),
  skinButtons: Array.from(document.querySelectorAll(".skin-button")),
  bookTitle: document.getElementById("book-title"),
  bookSequence: document.getElementById("book-sequence"),
  nextBookOffer: document.getElementById("next-book-offer"),
  nextBookButton: document.getElementById("next-book-button")
};

function clamp(value) {
  return Math.max(MIN_STAT, Math.min(MAX_STAT, value));
}

function parseColor(input) {
  const value = input.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
      a: 1
    };
  }
  const rgbaMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(",").map((p) => Number.parseFloat(p.trim()));
    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: Number.isFinite(parts[3]) ? parts[3] : 1
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

function mixColor(from, to, t) {
  const lerp = (a, b) => a + (b - a) * t;
  return {
    r: lerp(from.r, to.r),
    g: lerp(from.g, to.g),
    b: lerp(from.b, to.b),
    a: lerp(from.a, to.a)
  };
}

function formatColor(c) {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${c.a.toFixed(3)})`;
}

function applyThemeVarsInstant(theme) {
  Object.entries(theme).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}

function animateThemeVars(theme, duration = SKIN_TRANSITION_MS) {
  if (state.skinAnimationFrame) {
    cancelAnimationFrame(state.skinAnimationFrame);
    state.skinAnimationFrame = null;
  }

  const computed = getComputedStyle(document.documentElement);
  const vars = Object.keys(theme);
  const start = Object.fromEntries(
    vars.map((name) => [name, parseColor(computed.getPropertyValue(name) || theme[name])])
  );
  const end = Object.fromEntries(vars.map((name) => [name, parseColor(theme[name])]));
  const startTime = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - (1 - progress) * (1 - progress);
    vars.forEach((name) => {
      const mixed = mixColor(start[name], end[name], eased);
      document.documentElement.style.setProperty(name, formatColor(mixed));
    });
    if (progress < 1) {
      state.skinAnimationFrame = requestAnimationFrame(tick);
    } else {
      state.skinAnimationFrame = null;
      // Snap to exact token values at the end of tween.
      applyThemeVarsInstant(theme);
    }
  };

  state.skinAnimationFrame = requestAnimationFrame(tick);
}

function setSkin(skin, animate = true) {
  if (!SKINS.includes(skin)) {
    return;
  }

  state.skin = skin;
  const nextTheme = SKIN_THEME_VARS[skin];
  if (nextTheme) {
    if (animate) {
      animateThemeVars(nextTheme);
    } else {
      applyThemeVarsInstant(nextTheme);
    }
  }

  refs.skinButtons.forEach((button) => {
    if (state.autoCycleSkins) {
      button.classList.remove("is-active");
      button.setAttribute("aria-pressed", "false");
      return;
    }
    const isCurrent = button.dataset.skin === skin;
    button.classList.toggle("is-active", isCurrent);
    button.setAttribute("aria-pressed", isCurrent ? "true" : "false");
  });
}

function cycleSkin() {
  const index = SKINS.indexOf(state.skin);
  const nextIndex = (index + 1) % SKINS.length;
  setSkin(SKINS[nextIndex]);
}

function syncCycleButton() {
  refs.skinCycle.textContent = state.autoCycleSkins ? "Cycle Skin: On" : "Cycle Skin";
  refs.skinCycle.classList.toggle("is-cycling", state.autoCycleSkins);
  refs.skinCycle.setAttribute("aria-pressed", state.autoCycleSkins ? "true" : "false");
  refs.skinButtons.forEach((button) => {
    button.disabled = state.autoCycleSkins;
    if (state.autoCycleSkins) {
      button.classList.remove("is-active");
      button.setAttribute("aria-pressed", "false");
    } else {
      const isCurrent = button.dataset.skin === state.skin;
      button.classList.toggle("is-active", isCurrent);
      button.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    }
  });
}

function stopAutoCycle() {
  state.autoCycleSkins = false;
  if (state.autoCycleTimer) {
    clearInterval(state.autoCycleTimer);
    state.autoCycleTimer = null;
  }
  syncCycleButton();
}

function startAutoCycle() {
  state.autoCycleSkins = true;
  if (state.autoCycleTimer) {
    clearInterval(state.autoCycleTimer);
  }
  state.autoCycleTimer = setInterval(cycleSkin, AUTO_CYCLE_MS);
  syncCycleButton();
}

function toggleAutoCycle() {
  if (state.autoCycleSkins) {
    stopAutoCycle();
  } else {
    startAutoCycle();
  }
}

function bindSkinControls() {
  refs.skinCycle.addEventListener("click", toggleAutoCycle);

  refs.skinButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (state.autoCycleSkins) {
        return;
      }
      stopAutoCycle();
      setSkin(button.dataset.skin, true);
    });
  });
}

function bindNextBookButton() {
  refs.nextBookButton.addEventListener("click", () => {
    const nextIndex = state.currentBookIndex + 1;
    const nextBook = BOOKS[nextIndex];

    if (!nextBook) {
      return;
    }

    pushHistory(`Next book offered: ${nextBook.title}.`);
    renderHistory();
  });
}

function applySceneImage(sceneId, sceneTitle) {
  const key = SCENE_IMAGE_BY_ID[sceneId];
  if (!key) {
    refs.sceneImage.removeAttribute("src");
    refs.sceneImage.alt = "";
    refs.sceneImage.style.visibility = "hidden";
    return;
  }

  const hdPng = `./assets/book1_scenes_hd/${key}.png`;
  const fallbackSvg = `./assets/book1_scenes/${key}.svg`;

  refs.sceneImage.alt = sceneTitle;
  refs.sceneImage.style.visibility = "visible";
  refs.sceneImage.onerror = () => {
    refs.sceneImage.onerror = null;
    refs.sceneImage.src = fallbackSvg;
  };
  refs.sceneImage.src = hdPng;
}

function applyStatDelta(delta = {}) {
  state.meterSnapshot = { ...state.stats };
  Object.entries(delta).forEach(([key, amount]) => {
    state.stats[key] = clamp(state.stats[key] + amount);
  });
}

function pushHistory(text) {
  state.history.unshift(text);
  state.history = state.history.slice(0, 10);
}

function markAdventureComplete() {
  state.completedBookIndices.add(state.currentBookIndex);
}

function renderBookTitle() {
  const currentBook = BOOKS[state.currentBookIndex];
  refs.bookTitle.textContent = currentBook ? currentBook.title : "Unknown Book";
}

function renderBookSequence() {
  refs.bookSequence.innerHTML = "";

  BOOKS.forEach((book, index) => {
    const li = document.createElement("li");
    let label = `${index + 1}. ${book.title}`;

    if (state.completedBookIndices.has(index)) {
      li.classList.add("complete");
      label += " [completed]";
    } else if (index === state.currentBookIndex) {
      li.classList.add("current");
      label += " [active]";
    } else if (index === state.currentBookIndex + 1 && state.completedBookIndices.has(state.currentBookIndex)) {
      li.classList.add("current");
      label += " [offered]";
    } else {
      li.classList.add("locked");
      label += " [queued]";
    }

    li.textContent = label;
    refs.bookSequence.appendChild(li);
  });
}

function renderNextBookOffer() {
  const currentComplete = state.completedBookIndices.has(state.currentBookIndex);
  const nextIndex = state.currentBookIndex + 1;
  const nextBook = BOOKS[nextIndex];

  if (!currentComplete || !nextBook) {
    refs.nextBookOffer.classList.add("is-hidden");
    refs.nextBookButton.textContent = "";
    refs.nextBookButton.disabled = true;
    return;
  }

  refs.nextBookOffer.classList.remove("is-hidden");
  refs.nextBookButton.disabled = false;
  refs.nextBookButton.textContent = nextBook.title;
}

function makeResolveChoices() {
  const { composure, defiance, kinship } = state.stats;

  const tone =
    defiance >= composure && defiance >= kinship
      ? "You push against the rite until they force closure."
      : kinship >= composure && kinship >= defiance
        ? "You lean toward deaths that spare someone else."
        : "You seek the cleanest controlled exit available.";

  return [
    {
      label: "Refuse kneeling and trigger collar overload",
      summary: `${tone}`,
      to: "ending_collar",
      note: "Miobeth dies under full collar discharge."
    },
    {
      label: "Accept the sanctioned temple bead",
      summary: "Formal compliance ending",
      to: "ending_bead",
      note: "Miobeth dies by temple bead under witness." 
    },
    {
      label: "Leap from the transfer pier at night",
      summary: "Escape denied, self-chosen fall",
      to: "ending_drown",
      note: "Miobeth dies in the lake before confinement."
    },
    {
      label: "Step into the active char trench",
      summary: "Culling line ending",
      to: "ending_fire",
      note: "Miobeth dies in ritual cull fire."
    }
  ];
}

function updateStatsUI() {
  const barValues = {
    composure: `${(state.stats.composure / MAX_STAT) * 100}%`,
    defiance: `${(state.stats.defiance / MAX_STAT) * 100}%`,
    kinship: `${(state.stats.kinship / MAX_STAT) * 100}%`
  };

  refs.statComposure.textContent = state.stats.composure;
  refs.statDefiance.textContent = state.stats.defiance;
  refs.statKinship.textContent = state.stats.kinship;

  refs.barComposure.style.width = barValues.composure;
  refs.barDefiance.style.width = barValues.defiance;
  refs.barKinship.style.width = barValues.kinship;

  ["composure", "defiance", "kinship"].forEach((key) => {
    if (state.stats[key] !== state.meterSnapshot[key]) {
      const bar = refs[`bar${key[0].toUpperCase()}${key.slice(1)}`];
      bar.classList.remove("flash");
      void bar.offsetWidth;
      bar.classList.add("flash");
    }
  });
}

function renderHistory() {
  refs.history.innerHTML = "";
  state.history.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    refs.history.appendChild(li);
  });
}

function renderChoices(scene) {
  refs.choices.innerHTML = "";

  let choices = scene.choices || [];
  if (scene.dynamicChoices) {
    choices = makeResolveChoices();
  }

  if (scene.ending) {
    markAdventureComplete();

    const restart = document.createElement("button");
    restart.className = "choice choice-simple";
    restart.innerHTML =
      "<div class=\"choice-copy\"><strong>Restart this book</strong><small>Return to Step 1 and try a different fatal path</small></div>";
    restart.addEventListener("click", () => {
      resetGame();
      render();
    });
    refs.choices.appendChild(restart);

    renderBookSequence();
    renderNextBookOffer();
    return;
  }

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.style.animationDelay = `${index * 80}ms`;
    const choiceImage = CHOICE_IMAGE_BY_LABEL[choice.label];
    button.innerHTML = `
      ${choiceImage ? `<img class="choice-thumb" src="${choiceImage}" alt="${choice.label}" />` : ""}
      <div class="choice-copy">
        <strong>${choice.label}</strong>
        <small>${choice.summary}</small>
      </div>
    `;
    button.addEventListener("click", () => {
      const beforeScene = scenes[state.sceneId];
      applyStatDelta(choice.stats);
      state.turn += 1;
      state.sceneId = choice.to;
      pushHistory(`${beforeScene.title}: ${choice.note || choice.label}`);
      transitionRender();
    });
    refs.choices.appendChild(button);
  });
}

function transitionRender() {
  refs.stage.classList.add("is-switching");
  setTimeout(() => {
    refs.stage.classList.remove("is-switching");
    render();
  }, 190);
}

function render() {
  const scene = scenes[state.sceneId];
  refs.turnLabel.textContent = `Step ${state.turn}`;
  refs.aura.textContent = scene.aura;
  refs.title.textContent = scene.title;
  applySceneImage(state.sceneId, scene.title);
  refs.copy.textContent = scene.copy;

  refs.stage.classList.remove("aura-authority", "aura-threshold", "aura-kin", "aura-ending");
  refs.stage.classList.add(`aura-${scene.aura}`);

  renderBookTitle();
  renderChoices(scene);
  updateStatsUI();
  renderHistory();
  renderBookSequence();
  renderNextBookOffer();
}

function resetGame() {
  state.sceneId = "roof_perch";
  state.turn = 1;
  state.stats = { composure: 5, defiance: 4, kinship: 4 };
  state.meterSnapshot = { ...state.stats };
  state.history = ["Miobeth climbs the roof before morning drills begin."];
}

bindSkinControls();
bindNextBookButton();
setSkin(state.skin, false);
syncCycleButton();
render();
