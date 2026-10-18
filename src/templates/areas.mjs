/**
 * Research-area deep dives: one page per theme, each with its own animated
 * schematic, headline numbers, and a card per study. Content is drawn from
 * the manuscripts themselves; status labels match the publications list.
 *
 * House style: no em dashes or en dashes in visible copy.
 */

import { esc, attr, tidy } from './helpers.mjs';
import { eee } from './graphics.mjs';

/* ------------------------------------------------------------------ heroes
   Each is a self-contained SVG. Presentation attributes are set inline so the
   drawing is legible before the deferred stylesheet arrives; CSS adds colour
   and motion. */

const sicHero = `
<svg class="ah-svg" viewBox="0 0 640 300" fill="none" stroke="currentColor" focusable="false" aria-hidden="true">
  <!-- heatsink fins -->
  <g class="ah-dim">
    <path d="M140 250h360" stroke-width="2"/>
    <path d="M160 250v34M190 250v34M220 250v34M250 250v34M280 250v34M310 250v34M340 250v34M370 250v34M400 250v34M430 250v34M460 250v34M490 250v34" stroke-width="1.4"/>
  </g>
  <!-- package stack: baseplate, DBC, solder, die -->
  <rect x="150" y="226" width="340" height="24" rx="2" class="ah-layer ah-layer--base"/>
  <rect x="190" y="206" width="260" height="20" rx="2" class="ah-layer ah-layer--dbc"/>
  <rect x="238" y="198" width="164" height="8" class="ah-layer ah-layer--bond"/>
  <rect x="250" y="168" width="140" height="30" rx="2" class="ah-layer ah-layer--die"/>
  <!-- bond wires -->
  <path d="M276 168c10-40 50-40 64-6M312 168c12-46 70-46 86-2" class="ah-wire"/>
  <!-- hot spot and heat flow -->
  <circle cx="320" cy="178" r="16" class="ah-hot"/>
  <g class="ah-heat">
    <path d="M300 200v44M320 200v44M340 200v44M280 210v34M360 210v34"/>
  </g>
  <!-- microring sensors on the baseplate edge -->
  <g class="ah-ring">
    <circle cx="176" cy="238" r="8"/><circle cx="176" cy="238" r="4.5"/>
  </g>
  <g class="ah-ring ah-ring--b">
    <circle cx="464" cy="238" r="8"/><circle cx="464" cy="238" r="4.5"/>
  </g>
  <!-- labels -->
  <g class="ah-text">
    <text x="320" y="186" text-anchor="middle">SiC DIE</text>
    <text x="520" y="214">DBC</text>
    <text x="520" y="242">BASEPLATE</text>
    <text x="520" y="278">HEATSINK</text>
    <text x="120" y="242" text-anchor="end">RING A</text>
    <text x="78" y="262" class="ah-text--faint">bonded</text>
    <text x="520" y="196">BOND</text>
  </g>
  <!-- Tj readout and thermal trace -->
  <g transform="translate(40 30)">
    <rect width="210" height="96" rx="10" class="ah-panel"/>
    <text x="14" y="22" class="ah-text ah-text--accent">Tj HISTORY</text>
    <path d="M14 76 C 40 76, 46 40, 70 40 S 110 60, 130 60 S 160 34, 176 34" class="ah-trace"/>
    <path d="M14 82 C 40 82, 50 70, 74 66 S 118 70, 136 70 S 162 52, 176 50" class="ah-trace ah-trace--b"/>
    <text x="14" y="90" class="ah-text ah-text--faint">same P, Q, V · ΔTj 27.6 K</text>
  </g>
  <g transform="translate(430 30)">
    <rect width="170" height="70" rx="10" class="ah-panel"/>
    <text x="14" y="22" class="ah-text ah-text--accent">GaN HEMT</text>
    <text x="14" y="42" class="ah-text">peak rise 51.4 K</text>
    <text x="14" y="58" class="ah-text ah-text--faint">PINN 166× faster</text>
  </g>
</svg>`;

const gfmHero = `
<svg class="ah-svg" viewBox="0 0 640 300" fill="none" stroke="currentColor" focusable="false" aria-hidden="true">
  <g class="ah-panel-g">
    <rect x="30" y="20" width="380" height="250" rx="12" class="ah-panel"/>
    <g class="ah-grid">
      <path d="M60 60h330M60 110h330M60 160h330M60 210h330M60 250h330"/>
      <path d="M60 50v200M126 50v200M192 50v200M258 50v200M324 50v200M390 50v200"/>
    </g>
    <text x="48" y="64" text-anchor="end" class="ah-text ah-text--faint">60.0</text>
    <text x="48" y="164" text-anchor="end" class="ah-text ah-text--faint">59.2</text>
    <text x="48" y="254" text-anchor="end" class="ah-text ah-text--faint">58.0</text>
    <text x="60" y="40" class="ah-text ah-text--accent">FREQUENCY AFTER THE GRID WEAKENS (Hz)</text>
    <!-- GFL: deep nadir -->
    <path class="ah-draw ah-draw--b" pathLength="1" d="M60 62 H 140 C 170 64, 190 236, 222 240 S 270 190, 300 170 S 360 150, 390 148"/>
    <!-- GFM: shallow nadir -->
    <path class="ah-draw" pathLength="1" d="M60 62 H 140 C 160 64, 180 158, 205 160 S 250 90, 290 74 S 360 66, 390 64"/>
    <path d="M140 54v204" class="ah-event"/>
    <text x="144" y="268" class="ah-text ah-text--faint">SCR 5 → 0.44</text>
    <g class="ah-legend">
      <path d="M250 214h18" class="ah-draw-key"/><text x="274" y="218" class="ah-text">adaptive GFM 59.24</text>
      <path d="M250 234h18" class="ah-draw-key ah-draw-key--b"/><text x="274" y="238" class="ah-text">fixed GFL 58.07</text>
    </g>
  </g>
  <!-- VSG swing / phasor -->
  <g transform="translate(520 100)">
    <circle r="78" class="ah-dim"/>
    <circle r="50" class="ah-dim"/>
    <path d="M-90 0h180M0-90v180" class="ah-dim"/>
    <g class="ah-rotor"><path d="M0 0L66 -30" class="ah-vec"/><circle cx="66" cy="-30" r="4" class="ah-dot"/></g>
    <g class="ah-rotor ah-rotor--lag"><path d="M0 0L60 -42" class="ah-vec ah-vec--b"/><circle cx="60" cy="-42" r="4" class="ah-dot ah-dot--b"/></g>
    <text x="0" y="98" text-anchor="middle" class="ah-text ah-text--accent">VSG SWING · H, D</text>
    <text x="0" y="112" text-anchor="middle" class="ah-text ah-text--faint">H, D within 1.9% / 0.8%</text>
  </g>
  <g transform="translate(450 240)">
    <rect width="140" height="40" rx="8" class="ah-panel"/>
    <circle cx="20" cy="20" r="6" class="ah-led"/>
    <text x="34" y="18" class="ah-text">MODE</text>
    <text x="34" y="31" class="ah-text ah-text--accent ah-mode">GFL → GFM 0.54 s</text>
  </g>
</svg>`;

const twinHero = `
<svg class="ah-svg" viewBox="0 0 640 300" fill="none" stroke="currentColor" focusable="false" aria-hidden="true">
  <!-- Fisher information spectrum with admissible amplitude -->
  <g transform="translate(30 20)">
    <rect width="340" height="250" rx="12" class="ah-panel"/>
    <text x="18" y="26" class="ah-text ah-text--accent">INFORMATION vs SAFE AMPLITUDE</text>
    <g class="ah-grid"><path d="M30 60h290M30 110h290M30 160h290M30 210h290M30 50v170M102 50v170M174 50v170M246 50v170M318 50v170"/></g>
    <path class="ah-draw" pathLength="1" d="M30 200 C 70 190, 100 70, 130 66 S 170 160, 210 176 S 290 196, 318 200"/>
    <path class="ah-draw ah-draw--b" pathLength="1" d="M30 214 C 110 212, 170 190, 220 140 S 290 86, 318 80"/>
    <path class="ah-band" d="M30 200 C 70 196, 120 180, 160 170 S 230 110, 250 96 S 300 100, 318 120 L 318 210 L 30 214 Z"/>
    <circle cx="130" cy="66" r="5" class="ah-dot ah-dot--b"/>
    <text x="136" y="60" class="ah-text ah-text--faint">peak 1044 Hz</text>
    <circle cx="246" cy="112" r="6" class="ah-dot ah-pulse"/>
    <text x="252" y="104" class="ah-text">optimum 2721 Hz</text>
    <text x="30" y="238" class="ah-text ah-text--faint">frequency →</text>
  </g>
  <!-- calibration loop -->
  <g transform="translate(410 30)">
    <rect width="200" height="110" rx="12" class="ah-panel"/>
    <text x="16" y="24" class="ah-text ah-text--accent">SELF-CALIBRATION</text>
    <rect x="16" y="40" width="168" height="8" rx="4" class="ah-track"/>
    <rect x="16" y="40" width="168" height="8" rx="4" class="ah-fill"/>
    <rect x="16" y="58" width="168" height="8" rx="4" class="ah-track"/>
    <rect x="16" y="58" width="168" height="8" rx="4" class="ah-fill ah-fill--b"/>
    <rect x="16" y="76" width="168" height="8" rx="4" class="ah-track"/>
    <rect x="16" y="76" width="168" height="8" rx="4" class="ah-fill ah-fill--c"/>
    <text x="16" y="102" class="ah-text ah-text--faint">3 tests · ≤ 1.53% error</text>
  </g>
  <g transform="translate(410 160)">
    <rect width="200" height="110" rx="12" class="ah-panel"/>
    <text x="16" y="24" class="ah-text ah-text--accent">CONFORMAL BAND</text>
    <path class="ah-band" d="M16 70 C 50 46, 80 86, 110 60 S 160 40, 184 56 L 184 84 C 160 70, 130 96, 110 88 S 50 76, 16 96 Z"/>
    <path class="ah-trace" d="M16 84 C 50 60, 80 98, 110 74 S 160 54, 184 70"/>
    <circle r="3.5" class="ah-dot"><animateMotion dur="4.5s" repeatCount="indefinite" path="M16 84 C 50 60, 80 98, 110 74 S 160 54, 184 70"/></circle>
    <text x="16" y="102" class="ah-text ah-text--faint">PICP 95.34% · 22 inverters</text>
  </g>
</svg>`;

const cyberHero = `
<svg class="ah-svg" viewBox="0 0 640 300" fill="none" stroke="currentColor" focusable="false" aria-hidden="true">
  <!-- pipeline control loop -->
  <g transform="translate(30 30)">
    <rect width="360" height="240" rx="12" class="ah-panel"/>
    <text x="18" y="26" class="ah-text ah-text--accent">PIPELINE CONTROL LOOP</text>
    <path d="M40 130h90M190 130h60M300 130h40" class="ah-pipe"/>
    <path d="M40 130h90M190 130h60M300 130h40" class="ah-pipe-flow"/>
    <!-- pump -->
    <circle cx="160" cy="130" r="26" class="ah-equip"/>
    <path d="M148 118l24 12-24 12z" class="ah-equip"/>
    <!-- valve -->
    <path d="M250 116l50 28M250 144l50-28M250 116v28M300 116v28" class="ah-equip"/>
    <path d="M275 130v-28M265 102h20" class="ah-equip"/>
    <!-- controller -->
    <rect x="200" y="50" width="70" height="30" rx="6" class="ah-equip"/>
    <text x="235" y="70" text-anchor="middle" class="ah-text">PI</text>
    <path d="M235 80v20M270 65h40v40" class="ah-signal"/>
    <path d="M200 65h-80v40" class="ah-signal"/>
    <!-- sensor -->
    <circle cx="330" cy="130" r="8" class="ah-equip"/>
    <text x="330" y="160" text-anchor="middle" class="ah-text ah-text--faint">FT</text>
    <!-- spoof injected -->
    <g class="ah-spoof">
      <path d="M330 118 C 330 90, 330 90, 310 80" />
      <circle cx="306" cy="78" r="9"/>
      <text x="292" y="58" class="ah-text ah-text--warn">spoofed reading</text>
    </g>
    <!-- residual layers -->
    <g transform="translate(18 182)">
      <text x="0" y="0" class="ah-text ah-text--faint">LOOP-INTEGRITY RESIDUALS</text>
      <rect x="0" y="10" width="74" height="30" rx="5" class="ah-res"/>
      <rect x="82" y="10" width="74" height="30" rx="5" class="ah-res"/>
      <rect x="164" y="10" width="74" height="30" rx="5" class="ah-res ah-res--alarm"/>
      <rect x="246" y="10" width="74" height="30" rx="5" class="ah-res"/>
      <text x="37" y="29" text-anchor="middle" class="ah-text">intent</text>
      <text x="119" y="29" text-anchor="middle" class="ah-text">integral</text>
      <text x="201" y="29" text-anchor="middle" class="ah-text">actuator</text>
      <text x="283" y="29" text-anchor="middle" class="ah-text">mass bal.</text>
    </g>
  </g>
  <!-- generalization collapse bars -->
  <g transform="translate(420 30)">
    <rect width="190" height="240" rx="12" class="ah-panel"/>
    <text x="16" y="26" class="ah-text ah-text--accent">ACCURACY UNDER SHIFT</text>
    <g transform="translate(24 200)">
      <rect x="0" y="-150" width="26" height="150" class="ah-bar"/>
      <rect x="38" y="-147" width="26" height="147" class="ah-bar"/>
      <rect x="76" y="-69" width="26" height="69" class="ah-bar ah-bar--warn"/>
      <rect x="114" y="-2" width="26" height="2" class="ah-bar ah-bar--warn"/>
      <text x="13" y="16" text-anchor="middle" class="ah-text ah-text--faint">rand</text>
      <text x="51" y="16" text-anchor="middle" class="ah-text ah-text--faint">ep.</text>
      <text x="89" y="16" text-anchor="middle" class="ah-text ah-text--faint">sess.</text>
      <text x="127" y="16" text-anchor="middle" class="ah-text ah-text--faint">new</text>
      <text x="13" y="-156" text-anchor="middle" class="ah-text">98%</text>
      <text x="89" y="-75" text-anchor="middle" class="ah-text">46%</text>
      <text x="127" y="-8" text-anchor="middle" class="ah-text">0%</text>
    </g>
  </g>
</svg>`;

/* ------------------------------------------------------------------- areas */

export const areas = [
  {
    slug: 'power-electronics',
    short: 'SiC and GaN power electronics',
    title: 'SiC and GaN power-electronics reliability',
    icon: 'thermo',
    hero: sicHero,
    lede: 'Wide-bandgap devices switch faster and run hotter than silicon, and the temperature that actually ages them sits where no sensor can reach. This work estimates that hidden thermal state, senses bond degradation inside the package, and decides how hard a SiC inverter should be driven, using electrothermal finite-element models, reduced-order networks and physics-informed learning.',
    questions: [
      'Can an inverter know its own junction temperature from the electrical signals it already measures, or does the load history hide it?',
      'What really limits an embedded optical sensor that watches the bond layer of a SiC module?',
      'How much renewable energy can a SiC inverter keep delivering when cooling degrades, if it adapts its own operating point?',
      'How do you recover the hot spot inside a GaN HEMT from a handful of surface readings?',
    ],
    stats: [
      ['27.6 K', 'junction-temperature spread hidden behind identical electrical readings'],
      ['0.060 K', 'RMSE of the six-pole reduced thermal model against 31 FE trajectories'],
      ['22.8 K', 'peak Tj underestimated when loss temperature dependence is ignored'],
      ['7.5%', 'bond strain-transfer detection threshold at the photonic design point'],
    ],
    works: [
      {
        title: 'Thermal-history ambiguity in grid-connected SiC PV inverters',
        pub: 'scirep2026-sic-thermal-history',
        status: 'Under review · Scientific Reports',
        body: 'A calibrated electrothermal FE model of a 100 kW inverter on a 1200 V, 300 A SiC half-bridge shows four load histories that end at the same P, Q, voltage and current but leave junction temperatures up to 27.6 K apart (33.9 K with degraded cooling), while every electrical quantity differs by at most 0.028 sensor standard deviations.',
        results: [
          'The hidden difference decays with the 203 s heatsink time constant and stays above 1 K for 669 s.',
          'Instantaneous estimators cannot resolve it: an MLP predicts a 1.4 K spread against the true 27.6 K.',
          'Temporal estimators with a 600 s history recover Tj to within 0.5 to 0.7 K; a physics-constrained CNN-GRU adds uncertainty-aware derating.',
        ],
        tools: ['COMSOL 6.4', 'MATLAB/Simulink', 'Foster ROM', 'PyTorch', 'Conformal prediction'],
        links: [{ label: 'Open dataset', href: 'https://github.com/md-sazzad-eee/sic-pv-thermal-history-dataset' }],
      },
      {
        title: 'Photonic bond-health sensing in SiC power modules',
        pub: 'natcomms2026-photonic-bond-health',
        status: 'Submitted · Nature Communications',
        body: 'Two identical silicon microring resonators, one bonded to the baseplate of a 1200 V, 450 A SiC module and one isolated on an etched island, separate bond degradation from temperature without an external reference. The limit is not wavelength resolution but differential drift of the two rings’ thermo-optic calibration.',
        results: [
          'A closed-form detectability law with one dimensionless figure of merit Γ; the full Fisher bound lies within 0.89 to 1.01 times the law over 168 cases.',
          'At the design point (100 µm chip, 25 µm epoxy bond, Γ = 0.167), 0.2% drift per ring sets the threshold at 7.5% of strain transfer.',
          'A ratiometric two-heater self-calibration removes the drift that the converter’s own transients cannot.',
        ],
        tools: ['COMSOL', 'Custom FE codes', 'Waveguide mode solver', 'Fisher information', 'Monte Carlo'],
        links: [{ label: 'Open dataset', href: 'https://github.com/md-sazzad-eee/Photonic-sensor-power-dataset' }],
      },
      {
        title: 'Electrothermal operating-point optimization of a SiC PV inverter',
        pub: 'icrest2027-sic-operating-point',
        status: 'Submitted · ICREST 2027',
        body: 'A digital twin of a 184 kW SiC inverter couples a data-sheet-calibrated loss model, a 3-D FE thermal surrogate and a grid-current model, then picks switching frequency, gate resistance, fan level and curtailment as a discrete optimization solved with QAOA.',
        results: [
          'Matches published current capability within 0.6%, FE temperatures within 0.25 K RMSE and a switched Simulink model within 1.1%.',
          'Under degraded cooling the adaptive twin lifts renewable utilization from 98.0% to 99.2%, and to 100% with PWM selection.',
          'An honest quantum benchmark: QAOA samples the optimum only 2 to 3 times more often than uniform sampling, so classical heuristics remain preferable.',
        ],
        tools: ['COMSOL', 'MATLAB/Simulink', 'QUBO / QAOA', 'Python'],
      },
      {
        title: 'Inverse hot-spot and power estimation in GaN HEMTs',
        pub: 'icece2026-gan-hemt',
        status: 'Submitted · ICECE 2026',
        body: 'A two-branch physics-informed neural network, one branch per material layer, coupled by flux continuity and thermal boundary resistance, recovers the gate-edge hot spot and the unknown dissipated power from a few surface temperatures.',
        results: [
          'Represents the 17.1 K GaN/SiC interface jump exactly; reproduces the 51.4 K peak rise within 2.62 K.',
          'An analytic Green’s-function term makes power identification a closed-form solve in microseconds, 166 times faster than the finite-volume solver.',
          'Shows identifiability is limited by forward-model residual, not by sensor count or noise up to 2 K.',
        ],
        tools: ['PINN', 'PyTorch', 'Green’s functions', 'Finite volume'],
      },
      {
        title: 'DC-link capacitor health from grid events',
        pub: 'pesim2027-dclink-capacitor',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'A grid-forming inverter turns small phase jumps and voltage steps into a strong DC-link transient. A twin beside the controller reconstructs the capacitor current, fits C and ESR per event with self-calibrating integral least squares, and fuses events into a temperature-normalized health index.',
        results: [
          'A 4° phase jump moves the DC link by 25 V under GFM control but only 0.3 V under GFL.',
          'Tracks C within 1.43% and ESR within 11.2% RMS over eight accelerated lifetimes.',
          'End-of-life warning 9 to 18 events early with no false or missed alarms.',
        ],
        tools: ['MATLAB/Simulink', 'Least squares', 'Condition monitoring'],
      },
      {
        title: 'When an LCL inductor twin stops being valid',
        pub: 'pesim2027-lcl-inductor',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'A gapped ferrite inductor modelled in COMSOL with a temperature-dependent B-H curve shows that loading history, not the sag itself, heats the core, and the sag current then drives it into saturation.',
        results: [
          'Incremental inductance falls to 0.80, 0.49 and 0.32 of nominal at 0.25, 0.30 and 0.35 T rated flux.',
          'Over 1456 cases the probability that a fixed-parameter twin is invalid rises from 0.02 to 0.40 as flux margin shrinks.',
          'A threshold temperature computed from the magnetic design locates the boundary.',
        ],
        tools: ['COMSOL', 'MATLAB/Simulink', 'Thermal networks'],
      },
    ],
  },
  {
    slug: 'grid-forming',
    short: 'Grid-forming inverters',
    title: 'Grid-forming inverters and weak-grid stability',
    icon: 'inverter',
    hero: gfmHero,
    lede: 'As synchronous machines retire, inverters have to hold up voltage and frequency themselves. This work asks when a battery should switch between grid-following and grid-forming control, how to watch the virtual inertia and damping that a grid-forming battery provides, and how to keep that stability guarantee honest under real disturbances.',
    questions: [
      'How can a plant measure grid strength online and choose grid-forming or grid-following control safely?',
      'Can a twin tell a tampered virtual inertia from a genuinely degrading one?',
      'How should a grid-forming inverter retune itself across grid strength, irradiance and temperature?',
      'Does the order of disturbances matter, and what does a memoryless twin miss?',
    ],
    stats: [
      ['5.0%', 'mean SCR estimation error on unseen conditions (22% physics-only)'],
      ['0.54 s', 'from grid weakening to grid-forming hand-over'],
      ['3.97 s', 'to detect a stealthy rewrite of VSG inertia'],
      ['98.9%', 'power delivered by adaptive GFM tuning vs 92.3% fixed'],
    ],
    works: [
      {
        title: 'Physics-informed grid-strength estimation for adaptive GFM/GFL control',
        pub: 'prep2026-grid-strength',
        status: 'In preparation · journal',
        body: 'A voltage-bounded 10 Hz reactive probe, lock-in demodulation and physics-derived sensitivity features feed a small network that returns the short-circuit ratio; a supervisor with an event gate, an oscillation fail-safe and a filtered hand-over picks the battery converter’s control mode.',
        results: [
          'On a 100 MW PV and 35 MVA / 60 MWh battery plant: 5.0% mean and 3.0% median SCR error, against 22% for physics alone and 91% for an operating-point-only network.',
          'When SCR falls from 5 to 0.44 the supervisor switches to GFM 0.54 s later: nadir 59.24 Hz against 58.07 Hz for fixed GFL.',
          'No misclassified test window across the mode thresholds.',
        ],
        tools: ['MATLAB/Simulink', 'EMT simulation', 'Neural networks', 'Lock-in detection'],
      },
      {
        title: 'Saturation-aware digital twin of a VSG-controlled battery',
        pub: 'pesim2027-vsg-inertia',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'Virtual inertia H and damping D are software parameters that do not affect steady state, so a stealthy rewrite is invisible until a disturbance. A twin of the swing loop identifies the effective H and D online with state-variable-filter RLS and classifies departures as tampering or degradation from how fast they occur.',
        results: [
          'Tracks frequency to 1.02 mHz; identifies H and D within 1.9% and 0.8%.',
          'Detects tampering 3.97 s after it occurs and rolls it back before the next disturbance.',
          'Zero false alarms over 200 Monte Carlo runs, where a twin without the saturation model false-alarms in 94% of large disturbances.',
        ],
        tools: ['MATLAB/Simulink', 'RLS identification', 'Islanded microgrids'],
      },
      {
        title: 'Self-reconfiguration of grid-forming inverters',
        pub: 'icrest2027-quantum-reconfiguration',
        status: 'Submitted · ICREST 2027',
        body: 'The inverter chooses its own virtual inertia, virtual impedance and curtailment from a discrete library, verified online by a multiphysics twin that couples an averaged dq model with a COMSOL-fitted thermal network.',
        results: [
          'Every one of 324 operating points has a feasible setting with at most 10% curtailment.',
          'Adaptive selection delivers 98.9% of available power on average against 92.3% for the best fixed tuning.',
          'A constraint-preserving QAOA mixer finds the verified optimum in 94% of points, with no speed advantage at this size.',
        ],
        tools: ['MATLAB/Simulink', 'COMSOL', 'QUBO / QAOA'],
      },
      {
        title: 'Stability-aware demand-side management under EV charging',
        pub: 'ukfcet2026-dsm-evcharging',
        status: 'Accepted · IEEE ICICAIEECE 2027',
        body: 'Schedules flexible demand so that EV charging disturbances do not push a grid-forming inverter past its transient-stability limits.',
        results: [],
        tools: ['MATLAB/Simulink', 'Transient stability'],
      },
      {
        title: 'Statistical stability guarantees with a neural Zubov score',
        pub: 'tpec2027-neural-zubov',
        status: 'Submitted · IEEE TPEC 2027',
        body: 'A physics-informed neural approximation of the Zubov equation gives plant-anchored, statistically certified regions of attraction for grid-forming inverters.',
        results: [],
        tools: ['PINN', 'Lyapunov / Zubov', 'Statistical certification'],
      },
      {
        title: 'Disturbance-order memory and a physics-memory twin',
        pub: 'pesim2027-disturbance-memory',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'An IEEE 9-bus model with an overexcitation limiter, a tap changer and a battery is driven by 3,000 swapped-order disturbance sequences to measure when history changes the transient.',
        results: [
          'The limiter latch dominates: after an 80 ms fault the history index of a later line trip stays above 1.07 for gaps up to 12 s.',
          'Hidden memory explains 17% of memoryless twin error overall and 33% for events 15 to 30 s apart.',
          'A twin that rebuilds the limiter state from field-voltage telemetry cuts error by 29% and closes 73% of the gap to an all-state oracle.',
        ],
        tools: ['MATLAB/Simulink', 'IEEE 9-bus', 'Recurrent networks'],
      },
    ],
  },
  {
    slug: 'digital-twins',
    short: 'Self-calibrating digital twins',
    title: 'Self-calibrating digital twins with honest uncertainty',
    icon: 'twin',
    hero: twinHero,
    lede: 'A digital twin is only as good as the parameters it carries and as honest as the uncertainty it reports. This work designs the experiments a twin uses to recalibrate itself, proves which parameters can and cannot be identified, wraps predictions in conformal intervals with coverage guarantees, and decides when a twin has gone stale.',
    questions: [
      'Which inverter parameters can a twin actually identify, and which excitation reveals them without disturbing the grid?',
      'How should a twin choose its own tests, and does quantum optimization help?',
      'When has a deployed twin drifted far enough to retrain?',
      'Can battery and PV twins report calibrated uncertainty rather than bare point estimates?',
    ],
    stats: [
      ['2721 Hz', 'safety-constrained optimal probe, 2.6× the raw sensitivity peak'],
      ['22×', 'better PLL-gain information at SCR 2 than at SCR 10'],
      ['95.34%', 'interval coverage of the published PV twin across 22 inverters'],
      ['1.5%', 'SOC error after a 20% initialization error (9.3% open loop)'],
    ],
    works: [
      {
        title: 'Physics-informed self-calibrating PV digital twin',
        pub: 'tensymp2026-digitaltwin',
        status: 'Published · IEEE TENSYMP 2026',
        body: 'A compact irradiance-temperature physics baseline, an inverter-aware residual model, physics-normalized conformal intervals and online self-calibration, evaluated on inverter-level data from a 22-inverter plant.',
        results: [
          'Online self-calibrating twin: R² = 0.9155, RMSE = 794.1 W, PICP = 95.34%, lowest WIS of 4304.9 W.',
          'Uncertainty-aware screening finds inverters that stay under-covered and high-risk even when fleet results look good.',
        ],
        tools: ['Python', 'Gradient boosting', 'Conformal prediction'],
        links: [{ label: 'IEEE Xplore', href: 'https://doi.org/10.1109/TENSYMP68909.2026.11704052' }],
      },
      {
        title: 'Information-aware, safety-constrained excitation design',
        pub: 'scirep2026-excitation-design',
        status: 'Under review · Scientific Reports',
        body: 'Proves that identifiability of the converter-side LCL inductance depends on the excitation, not the sensor set, then makes probe design convex with a spectral Fisher-information formulation under limits on distortion, frequency, current and power.',
        results: [
          'Complex-step sensitivities agree with finite differences to 129 ppb and a symbolic Jacobian to 1.55 ppq.',
          'The sensitivity peak at 1044 Hz gives a 0.79% bound, but the constrained optimum sits at 2721 Hz because the grid tolerates 20 times the amplitude there.',
        ],
        tools: ['MATLAB', 'Complex-step differentiation', 'Fisher information', 'Convex optimization'],
      },
      {
        title: 'Information-driven experiment selection and weak-grid identifiability',
        pub: 'icrest2027-experiment-selection',
        status: 'Submitted · ICREST 2027',
        body: 'A grey-box twin of a 10 kVA inverter with an LCL filter and SRF-PLL scores 24 candidate injections by information gain minus grid disturbance and selects the best three-test batch exactly, greedily, or with QAOA.',
        results: [
          'An active-current step constrains the PLL gain 22 times better at SCR 2 than at SCR 10; filter resistance is not identifiable in closed loop.',
          'Three selected tests reach 0.74 to 1.53% RMS error, where a fixed set needs nine tests and 4 to 7 times the disturbance.',
          'Greedy selection reaches 98.9% of the optimal utility.',
        ],
        tools: ['MATLAB/Simulink', 'Grey-box models', 'QAOA'],
      },
      {
        title: 'Calibrated staleness detection for renewable-fleet twins',
        pub: 'nextsust2026-staleness-journal',
        status: 'Under review · Next Sustainability',
        body: 'Benchmarks five sequential drift detectors at a matched false-alarm rate across sixteen European solar and wind fleets over six years, and shows the retraining window, not the trigger, decides whether recalibration pays off.',
        results: [
          'Across sixteen fleets the mean Page-Hinkley lead over a rolling-RMSE chart is minus 18 days once false alarms are matched.',
          'Structural fleet growth explains 70 to 93% of the mean residual on the solar fleets examined.',
        ],
        tools: ['Python', 'Random forest', 'CUSUM / EWMA / Page-Hinkley', 'Block bootstrap'],
      },
      {
        title: 'Multi-cell battery twin with closed-loop Kalman filtering',
        pub: 'ecmx2026-battery-twin',
        status: 'Submitted · ECM: X',
        body: 'A Thevenin model with a fifth-order OCV polynomial, an EKF for closed-loop state estimation, a resistance-growth aging model and an RUL predictor with 95% bounds, validated on four aged cells.',
        results: [
          'The filter cuts voltage RMSE from 286.4 to 101.1 mV and recovers SOC within 1.5% under a 20% initialization error.',
          'Trained on the first 60% of life, the predictor locates end of life within 0.2 to 10.1 cycles.',
        ],
        tools: ['Python', 'EKF', 'Equivalent-circuit models'],
      },
      {
        title: 'Adaptive UKF for EV battery SOC, resistance and SOH',
        pub: 'icrest2027-ukf-ev-battery',
        status: 'Submitted · ICREST 2027',
        body: 'An adaptive square-root UKF on a 27 Ah cell, tested on an FTP-75 drive cycle with a 30-point initial SOC error, 5 to 40 °C ambient, injected resistance growth and capacity fade.',
        results: [
          'Re-enters a 2% error band in 395 s with 0.46% RMSE, where an adaptive EKF needs about 4 h.',
          'SOH estimates of 74.9% and 50.0% against true 75% and 50%; also reports honestly that a 10% capacity fade goes undetected.',
        ],
        tools: ['MATLAB/Simulink', 'UKF', 'Drive cycles'],
      },
    ],
  },
  {
    slug: 'cyber-physical',
    short: 'Cyber-physical security',
    title: 'Trustworthy detection of cyber-physical attacks',
    icon: 'shield',
    hero: cyberHero,
    lede: 'Most published intrusion detectors look excellent on random splits and fail the moment operation changes. This work evaluates detectors the way a control room would meet them, held-out sessions, unseen setpoints and unseen attacks, and builds physics-based monitors and conformal wrappers that stay honest when the data shifts.',
    questions: [
      'How much of a detector’s reported accuracy is memorized context rather than physics?',
      'Can a monitor trained only on normal operation detect and localize attacks it has never seen?',
      'How do you avoid flagging a legitimate new setpoint as an attack?',
      'Can uncertainty replace a confident misdiagnosis with a request for operator review?',
    ],
    stats: [
      ['90%', 'attack episodes caught zero-shot, no false alarm in 7 h of normal data'],
      ['0.08', 'false-positive rate under setpoint shift, against 1.00 for learned detectors'],
      ['98% → 0%', 'accuracy of a CNN-LSTM from random split to an unseen attack type'],
      ['62 gal', 'mis-delivery hidden by a coherent spoof, exposed by loop-integrity parity'],
    ],
    works: [
      {
        title: 'Loop-integrity parity: zero-shot detection and reconstruction',
        pub: 'pesim2027-loop-integrity-parity',
        status: 'Under review · IEEE PES-IM 2027',
        body: 'Fourteen physics residuals in four layers (command intent, the controller’s integral action, actuator tracking, and virtual flowmeters from bypass mass balances) monitor a midstream pipeline control loop using normal data only.',
        results: [
          'A supervised forest scores 0.879 macro-F1 on a random split but 0.161 with sessions held out.',
          'LIP detects 90.0% of attack episodes with no false alarm; trained on February to May it catches every July attack, where the forest catches none.',
          'Reconstructs the falsified controller input as a constant 2.13 and 2.06 gpm bias.',
        ],
        tools: ['Python', 'MATLAB/Simulink twin', 'Physics residuals'],
      },
      {
        title: 'Counterfactual abduction for shift-robust detection',
        pub: 'pesim2027-counterfactual-abduction',
        status: 'Under review · IEEE PES-IM 2027',
        body: 'A tiered, time-unrolled structural causal model learned from normal data performs abduction, action and prediction at every step to simulate what a healthy plant would do under the commands actually issued.',
        results: [
          'When the flow setpoint moves to an unseen value, five learned detectors reach a false-positive rate of 1.00; CCD stays at 0.08 to 0.10.',
          'F1 of 0.64 to 0.75 against 0.15 to 0.25, with ablations showing abduction carries the robustness.',
        ],
        tools: ['Structural causal models', 'Python'],
      },
      {
        title: 'Session-aware, episode-disjoint evaluation with conformal sets',
        pub: 'pesim2027-pipeline-session-aware',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'A CNN-LSTM with SHAP attributions and inductive conformal prediction, evaluated under four increasingly realistic protocols on the Midstream Liquid Pipeline ICS testbed.',
        results: [
          'Accuracy falls from 98% (random) to 96% (episode-disjoint), 46% (cross-session) and 0% (unseen attack).',
          'The failure is directed: 89.2% of one attack type’s windows move to one neighbouring class.',
          'Conformal sets grow to full-set uncertainty on the unseen type, turning a confident misdiagnosis into an operator-review signal.',
        ],
        tools: ['PyTorch', 'SHAP', 'Conformal prediction'],
      },
      {
        title: 'Conformalized digital twin for false data injection',
        pub: 'ecmx2026-fdia-conformal',
        status: 'Under review · ECM: X',
        body: 'A digital twin of a cyber-physical power system flags false data injection with conformal guarantees on its false-alarm behaviour.',
        results: [],
        tools: ['Digital twin', 'Conformal prediction', 'State estimation'],
      },
      {
        title: 'Tamper versus degradation in grid-forming batteries',
        pub: 'pesim2027-vsg-inertia',
        status: 'Accepted · IEEE PES-IM 2027',
        body: 'The VSG twin from the grid-forming work doubles as a security monitor: it separates a stealthy rewrite of virtual inertia from genuine loss of damping authority by how fast the change happens.',
        results: ['All attacks and degradations detected and classified over 200 Monte Carlo runs with no false alarms.'],
        tools: ['MATLAB/Simulink', 'RLS identification'],
      },
    ],
  },
];

/* --------------------------------------------------------------- renderers */

const areaNav = (current) => `
<nav class="area-tabs" aria-label="Research areas">
  <div class="wrap">
    <ul>
      <li><a href="/research/"${current === 'overview' ? ' aria-current="page"' : ''}>${eee.nodes}<span>All projects</span></a></li>
      ${areas
        .map(
          (a) =>
            `<li><a href="/research/${a.slug}/"${current === a.slug ? ' aria-current="page"' : ''}>${eee[a.icon]}<span>${esc(a.short)}</span></a></li>`
        )
        .join('')}
      <li><a href="/research/data-and-code/"${current === 'data' ? ' aria-current="page"' : ''}>${eee.meter}<span>Data and code</span></a></li>
    </ul>
  </div>
</nav>`;

export { areaNav };

export function areaCards() {
  return `<div class="area-grid">
    ${areas
      .map(
        (a, i) => `<a class="area-card" href="/research/${a.slug}/" style="--i:${i}">
      <span class="area-card-icon" aria-hidden="true">${eee[a.icon]}</span>
      <span class="area-card-n">0${i + 1}</span>
      <h3>${esc(a.title)}</h3>
      <p>${esc(a.stats[0][0])} <span>${esc(a.stats[0][1])}</span></p>
      <span class="area-card-go">${a.works.length} studies <span aria-hidden="true">→</span></span>
    </a>`
      )
      .join('')}
  </div>`;
}

export function areaPages({ site, publications }) {
  const pubById = Object.fromEntries(publications.map((p) => [p.id, p]));
  return [
    ...areas.map((a, idx) => ({
      path: `/research/${a.slug}/`,
      title: a.title,
      description: tidy(a.lede).slice(0, 300),
      breadcrumbs: [
        { href: '/', label: 'Home' },
        { href: '/research/', label: 'Research' },
        { href: `/research/${a.slug}/`, label: a.short },
      ],
      body: `
${areaNav(a.slug)}
<section class="page-head area-head">
  <div class="wrap area-head-grid">
    <div>
      <p class="eyebrow">Research area 0${idx + 1}</p>
      <h1>${esc(a.title)}</h1>
      <p class="lede">${esc(tidy(a.lede))}</p>
    </div>
    <div class="area-hero" aria-hidden="true">${a.hero}</div>
  </div>
</section>

<section class="section" style="padding-top:2rem">
  <div class="wrap">
    <h2 class="visually-hidden">Headline results</h2>
    <div class="area-stats">
      ${a.stats
        .map((s) => `<div class="area-stat"><span class="area-stat-v">${esc(s[0])}</span><span class="area-stat-l">${esc(s[1])}</span></div>`)
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head">
      <h2>Questions this work asks</h2>
    </div>
    <ol class="area-questions">
      ${a.questions.map((q) => `<li>${esc(q)}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <h2>Studies</h2>
      <p>${a.works.length} manuscripts in this area. Numbers are taken from the manuscripts; status follows the publications list.</p>
    </div>
    <div class="study-list">
      ${a.works
        .map((w, i) => {
          const p = pubById[w.pub];
          return `<article class="card study" id="${attr(w.pub)}-study">
        <div class="study-top">
          <span class="study-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="chip ${/Accepted|Published/.test(w.status) ? 'chip--accent' : /preparation/.test(w.status) ? '' : 'chip--warn'}">${esc(w.status)}</span>
        </div>
        <h3>${esc(w.title)}</h3>
        ${p ? `<p class="study-paper">${esc(p.title)}</p>` : ''}
        <p>${esc(tidy(w.body))}</p>
        ${
          w.results.length
            ? `<ul class="study-results">${w.results.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>`
            : ''
        }
        <div class="study-foot">
          <ul class="study-tools">${w.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <p class="study-links">
            ${p ? `<a href="/publications/#${attr(p.id)}">Publication entry</a>` : ''}
            ${(w.links || []).map((l) => `<a href="${attr(l.href)}" rel="noopener">${esc(l.label)} ↗</a>`).join('')}
          </p>
        </div>
      </article>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap area-next">
    ${
      areas[idx + 1]
        ? `<a class="btn" href="/research/${areas[idx + 1].slug}/">Next area: ${esc(areas[idx + 1].short)} →</a>`
        : `<a class="btn" href="/research/data-and-code/">Open data and code →</a>`
    }
    <a class="btn btn--ghost" href="/publications/">All publications</a>
  </div>
</section>`,
    })),
    dataPage({ site }),
  ];
}

/* ------------------------------------------------------------- data & code */

const repos = [
  {
    name: 'sic-pv-thermal-history-dataset',
    icon: 'thermo',
    kind: 'Dataset',
    desc: 'Simulation data behind the SiC PV inverter thermal-history study: one-hour operating trajectories with realistic sensor noise and out-of-distribution test sets, FE runs for history, end-point, ROM-validation, time-step and tolerance checks, the six-pole Foster ROM, every plant parameter with its source, and SHA-256 checksums.',
    tags: ['MATLAB/Simulink', 'COMSOL 6.4', 'NumPy .npz', '100 kW SiC'],
    paper: 'scirep2026-sic-thermal-history',
  },
  {
    name: 'Photonic-sensor-power-dataset',
    icon: 'ring',
    kind: 'Dataset',
    desc: 'Raw, unedited solver exports for photonic bond-health sensing in SiC modules: converter electrothermal profiles, waveguide mode solutions versus width, temperature and strain, static and transient package models for healthy and degraded bonds, and micro-heater frequency responses. CC BY 4.0.',
    tags: ['CSV', 'COMSOL', 'Silicon photonics', '1200 V / 450 A'],
    paper: 'natcomms2026-photonic-bond-health',
  },
  {
    name: 'ATLAS',
    icon: 'robot',
    kind: 'Project',
    desc: 'A modular multi-robot research assistant: a carrier that docks, transports, charges and redeploys two agent robots. One parameter file drives MATLAB sizing, Simulink and Stateflow control, a parametric FreeCAD model with interface checks, contact-heating PDE models and a Python fleet simulator with 33 tests.',
    tags: ['Python', 'MATLAB/Simulink', 'FreeCAD', 'KiCad', 'ESP32'],
  },
  {
    name: 'md-sazzad-eee.github.io',
    icon: 'waveform',
    kind: 'Website',
    desc: 'This site: a dependency-free static generator in Node, hand-written CSS and SVG, a canvas oscilloscope, and GitHub Actions deployment.',
    tags: ['JavaScript', 'SVG', 'GitHub Actions'],
  },
];

const toolbox = [
  ['inverter', 'Power systems and converters', ['MATLAB & Simulink', 'Stateflow', 'PSCAD', 'PSS/E', 'DIgSILENT PowerFactory', 'HOMER Energy']],
  ['thermo', 'Multiphysics and FEM', ['COMSOL Multiphysics', 'Custom FE / FV codes', 'CST Microwave Studio', 'OptiSystem']],
  ['network', 'Learning and estimation', ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Kalman filters (EKF, UKF)', 'Conformal prediction', 'PINNs']],
  ['optimize', 'Optimization and identification', ['Fisher information', 'Convex probe design', 'RLS / least squares', 'QUBO / QAOA', 'ADMM']],
  ['chip', 'Hardware and CAD', ['KiCad', 'EasyEDA', 'Cadence Virtuoso', 'FreeCAD', 'SOLIDWORKS', 'Fusion 360', 'ESP32', 'Raspberry Pi 5']],
  ['layers', 'Writing and reproducibility', ['LaTeX / Overleaf', 'Git and GitHub', 'Checksummed datasets', 'Validation protocols']],
];

function dataPage({ site }) {
  const gh = site.profiles.github;
  return {
    path: '/research/data-and-code/',
    title: 'Data and code',
    description: 'Open datasets, code and the research toolbox of Md. Sazzad Hossain: SiC inverter thermal-history data, photonic bond-health simulation data, and the ATLAS multi-robot project.',
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/research/', label: 'Research' },
      { href: '/research/data-and-code/', label: 'Data and code' },
    ],
    body: `
${areaNav('data')}
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Open science</p>
    <h1>Data and code</h1>
    <p class="lede">Simulation data is released alongside the manuscripts it supports, with parameters, sources and checksums, so the numbers on this site can be checked rather than taken on trust.</p>
    <p class="btn-row" style="margin-top:1.25rem"><a class="btn btn--ghost" href="${attr(gh)}" rel="noopener">GitHub profile ↗</a></p>
  </div>
</section>

<section class="section" style="padding-top:2rem">
  <div class="wrap">
    <div class="section-head"><h2>Repositories</h2></div>
    <div class="repo-grid">
      ${repos
        .map(
          (r) => `<a class="card card--icon repo" href="${attr(gh)}/${attr(r.name)}" rel="noopener">
        <span class="card-icon" aria-hidden="true">${eee[r.icon]}</span>
        <span class="chip chip--mono">${esc(r.kind)}</span>
        <h3 class="repo-name">${esc(r.name)}</h3>
        <p>${esc(r.desc)}</p>
        <ul class="study-tools">${r.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <span class="repo-go">View on GitHub ↗</span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head">
      <h2>Toolbox</h2>
      <p>What the studies on this site were actually built with.</p>
    </div>
    <div class="grid grid--3">
      ${toolbox
        .map(
          ([ic, t, items]) => `<article class="card card--icon">
        <span class="card-icon" aria-hidden="true">${eee[ic]}</span>
        <h3>${esc(t)}</h3>
        <ul class="study-tools" style="margin-top:.6rem">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>`,
  };
}
