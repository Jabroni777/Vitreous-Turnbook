const MAX_STAT = 10;
const MIN_STAT = 0;
const SKINS = ["patina", "amber", "abyss"];
const AUTO_CYCLE_MS = 4500;
const SCENE_SWITCH_MS = 190;
const SCENE_SYNC_TIMEOUT_MS = 1200;
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

// Choice thumbnails across all authored books.
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
  "Step into the active char trench": "./assets/book1_options/15_char_trench.svg",
  "Cut through the shelter exchange lane": "./assets/book2_options/01_shelter_lane.svg",
  "Take the open ridge and call ahead": "./assets/book2_options/02_open_ridge.svg",
  "Confess the delay and ask for direct help": "./assets/book2_options/03_confess_delay.svg",
  "Hide the delay and request only data": "./assets/book2_options/04_hide_delay.svg",
  "Bury the queen in hot sand": "./assets/book2_options/05_bury_queen.svg",
  "Carry the queen back toward Karin's side": "./assets/book2_options/06_carry_queen.svg",
  "Burn a resin firebreak along the hedge": "./assets/book2_options/07_resin_firebreak.svg",
  "Declare the sting and submit to hearing": "./assets/book2_options/08_declare_sting.svg",
  "Hide the wound and seek a private workaround": "./assets/book2_options/09_hide_wound.svg",
  "Take the ascension bead under witness": "./assets/book2_options/10_bead_witness.svg",
  "Request full venom sequence": "./assets/book2_options/11_venom_sequence.svg",
  "Accept collective cull assignment": "./assets/book2_options/12_collective_cull.svg",
  "Step into toxin flow ahead of broodline": "./assets/book2_options/13_toxin_flow.svg",
  "Prioritize biological records over doctrine logs": "./assets/book3_options/01_bio_records.svg",
  "Follow official inventory order exactly": "./assets/book3_options/02_official_order.svg",
  "Ask Pitopan to stay through intake": "./assets/book3_options/03_keep_pitopan.svg",
  "Release Pitopan to his own route": "./assets/book3_options/04_release_pitopan.svg",
  "Board immediately with minimal baggage": "./assets/book3_options/05_board_now.svg",
  "Delay briefly to secure extra archive cases": "./assets/book3_options/06_delay_cases.svg",
  "Comply publicly, preserve private notes": "./assets/book3_options/07_comply_notes.svg",
  "Challenge record destruction orders": "./assets/book3_options/08_challenge_destruction.svg",
  "Translate exactly as requested": "./assets/book3_options/09_literal_translation.svg",
  "Embed clarifying annotations in the margins": "./assets/book3_options/10_margin_annotations.svg",
  "Smuggle one critical page to labor channels": "./assets/book3_options/11_smuggle_page.svg",
  "Accept salt bead protocol": "./assets/book3_options/12_salt_bead.svg",
  "Take the night pier and trust the tide": "./assets/book3_options/13_night_pier.svg",
  "Select calibrated dart sequence": "./assets/book3_options/14_dart_sequence.svg",
  "Enter furnace intake as archive risk": "./assets/book3_options/15_furnace_intake.svg",
  "Keep procession rhythm and avoid incident": "./assets/book4_options/01_keep_rhythm.svg",
  "Let Oji engage the sprogs directly": "./assets/book4_options/02_let_oji_engage.svg",
  "Report viability data without commentary": "./assets/book4_options/03_report_metrics.svg",
  "Defend Oji's integration in the report": "./assets/book4_options/04_defend_oji.svg",
  "Request delayed judgment for more trials": "./assets/book4_options/05_delay_judgment.svg",
  "Force immediate ruling on first generation": "./assets/book4_options/06_force_ruling.svg",
  "Publicly accept the mixed outcome": "./assets/book4_options/07_accept_outcome.svg",
  "Accuse Deciders of engineered sabotage": "./assets/book4_options/08_accuse_sabotage.svg",
  "Prepare dual-dose contingency together": "./assets/book4_options/09_dual_dose_pact.svg",
  "Separate duties and face verdict alone": "./assets/book4_options/10_separate_duties.svg",
  "Trigger paired darts with Oji": "./assets/book4_options/11_paired_darts.svg",
  "Accept bead closure alone": "./assets/book4_options/12_bead_alone.svg",
  "Enter charcoal intake during purge": "./assets/book4_options/13_charcoal_intake.svg",
  "Take terminal sponge dose": "./assets/book4_options/14_sponge_dose.svg"
};
const SCENE_IMAGE_BY_ID = {
  roof_perch: { png: "./assets/book1_scenes_hd/roof_perch.png", svg: "./assets/book1_scenes/roof_perch.svg" },
  kitchen_after: { png: "./assets/book1_scenes_hd/kitchen_after.png", svg: "./assets/book1_scenes/kitchen_after.svg" },
  collar_room: { png: "./assets/book1_scenes_hd/collar_room.png", svg: "./assets/book1_scenes/collar_room.svg" },
  arben_visit: { png: "./assets/book1_scenes_hd/arben_visit.png", svg: "./assets/book1_scenes/arben_visit.svg" },
  boat_launch: { png: "./assets/book1_scenes_hd/boat_launch.png", svg: "./assets/book1_scenes/boat_launch.svg" },
  final_rite: { png: "./assets/book1_scenes_hd/final_rite.png", svg: "./assets/book1_scenes/final_rite.svg" },
  ending_collar: { png: "./assets/book1_scenes_hd/ending_collar.png", svg: "./assets/book1_scenes/ending_collar.svg" },
  ending_bead: { png: "./assets/book1_scenes_hd/ending_bead.png", svg: "./assets/book1_scenes/ending_bead.svg" },
  ending_drown: { png: "./assets/book1_scenes_hd/ending_drown.png", svg: "./assets/book1_scenes/ending_drown.svg" },
  ending_fire: { png: "./assets/book1_scenes_hd/ending_fire.png", svg: "./assets/book1_scenes/ending_fire.svg" },
  paprop_track: { svg: "./assets/book2_scenes/paprop_track.svg" },
  resin_line: { svg: "./assets/book2_scenes/resin_line.svg" },
  queen_crossing: { svg: "./assets/book2_scenes/queen_crossing.svg" },
  sting_alarm: { svg: "./assets/book2_scenes/sting_alarm.svg" },
  decider_hearing: { svg: "./assets/book2_scenes/decider_hearing.svg" },
  ending_secretions_bead: { svg: "./assets/book2_scenes/ending_secretions_bead.svg" },
  ending_secretions_darts: { svg: "./assets/book2_scenes/ending_secretions_darts.svg" },
  ending_secretions_fire: { svg: "./assets/book2_scenes/ending_secretions_fire.svg" },
  ending_secretions_shield: { svg: "./assets/book2_scenes/ending_secretions_shield.svg" },
  archive_descent: { png: "./assets/book3_scenes_hd/archive_descent.png", svg: "./assets/book3_scenes/archive_descent.svg" },
  salt_pier: { png: "./assets/book3_scenes_hd/salt_pier.png", svg: "./assets/book3_scenes/salt_pier.svg" },
  lizard_dock: { png: "./assets/book3_scenes_hd/lizard_dock.png", svg: "./assets/book3_scenes/lizard_dock.svg" },
  anodi_gate: { png: "./assets/book3_scenes_hd/anodi_gate.png", svg: "./assets/book3_scenes/anodi_gate.svg" },
  translation_vault: { png: "./assets/book3_scenes_hd/translation_vault.png", svg: "./assets/book3_scenes/translation_vault.svg" },
  pelucid_verdict: { png: "./assets/book3_scenes_hd/pelucid_verdict.png", svg: "./assets/book3_scenes/pelucid_verdict.svg" },
  ending_pupil_bead: { png: "./assets/book3_scenes_hd/ending_pupil_bead.png", svg: "./assets/book3_scenes/ending_pupil_bead.svg" },
  ending_pupil_drown: { png: "./assets/book3_scenes_hd/ending_pupil_drown.png", svg: "./assets/book3_scenes/ending_pupil_drown.svg" },
  ending_pupil_dart: { png: "./assets/book3_scenes_hd/ending_pupil_dart.png", svg: "./assets/book3_scenes/ending_pupil_dart.svg" },
  ending_pupil_furnace: { png: "./assets/book3_scenes_hd/ending_pupil_furnace.png", svg: "./assets/book3_scenes/ending_pupil_furnace.svg" },
  reticulum_march: { png: "./assets/book4_scenes_hd/reticulum_march.png", svg: "./assets/book4_scenes/reticulum_march.svg" },
  chorus_chamber: { png: "./assets/book4_scenes_hd/chorus_chamber.png", svg: "./assets/book4_scenes/chorus_chamber.svg" },
  decider_crossing: { png: "./assets/book4_scenes_hd/decider_crossing.png", svg: "./assets/book4_scenes/decider_crossing.svg" },
  embryo_trial: { png: "./assets/book4_scenes_hd/embryo_trial.png", svg: "./assets/book4_scenes/embryo_trial.svg" },
  aji_bond: { png: "./assets/book4_scenes_hd/aji_bond.png", svg: "./assets/book4_scenes/aji_bond.svg" },
  fingerprint_verdict: { png: "./assets/book4_scenes_hd/fingerprint_verdict.png", svg: "./assets/book4_scenes/fingerprint_verdict.svg" },
  ending_fingerprint_darts: { png: "./assets/book4_scenes_hd/ending_fingerprint_darts.png", svg: "./assets/book4_scenes/ending_fingerprint_darts.svg" },
  ending_fingerprint_bead: { png: "./assets/book4_scenes_hd/ending_fingerprint_bead.png", svg: "./assets/book4_scenes/ending_fingerprint_bead.svg" },
  ending_fingerprint_char: { png: "./assets/book4_scenes_hd/ending_fingerprint_char.png", svg: "./assets/book4_scenes/ending_fingerprint_char.svg" },
  ending_fingerprint_sponge: { png: "./assets/book4_scenes_hd/ending_fingerprint_sponge.png", svg: "./assets/book4_scenes/ending_fingerprint_sponge.svg" }
};

const scenes = {
  roof_perch: {
    aura: "authority",
    title: "Roof Perch",
    copy:
      "Miobeth clings to hot roof tiles while the Emperor's prayer crackles over the lake mansions. Below, Lady Anabasi drills the household into ritual precision. One mistake from the heir will be punished through Yessie first.",
    choices: [
      {
        label: "Stay hidden until prayer ends",
        summary: "Delay punishment, watch for weakness",
        to: "kitchen_after",
        lead: "She flattens against the tiles and waits for the courtyard to clear.",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Drop down and challenge Mother directly",
        summary: "Force confrontation now",
        to: "collar_room",
        lead: "She drops from the roof before the final bell and forces open conflict.",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  kitchen_after: {
    aura: "threshold",
    title: "Kitchen Mantra",
    copy:
      "Steam, starchcakes, and fear thicken the kitchen air. Yessie mutters a Crefter mantra and stops whenever footsteps pass the hall. She knows forbidden details about lake labor and machine routes, but speaking them is dangerous.",
    choices: [
      {
        label: "Press Yessie for forbidden details",
        summary: "Learn hidden structure of the world",
        to: "arben_visit",
        lead: "Miobeth presses until Yessie gives fragments about routes and social fractures.",
        stats: { defiance: +1, kinship: +1 }
      },
      {
        label: "Protect Yessie and play compliant",
        summary: "Keep suspicion low",
        to: "arben_visit",
        lead: "Miobeth softens her tone and protects Yessie by performing obedience.",
        stats: { composure: +1, kinship: +1 }
      }
    ]
  },
  collar_room: {
    aura: "threshold",
    title: "Collar Chamber",
    copy:
      "Lady Anabasi answers with protocol, not shouting. A restraint ring locks to Miobeth's ankle while Yessie is forced to assist. Between shock pulses, Miobeth studies timing, keys, and control habits.",
    choices: [
      {
        label: "Rage against the restraint",
        summary: "Refuse role openly",
        to: "arben_visit",
        lead: "Miobeth fights hard enough to make refusal undeniable.",
        stats: { defiance: +2, composure: -1 }
      },
      {
        label: "Submit outwardly, memorize every mechanism",
        summary: "Preserve strength for one attempt",
        to: "arben_visit",
        lead: "Miobeth goes still and memorizes every latch and footstep pattern.",
        stats: { composure: +2 }
      }
    ]
  },
  arben_visit: {
    aura: "kin",
    title: "Window Exchange",
    copy:
      "At the service gate, Arben breaks script and passes a forbidden book through the grille. Its diagrams expose boat controls and route timing that Alates are not meant to know. Every sentence between them risks punishment across rank lines.",
    choices: [
      {
        label: "Share your plan and ask Arben's aid",
        summary: "Build alliance despite hierarchy",
        to: "boat_launch",
        lead: "Miobeth shares the full plan, and Arben helps stitch a narrow route.",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Take the boat instructions and dismiss him",
        summary: "Act alone, keep control",
        to: "boat_launch",
        lead: "Miobeth takes the instructions and cuts Arben out of the operation.",
        stats: { defiance: +1, composure: +1 }
      }
    ]
  },
  boat_launch: {
    aura: "kin",
    title: "Treefall Escape",
    copy:
      "At dusk, Miobeth climbs her tree, falls beyond the wall, and reaches a hidden boat. The engine catches in rough bursts as she steers into black water. Fuel, patrols, and distance all threaten the escape at once.",
    choices: [
      {
        label: "Steer straight toward the island lights",
        summary: "Seek judgment at the center",
        to: "final_rite",
        lead: "She commits to the shortest line toward the island lights.",
        stats: { defiance: +1, composure: -1 }
      },
      {
        label: "Turn toward labor shore to gather witnesses",
        summary: "Trade speed for solidarity",
        to: "final_rite",
        lead: "She veers to labor shore, seeking witnesses before capture.",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Scuttle records and drift into open water",
        summary: "Erase trace, abandon all claims",
        to: "final_rite",
        lead: "She erases identifiers and drifts into uncertainty beyond mapped lanes.",
        stats: { composure: +1, defiance: +1 }
      }
    ]
  },
  final_rite: {
    aura: "ending",
    title: "Last Threshold",
    copy:
      "By dawn, every path ends in custody. Attendants present instruments as procedural choices, but each leads to death. Miobeth can only decide the shape of her final refusal or compliance.",
    dynamicChoices: true
  },
  ending_collar: {
    aura: "ending",
    title: "Ending: Collar Arc",
    copy:
      "Miobeth refuses the kneel. Full collar discharge drops her before the witness bell falls silent.",
    ending: true
  },
  ending_bead: {
    aura: "ending",
    title: "Ending: Temple Bead",
    copy:
      "Miobeth takes the sanctioned bead under watch. Breath, grip, and voice fade in measured sequence as her file is closed as compliant.",
    ending: true
  },
  ending_drown: {
    aura: "ending",
    title: "Ending: Lake Silence",
    copy:
      "At the transfer pier, Miobeth moves before handlers lock formation. Cold water swallows her, and patrol boats find only widening circles by dawn.",
    ending: true
  },
  ending_fire: {
    aura: "ending",
    title: "Ending: Char Trench",
    copy:
      "Reassigned to cull labor, Miobeth steps into the trench at ignition. Smoke seals the decision before command can reassert control.",
    ending: true
  }
};

const scenesSecretions = {
  paprop_track: {
    aura: "authority",
    title: "Paprop Track",
    copy:
      "Tafella hurries the paprop path with Karin's veil draped over her shoulder. Trade vessels grind past unaka shelters while decider schedules tighten around every movement. A late arrival can become evidence.",
    choices: [
      {
        label: "Cut through the shelter exchange lane",
        summary: "Move through trade density",
        to: "resin_line",
        lead: "Tafella enters the crowded shelter lane and accepts the delay as cover.",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Take the open ridge and call ahead",
        summary: "Arrive faster, exposed",
        to: "resin_line",
        lead: "Tafella breaks for the ridge and reaches the speaking line under direct sun.",
        stats: { defiance: +1, composure: -1 }
      }
    ]
  },
  resin_line: {
    aura: "threshold",
    title: "Resin Line",
    copy:
      "At the hedge boundary, Karin's voice vibrates through the resin cup: queen selection is near, nerves are frayed, and one cross-cell breach could condemn an entire broodline. Timing is now a moral choice.",
    choices: [
      {
        label: "Confess the delay and ask for direct help",
        summary: "Trust the bond fully",
        to: "queen_crossing",
        lead: "Tafella chooses trust over posture, giving Karin the full situation.",
        stats: { kinship: +2 }
      },
      {
        label: "Hide the delay and request only data",
        summary: "Preserve status distance",
        to: "queen_crossing",
        lead: "Tafella withholds weakness and extracts only tactical details.",
        stats: { composure: +1, defiance: +1 }
      }
    ]
  },
  queen_crossing: {
    aura: "kin",
    title: "Queen Crossing",
    copy:
      "A wingless queen crawls under the hedge into the wrong jurisdiction. If patrol sees it, Karin's entire cell may be culled. Tafella has seconds to act with incomplete information.",
    choices: [
      {
        label: "Bury the queen in hot sand",
        summary: "Immediate containment",
        to: "sting_alarm",
        lead: "Tafella commits to fast containment before witnesses gather.",
        stats: { composure: +1, defiance: +1 }
      },
      {
        label: "Carry the queen back toward Karin's side",
        summary: "High-risk rescue attempt",
        to: "sting_alarm",
        lead: "Tafella cups the queen and tries to reverse the breach by hand.",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Burn a resin firebreak along the hedge",
        summary: "Force separation by smoke",
        to: "sting_alarm",
        lead: "Tafella ignites resin to erase borders in smoke and panic.",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  sting_alarm: {
    aura: "threshold",
    title: "Sting Alarm",
    copy:
      "The queen strikes. Heat races through Tafella's chest as alarm calls ripple from cell to cell. Deciders converge, and every witness begins composing a different account of what happened.",
    choices: [
      {
        label: "Declare the sting and submit to hearing",
        summary: "Public process route",
        to: "decider_hearing",
        lead: "Tafella reports herself and enters procedure before rumor hardens.",
        stats: { composure: +1 }
      },
      {
        label: "Hide the wound and seek a private workaround",
        summary: "Disrupt process from inside",
        to: "decider_hearing",
        lead: "Tafella conceals the wound and attempts to outpace formal judgment.",
        stats: { defiance: +2, kinship: +1, composure: -1 }
      }
    ]
  },
  decider_hearing: {
    aura: "ending",
    title: "Decider Hearing",
    copy:
      "In a circular chamber, beads, darts, and cull protocols are arranged as administrative options. Tafella is permitted to choose method, not outcome. Every path terminates.",
    dynamicChoices: true
  },
  ending_secretions_bead: {
    aura: "ending",
    title: "Ending: Quiet Bead",
    copy:
      "Tafella accepts the bead in silence. Her record closes as orderly sacrifice.",
    ending: true
  },
  ending_secretions_darts: {
    aura: "ending",
    title: "Ending: Maximum Venom",
    copy:
      "She requests full venom calibration and dies under direct observation.",
    ending: true
  },
  ending_secretions_fire: {
    aura: "ending",
    title: "Ending: Cell Cull",
    copy:
      "Assigned collective culpability, she enters the cull fire line with her cell.",
    ending: true
  },
  ending_secretions_shield: {
    aura: "ending",
    title: "Ending: Brood Shield",
    copy:
      "Tafella steps between toxin flow and unstable brood trays; the line survives one cycle longer.",
    ending: true
  }
};

const scenesPupil = {
  archive_descent: {
    aura: "authority",
    title: "Archive Descent",
    copy:
      "Suvita descends with Pitopan into sealed stacks where machine-age records survive as fragments. Every page promises knowledge and contamination together, and the assignment at Port Anodi is already narrowing into obligation.",
    choices: [
      {
        label: "Prioritize biological records over doctrine logs",
        summary: "Seek practical leverage",
        to: "salt_pier",
        lead: "Suvita catalogs code-heavy folios and leaves the devotional records unopened.",
        stats: { composure: +1, defiance: +1 }
      },
      {
        label: "Follow official inventory order exactly",
        summary: "Avoid early suspicion",
        to: "salt_pier",
        lead: "Suvita keeps to assigned sequence and suppresses curiosity for now.",
        stats: { composure: +1, kinship: +1 }
      }
    ]
  },
  salt_pier: {
    aura: "threshold",
    title: "Salt Pier",
    copy:
      "At the coast transfer pier, ocean wind and waiting protocol strip conversation to essentials. Pitopan can remain briefly, but Port Anodi will hold Suvita in controlled isolation once intake begins.",
    choices: [
      {
        label: "Ask Pitopan to stay through intake",
        summary: "Hold one trusted link",
        to: "lizard_dock",
        lead: "Suvita asks for one final interval of companionship before separation.",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Release Pitopan to his own route",
        summary: "Accept solitary duty",
        to: "lizard_dock",
        lead: "Suvita sends him onward and prepares to absorb the port alone.",
        stats: { composure: +1, defiance: +1 }
      }
    ]
  },
  lizard_dock: {
    aura: "kin",
    title: "Lizard Dock",
    copy:
      "A rider warns of night fish below the pier while transport beasts circle in the shallows. The crossing to port is possible, but every delay increases scrutiny from local authority.",
    choices: [
      {
        label: "Board immediately with minimal baggage",
        summary: "Arrive before scrutiny hardens",
        to: "anodi_gate",
        lead: "Suvita boards at once and enters port custody on compressed terms.",
        stats: { composure: +1 }
      },
      {
        label: "Delay briefly to secure extra archive cases",
        summary: "Protect research at personal risk",
        to: "anodi_gate",
        lead: "Suvita delays for records, drawing attention before arrival.",
        stats: { defiance: +1, kinship: +1, composure: -1 }
      }
    ]
  },
  anodi_gate: {
    aura: "authority",
    title: "Port Anodi",
    copy:
      "Governor Araki receives Suvita with procedural politeness and explicit control. Silver collars, restricted access, and translation quotas define her role from the first hour inside the port perimeter.",
    choices: [
      {
        label: "Comply publicly, preserve private notes",
        summary: "Low profile, hidden intent",
        to: "translation_vault",
        lead: "Suvita accepts intake terms and begins recording a second private account.",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Challenge record destruction orders",
        summary: "Defend archive integrity",
        to: "translation_vault",
        lead: "Suvita contests disposal protocol and is marked as administratively difficult.",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  translation_vault: {
    aura: "threshold",
    title: "Translation Vault",
    copy:
      "In a sealed room of trunks and decaying paper, Suvita discovers human genomic texts, erotic machine-age fiction, and maps treated as contraband. Translation itself becomes a political act.",
    choices: [
      {
        label: "Translate exactly as requested",
        summary: "Limit immediate retaliation",
        to: "pelucid_verdict",
        lead: "Suvita delivers literal transcripts and cedes framing to the governor.",
        stats: { composure: +1 }
      },
      {
        label: "Embed clarifying annotations in the margins",
        summary: "Reshape interpretation quietly",
        to: "pelucid_verdict",
        lead: "Suvita inserts context that weakens official narratives.",
        stats: { defiance: +1, kinship: +1 }
      },
      {
        label: "Smuggle one critical page to labor channels",
        summary: "Distribute forbidden knowledge",
        to: "pelucid_verdict",
        lead: "Suvita routes a single page beyond port authority.",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  pelucid_verdict: {
    aura: "ending",
    title: "Pelucid Verdict",
    copy:
      "The hearing at Anodi presents closure options under administrative language. Suvita is no longer choosing survival, only what final message her death will carry through the port.",
    dynamicChoices: true
  },
  ending_pupil_bead: {
    aura: "ending",
    title: "Ending: Salt Bead",
    copy:
      "Suvita accepts bead protocol and dies under formal witness before transfer can proceed.",
    ending: true
  },
  ending_pupil_drown: {
    aura: "ending",
    title: "Ending: Tidal Pull",
    copy:
      "She reaches the pier at night and vanishes below the tidal deck before guards can close rank.",
    ending: true
  },
  ending_pupil_dart: {
    aura: "ending",
    title: "Ending: Dart Protocol",
    copy:
      "Suvita selects calibrated dart sequence and dies in controlled stages before the hearing recess ends.",
    ending: true
  },
  ending_pupil_furnace: {
    aura: "ending",
    title: "Ending: Furnace Intake",
    copy:
      "Classified as contaminated archive risk, she enters furnace intake and leaves only a sealed annotation trail.",
    ending: true
  }
};

const scenesFingerprint = {
  reticulum_march: {
    aura: "authority",
    title: "Reticulum March",
    copy:
      "Remus drives the brood procession through glass tunnels while neighboring cells track every deviation. Oji's unusual role as sapiens companion has already destabilized expectations, and Deciders are collecting proof for intervention.",
    choices: [
      {
        label: "Keep procession rhythm and avoid incident",
        summary: "Stabilize perception",
        to: "chorus_chamber",
        lead: "Remus suppresses conflict and pushes the march into formal cadence.",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Let Oji engage the sprogs directly",
        summary: "Risk irregular attachment",
        to: "chorus_chamber",
        lead: "Oji breaks formation to soothe brood clusters in full view of neighbors.",
        stats: { defiance: +1, kinship: +1 }
      }
    ]
  },
  chorus_chamber: {
    aura: "kin",
    title: "Chorus Chamber",
    copy:
      "In the brood chamber, first-generation sprogs divide into viable and failing lines while Oji's bond with them deepens. What began as adaptation now looks like social contamination to external observers.",
    choices: [
      {
        label: "Report viability data without commentary",
        summary: "Minimize political interpretation",
        to: "decider_crossing",
        lead: "Remus sends stripped metrics and omits emotional detail.",
        stats: { composure: +1 }
      },
      {
        label: "Defend Oji's integration in the report",
        summary: "Argue for the new pattern",
        to: "decider_crossing",
        lead: "Remus frames Oji as adaptive necessity, not anomaly.",
        stats: { defiance: +1, kinship: +1 }
      }
    ]
  },
  decider_crossing: {
    aura: "threshold",
    title: "Decider Crossing",
    copy:
      "Neighbor Deciders arrive with procedural courtesy and implicit threat. Their vote will determine whether Oji's line is expanded, constrained, or erased before second-generation spread begins.",
    choices: [
      {
        label: "Request delayed judgment for more trials",
        summary: "Buy time for evidence",
        to: "embryo_trial",
        lead: "Remus asks for one more cycle before irreversible decisions.",
        stats: { composure: +1, kinship: +1 }
      },
      {
        label: "Force immediate ruling on first generation",
        summary: "Take the risk now",
        to: "embryo_trial",
        lead: "Remus pushes the vote forward before opposition can reorganize.",
        stats: { defiance: +2, composure: -1 }
      }
    ]
  },
  embryo_trial: {
    aura: "threshold",
    title: "Embryo Trial",
    copy:
      "Trial brood are dosed under witness to test toxin inheritance and adaptive stability. Losses mount quickly, yet enough survivors emerge to keep the line politically dangerous.",
    choices: [
      {
        label: "Publicly accept the mixed outcome",
        summary: "Preserve legitimacy",
        to: "aji_bond",
        lead: "Remus accepts the losses and claims partial success under protocol.",
        stats: { composure: +1 }
      },
      {
        label: "Accuse Deciders of engineered sabotage",
        summary: "Escalate conflict",
        to: "aji_bond",
        lead: "Remus accuses the panel and fractures the chamber into camps.",
        stats: { defiance: +2, kinship: -1 }
      }
    ]
  },
  aji_bond: {
    aura: "kin",
    title: "Aji Bond",
    copy:
      "Oji remains bound to Remus through fear, loyalty, and shared exposure to terminal choices. The last surviving options concern not preservation of life, but the final form of shared sacrifice.",
    choices: [
      {
        label: "Prepare dual-dose contingency together",
        summary: "Shared terminal pact",
        to: "fingerprint_verdict",
        lead: "Remus and Oji agree to end together if verdict closes all exits.",
        stats: { kinship: +2, composure: -1 }
      },
      {
        label: "Separate duties and face verdict alone",
        summary: "Protect Oji from immediate blame",
        to: "fingerprint_verdict",
        lead: "Remus sends Oji away before the final hearing begins.",
        stats: { composure: +1, defiance: +1 }
      }
    ]
  },
  fingerprint_verdict: {
    aura: "ending",
    title: "Fingerprint Verdict",
    copy:
      "The ruling confirms expansion without pardon. Remus and Oji are no longer treated as persons, only as carriers of a useful line. Every remaining outcome is fatal.",
    dynamicChoices: true
  },
  ending_fingerprint_darts: {
    aura: "ending",
    title: "Ending: Dual Darts",
    copy:
      "Remus and Oji trigger the paired darts and die in shared poison sequence before extraction teams arrive.",
    ending: true
  },
  ending_fingerprint_bead: {
    aura: "ending",
    title: "Ending: Bead Silence",
    copy:
      "Remus accepts bead closure under witness, leaving Oji to be redistributed by the same system.",
    ending: true
  },
  ending_fingerprint_char: {
    aura: "ending",
    title: "Ending: Ember Fold",
    copy:
      "He enters charcoal intake during purge operations, collapsing body and record into one administrative event.",
    ending: true
  },
  ending_fingerprint_sponge: {
    aura: "ending",
    title: "Ending: Sponge Dose",
    copy:
      "Remus takes a terminal sponge dose reserved for frontier failures and dies before the next breeding cycle begins.",
    ending: true
  }
};

const ADVENTURES = {
  hallux: {
    startScene: "roof_perch",
    initialStats: { composure: 5, defiance: 4, kinship: 4 },
    initialHistory: "Miobeth climbs the roof before morning drills begin.",
    scenes
  },
  secretions: {
    startScene: "paprop_track",
    initialStats: { composure: 5, defiance: 4, kinship: 5 },
    initialHistory: "Tafella departs with Karin's veil and tightening timing.",
    scenes: scenesSecretions
  },
  pupil: {
    startScene: "archive_descent",
    initialStats: { composure: 5, defiance: 4, kinship: 5 },
    initialHistory: "Suvita descends toward the archive stacks before transfer to Anodi.",
    scenes: scenesPupil
  },
  fingerprint: {
    startScene: "reticulum_march",
    initialStats: { composure: 5, defiance: 5, kinship: 5 },
    initialHistory: "Remus leads the tunnel procession while scrutiny closes in.",
    scenes: scenesFingerprint
  }
};

const initialBookIndex = BOOKS.findIndex((book) => book.id === ACTIVE_BOOK_ID);
const initialAdventure = ADVENTURES[ACTIVE_BOOK_ID];

const state = {
  sceneId: initialAdventure.startScene,
  turn: 1,
  skin: "patina",
  autoCycleSkins: false,
  autoCycleTimer: null,
  skinAnimationFrame: null,
  currentBookIndex: initialBookIndex,
  completedBookIndices: new Set(),
  isTransitioning: false,
  stats: { ...initialAdventure.initialStats },
  history: [initialAdventure.initialHistory],
  pendingLead: "",
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
const imageLoadPromises = new Map();
const sceneImagePromises = new Map();
const sceneImageResolved = new Map();

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
    const nextAdventure = ADVENTURES[nextBook?.id];

    if (!nextBook || !nextAdventure) {
      return;
    }

    state.currentBookIndex = nextIndex;
    resetGame();
    pushHistory(`Book advanced: ${nextBook.title}.`);
    render();
  });
}

function getCurrentScenes() {
  const currentBook = BOOKS[state.currentBookIndex];
  const adventure = ADVENTURES[currentBook?.id];
  return adventure?.scenes || ADVENTURES.hallux.scenes;
}

function getCurrentAdventure() {
  const currentBook = BOOKS[state.currentBookIndex];
  return ADVENTURES[currentBook?.id] || ADVENTURES.hallux;
}

function withTimeout(promise, timeoutMs, fallback = null) {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        resolve(fallback);
      });
  });
}

function preloadImage(src) {
  if (!src) {
    return Promise.resolve(false);
  }
  if (imageLoadPromises.has(src)) {
    return imageLoadPromises.get(src);
  }

  const loadPromise = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
  imageLoadPromises.set(src, loadPromise);
  return loadPromise;
}

function getSceneAssetCandidates(sceneId) {
  const assets = SCENE_IMAGE_BY_ID[sceneId];
  if (!assets) {
    return [];
  }
  const candidates = [];
  if (assets.png) {
    candidates.push(assets.png);
  }
  if (assets.svg) {
    candidates.push(assets.svg);
  }
  return candidates;
}

function resolveSceneImageSource(sceneId) {
  if (sceneImageResolved.has(sceneId)) {
    return Promise.resolve(sceneImageResolved.get(sceneId));
  }
  if (sceneImagePromises.has(sceneId)) {
    return sceneImagePromises.get(sceneId);
  }

  const resolvePromise = (async () => {
    const candidates = getSceneAssetCandidates(sceneId);
    for (const src of candidates) {
      // Prefer the first successfully loaded candidate (png first, svg fallback).
      // This makes scene swaps coherent once cached.
      if (await preloadImage(src)) {
        sceneImageResolved.set(sceneId, src);
        return src;
      }
    }
    sceneImageResolved.set(sceneId, null);
    return null;
  })();

  sceneImagePromises.set(sceneId, resolvePromise);
  return resolvePromise;
}

function primeSceneImage(sceneId) {
  void resolveSceneImageSource(sceneId);
}

function primeChoiceSceneImages(scene) {
  const choices = scene.dynamicChoices ? makeResolveChoices() : scene.choices || [];
  choices.forEach((choice) => {
    if (choice.to) {
      primeSceneImage(choice.to);
    }
  });
}

function applySceneImage(sceneId, sceneTitle, prefetchedSrc = null) {
  const assets = SCENE_IMAGE_BY_ID[sceneId];
  if (!assets) {
    refs.sceneImage.removeAttribute("src");
    refs.sceneImage.alt = "";
    refs.sceneImage.style.visibility = "hidden";
    return;
  }

  refs.sceneImage.alt = sceneTitle;
  refs.sceneImage.style.visibility = "visible";
  if (prefetchedSrc) {
    refs.sceneImage.onerror = assets.svg
      ? () => {
          refs.sceneImage.onerror = null;
          refs.sceneImage.src = assets.svg;
        }
      : null;
    refs.sceneImage.src = prefetchedSrc;
  } else if (assets.png && assets.svg) {
    refs.sceneImage.onerror = () => {
      refs.sceneImage.onerror = null;
      refs.sceneImage.src = assets.svg;
    };
    refs.sceneImage.src = assets.png;
  } else {
    refs.sceneImage.onerror = null;
    refs.sceneImage.src = assets.svg;
  }
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
  const nextAdventure = ADVENTURES[nextBook?.id];

  if (!currentComplete || !nextBook || !nextAdventure) {
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
  const currentBook = BOOKS[state.currentBookIndex];
  if (currentBook?.id === "secretions") {
    const { composure, defiance, kinship } = state.stats;
    const tone =
      defiance >= composure && defiance >= kinship
        ? "Her stance remains openly disruptive."
        : kinship >= composure && kinship >= defiance
          ? "Her final frame protects others where possible."
          : "Her final posture remains controlled and procedural.";
    return [
      {
        label: "Take the ascension bead under witness",
        summary: `${tone}`,
        to: "ending_secretions_bead",
        note: "Tafella dies by sanctioned bead."
      },
      {
        label: "Request full venom sequence",
        summary: "Public pain protocol",
        to: "ending_secretions_darts",
        note: "Tafella dies under calibrated venom."
      },
      {
        label: "Accept collective cull assignment",
        summary: "Shared sentence",
        to: "ending_secretions_fire",
        note: "Tafella dies in the cull line."
      },
      {
        label: "Step into toxin flow ahead of broodline",
        summary: "Protective terminal act",
        to: "ending_secretions_shield",
        note: "Tafella dies shielding brood trays."
      }
    ];
  }
  if (currentBook?.id === "pupil") {
    const { composure, defiance, kinship } = state.stats;
    const tone =
      defiance >= composure && defiance >= kinship
        ? "Her final frame resists port authority to the end."
        : kinship >= composure && kinship >= defiance
          ? "Her final frame prioritizes what knowledge might continue."
          : "Her final frame remains procedural and contained.";
    return [
      {
        label: "Accept salt bead protocol",
        summary: `${tone}`,
        to: "ending_pupil_bead",
        note: "Suvita dies by bead protocol at Anodi."
      },
      {
        label: "Take the night pier and trust the tide",
        summary: "Unwitnessed terminal attempt",
        to: "ending_pupil_drown",
        note: "Suvita dies in tidal water below the pier."
      },
      {
        label: "Select calibrated dart sequence",
        summary: "Controlled hearing termination",
        to: "ending_pupil_dart",
        note: "Suvita dies by calibrated dart protocol."
      },
      {
        label: "Enter furnace intake as archive risk",
        summary: "Erase body, preserve trace",
        to: "ending_pupil_furnace",
        note: "Suvita dies in furnace intake."
      }
    ];
  }
  if (currentBook?.id === "fingerprint") {
    const { composure, defiance, kinship } = state.stats;
    const tone =
      defiance >= composure && defiance >= kinship
        ? "His final frame rejects administrative ownership."
        : kinship >= composure && kinship >= defiance
          ? "His final frame centers shared termination over solitary survival."
          : "His final frame remains disciplined and deliberate.";
    return [
      {
        label: "Trigger paired darts with Oji",
        summary: `${tone}`,
        to: "ending_fingerprint_darts",
        note: "Remus and Oji die by paired dart protocol."
      },
      {
        label: "Accept bead closure alone",
        summary: "Formal administrative ending",
        to: "ending_fingerprint_bead",
        note: "Remus dies by bead protocol."
      },
      {
        label: "Enter charcoal intake during purge",
        summary: "Industrial terminal route",
        to: "ending_fingerprint_char",
        note: "Remus dies in charcoal intake."
      },
      {
        label: "Take terminal sponge dose",
        summary: "Frontier failure protocol",
        to: "ending_fingerprint_sponge",
        note: "Remus dies under sponge-dose protocol."
      }
    ];
  }

  const { composure, defiance, kinship } = state.stats;

  const tone =
    defiance >= composure && defiance >= kinship
      ? "Her defiance dominates the chamber."
      : kinship >= composure && kinship >= defiance
        ? "Her choices center who else may survive the moment."
        : "Her posture favors control and formal closure.";

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
    const isFinalBook = state.currentBookIndex === BOOKS.length - 1;

    if (!isFinalBook) {
      const restart = document.createElement("button");
      restart.className = "choice choice-simple";
      restart.innerHTML =
        "<div class=\"choice-copy\"><strong>Restart this book</strong><small>Return to Step 1 and try a different fatal path</small></div>";
      restart.addEventListener("click", () => {
        resetGame();
        render();
      });
      refs.choices.appendChild(restart);
    }

    if (isFinalBook) {
      BOOKS.forEach((book, index) => {
        const hasAdventure = Boolean(ADVENTURES[book.id]);
        if (!hasAdventure) {
          return;
        }
        const jump = document.createElement("button");
        jump.className = "choice choice-simple";
        jump.innerHTML =
          `<div class="choice-copy"><strong>Restart ${book.title}</strong><small>Begin again at Step 1 of Book ${index + 1}</small></div>`;
        jump.addEventListener("click", () => {
          state.currentBookIndex = index;
          resetGame();
          pushHistory(`Book restart selected: ${book.title}.`);
          render();
        });
        refs.choices.appendChild(jump);
      });
    }

    renderBookSequence();
    renderNextBookOffer();
    return;
  }

  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.style.animationDelay = `${index * 80}ms`;
    const choiceImage = CHOICE_IMAGE_BY_LABEL[choice.label];
    if (!choiceImage) {
      button.classList.add("choice-simple");
    }
    button.innerHTML = `
      ${choiceImage ? `<img class="choice-thumb" src="${choiceImage}" alt="${choice.label}" />` : ""}
      <div class="choice-copy">
        <strong>${choice.label}</strong>
        <small>${choice.summary}</small>
      </div>
    `;
    button.addEventListener("click", () => {
      if (state.isTransitioning) {
        return;
      }
      const beforeScene = getCurrentScenes()[state.sceneId];
      applyStatDelta(choice.stats);
      state.turn += 1;
      state.sceneId = choice.to;
      state.pendingLead = choice.lead || "";
      pushHistory(`${beforeScene.title}: ${choice.note || choice.label}`);
      transitionRender(choice.to);
    });
    refs.choices.appendChild(button);
  });
}

async function transitionRender(targetSceneId) {
  state.isTransitioning = true;
  refs.stage.classList.add("is-switching");
  const minDelay = new Promise((resolve) => setTimeout(resolve, SCENE_SWITCH_MS));
  const nextImagePromise = resolveSceneImageSource(targetSceneId);
  const nextImageSrc = await withTimeout(nextImagePromise, SCENE_SYNC_TIMEOUT_MS, null);
  await minDelay;
  try {
    refs.stage.classList.remove("is-switching");
    render(nextImageSrc);
  } finally {
    state.isTransitioning = false;
  }
}

function render(nextSceneImageSrc = null) {
  const scene = getCurrentScenes()[state.sceneId];
  refs.turnLabel.textContent = `Step ${state.turn}`;
  refs.aura.textContent = scene.aura;
  refs.title.textContent = scene.title;
  applySceneImage(state.sceneId, scene.title, nextSceneImageSrc);
  refs.copy.textContent = state.pendingLead ? `${state.pendingLead} ${scene.copy}` : scene.copy;

  refs.stage.classList.remove("aura-authority", "aura-threshold", "aura-kin", "aura-ending");
  refs.stage.classList.add(`aura-${scene.aura}`);

  renderBookTitle();
  renderChoices(scene);
  updateStatsUI();
  renderHistory();
  renderBookSequence();
  renderNextBookOffer();
  primeSceneImage(state.sceneId);
  primeChoiceSceneImages(scene);
}

function resetGame() {
  const adventure = getCurrentAdventure();
  state.sceneId = adventure.startScene;
  state.turn = 1;
  state.stats = { ...adventure.initialStats };
  state.meterSnapshot = { ...state.stats };
  state.history = [adventure.initialHistory];
  state.pendingLead = "";
}

bindSkinControls();
bindNextBookButton();
setSkin(state.skin, false);
syncCycleButton();
render();
