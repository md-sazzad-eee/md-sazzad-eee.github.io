/**
 * Hero "system view": an HMI-style panel showing the plant the research is
 * about. A PV array and a battery share a DC link, a SiC grid-forming
 * inverter feeds an LCL filter and the point of common coupling, and a
 * self-calibrating digital twin sits above the plant, fed by measurement
 * packets and guarded by an attack detector.
 *
 * Motion is SMIL + CSS, so it runs without JS. motion.js pauses it when the
 * panel is off screen or the visitor prefers reduced motion, and writes the
 * live readouts (data-readout attributes) and the oscilloscope canvas.
 *
 * Decorative: aria-hidden, the surrounding text carries the meaning.
 */

const label = (x, y, text, anchor = 'middle', cls = 'sv-label') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${text}</text>`;

/* A measurement packet that travels up a dashed data link to the twin. */
const packet = (path, dur, begin = '0s', cls = 'sv-packet') =>
  `<circle r="3.2" class="${cls}"><animateMotion dur="${dur}" begin="${begin}" repeatCount="indefinite" path="${path}"/></circle>`;

export const heroScene = `
<div class="sysview" id="sysview" aria-hidden="true">
  <div class="sysview-bar">
    <span class="sv-led"></span>
    <span class="sv-title">SYS-VIEW <span class="sv-sep">//</span> PV-BESS GRID-FORMING PLANT</span>
    <span class="sv-meta"><span class="sv-chip">TWIN SYNC</span><span class="sv-clock" data-readout="clock">t+00:00:00.0</span></span>
  </div>

  <div class="sysview-body">
    <svg class="sv-scene" viewBox="0 0 760 330" preserveAspectRatio="xMidYMid meet" focusable="false">
      <defs>
        <linearGradient id="sv-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--accent)"/>
          <stop offset="1" stop-color="var(--accent-2)"/>
        </linearGradient>
        <linearGradient id="sv-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--accent)" stop-opacity=".28"/>
          <stop offset="1" stop-color="var(--accent)" stop-opacity=".06"/>
        </linearGradient>
        <radialGradient id="sv-sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="var(--accent-2)" stop-opacity=".9"/>
          <stop offset="1" stop-color="var(--accent-2)" stop-opacity="0"/>
        </radialGradient>
        <pattern id="sv-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".8" class="sv-dot"/>
        </pattern>
      </defs>

      <rect x="0" y="0" width="760" height="330" fill="url(#sv-dots)" opacity=".55"/>

      <!-- ================= Digital twin layer ================= -->
      <g class="sv-twin">
        <rect x="150" y="14" width="420" height="78" rx="10" class="sv-twin-box"/>
        ${label(166, 32, 'DIGITAL TWIN', 'start', 'sv-label sv-label--accent')}
        ${label(166, 46, 'physics + ML · self-calibrating', 'start', 'sv-label sv-label--faint')}

        <!-- parameter estimates converging: three bars with targets -->
        <g transform="translate(166 56)">
          <rect x="0" y="0" width="88" height="5" rx="2.5" class="sv-track"/>
          <rect x="0" y="0" width="88" height="5" rx="2.5" class="sv-fill sv-fill--a"/>
          <rect x="0" y="11" width="88" height="5" rx="2.5" class="sv-track"/>
          <rect x="0" y="11" width="88" height="5" rx="2.5" class="sv-fill sv-fill--b"/>
          <rect x="0" y="22" width="88" height="5" rx="2.5" class="sv-track"/>
          <rect x="0" y="22" width="88" height="5" rx="2.5" class="sv-fill sv-fill--c"/>
        </g>
        ${label(262, 61, 'L̂f', 'start', 'sv-tiny')}
        ${label(262, 72, 'Ĉdc', 'start', 'sv-tiny')}
        ${label(262, 83, 'Rth', 'start', 'sv-tiny')}

        <!-- conformal prediction band with a live trace inside it -->
        <g transform="translate(338 30) scale(.9)">
          <path d="M0 26 C 30 6, 50 40, 80 22 S 130 8, 160 24 S 200 34, 236 18 L 236 44 C 200 58, 170 40, 160 48 S 110 34, 80 46 S 30 30, 0 50 Z" fill="url(#sv-band)"/>
          <path class="sv-trace" d="M0 38 C 30 18, 50 52, 80 34 S 130 20, 160 36 S 200 46, 236 31"/>
          <circle r="3" class="sv-trace-head"><animateMotion dur="5s" repeatCount="indefinite" path="M0 38 C 30 18, 50 52, 80 34 S 130 20, 160 36 S 200 46, 236 31"/></circle>
        </g>
        ${label(536, 32, '95% PI', 'end', 'sv-label sv-label--faint')}
        <text x="536" y="84" text-anchor="end" class="sv-readout" data-readout="cover">cov 95.4%</text>
      </g>

      <!-- data links: plant to twin -->
      <g class="sv-links">
        <path id="sv-l1" d="M225 132 V 92"/>
        <path id="sv-l2" d="M312 132 V 92"/>
        <path id="sv-l3" d="M520 138 V 92"/>
      </g>
      ${packet('M225 132 V 92', '1.6s', '0s')}
      ${packet('M312 132 V 92', '1.6s', '-.5s')}
      ${packet('M520 138 V 92', '1.6s', '-1s')}
      ${packet('M436 92 V 132', '2.4s', '-.3s', 'sv-packet sv-packet--down')}
      <path d="M436 92 V 132" class="sv-links-down"/>
      ${label(442, 118, 'Δθ', 'start', 'sv-tiny sv-tiny--accent')}

      <!-- ================= Plant: single-line diagram ================= -->

      <!-- Sun and PV array -->
      <g transform="translate(52 128)">
        <circle r="26" fill="url(#sv-sun)" class="sv-sun-glow"/>
        <circle r="9" class="sv-sun"/>
        <g class="sv-rays">
          <path d="M0 -17v-6M0 17v6M-17 0h-6M17 0h6M-12 -12l-4 -4M12 12l4 4M-12 12l-4 4M12 -12l4 -4"/>
        </g>
      </g>
      <g class="sv-stroke">
        <path d="M30 210 46 172h76l-16 38z"/>
        <path d="M58 172 49 210M77 172 71 210M96 172 90 210M38 191h76" class="sv-thin"/>
        <path d="M76 210v14"/>
      </g>
      <path d="M86 140 L 98 166" class="sv-photon"/>
      <path d="M70 146 L 80 166" class="sv-photon sv-photon--b"/>
      ${label(76, 244, 'PV ARRAY')}

      <!-- PV to DC/DC -->
      <path d="M114 191 H 150" class="sv-wire"/>
      <path d="M122 191 H 150" class="sv-flow"/>
      <g class="sv-stroke">
        <rect x="150" y="170" width="46" height="42" rx="5"/>
        <path d="M157 205 189 177" class="sv-thin"/>
      </g>
      ${label(173, 228, 'MPPT')}

      <!-- DC link with capacitor -->
      <path d="M196 191 H 225" class="sv-wire"/>
      <path d="M196 191 H 225" class="sv-flow"/>
      <g class="sv-stroke">
        <path d="M225 132 V 262"/>
        <path d="M214 195h22M214 203h22"/>
      </g>
      <circle cx="225" cy="132" r="3.5" class="sv-node"/>
      ${label(232, 150, 'DC LINK', 'start', 'sv-label sv-label--faint')}
      <text x="232" y="162" class="sv-readout" data-readout="vdc" text-anchor="start">800 V</text>

      <!-- Battery storage -->
      <g class="sv-stroke">
        <rect x="200" y="262" width="50" height="34" rx="4"/>
        <path d="M250 273h4v12h-4"/>
      </g>
      <rect x="205" y="267" width="40" height="24" rx="2" class="sv-track"/>
      <rect x="205" y="267" width="40" height="24" rx="2" class="sv-soc"/>
      ${label(225, 314, 'BESS')}
      <text x="258" y="296" class="sv-readout" data-readout="soc" text-anchor="start">SOC 72%</text>

      <!-- DC link to inverter -->
      <path d="M225 170 H 274" class="sv-wire"/>
      <path d="M225 170 H 274" class="sv-flow sv-flow--b"/>

      <!-- SiC grid-forming inverter -->
      <g class="sv-stroke">
        <rect x="274" y="140" width="78" height="62" rx="6" class="sv-inv"/>
        <path d="M274 202 352 140" class="sv-thin"/>
        <path d="M284 156h16M284 162h16" class="sv-thin"/>
        <path d="M322 188c3-7 6-7 9 0s6 7 9 0" class="sv-thin"/>
      </g>
      <!-- PWM gate pulses -->
      <path class="sv-pwm" d="M282 182h4v-6h3v6h2v-6h5v6h2v-6h3v6h4"/>
      ${label(313, 218, 'GFM INVERTER')}
      ${label(313, 230, 'SiC · VSG control', 'middle', 'sv-label sv-label--faint')}

      <!-- junction temperature tag -->
      <g transform="translate(296 116)">
        <rect x="-4" y="-11" width="70" height="17" rx="8.5" class="sv-tag"/>
        <path d="M5 -7v6.5a2.6 2.6 0 1 0 2.4 0V-7a1.2 1.2 0 0 0-2.4 0z" class="sv-therm"/>
        <text x="14" y="1" class="sv-readout" data-readout="tj">Tj 74.2°C</text>
      </g>

      <!-- inverter to LCL -->
      <path d="M352 171 H 380" class="sv-wire"/>
      <path d="M352 171 H 380" class="sv-flow"/>

      <!-- LCL filter -->
      <g class="sv-stroke">
        <path d="M380 171c0-8 10-8 10 0c0-8 10-8 10 0c0-8 10-8 10 0" />
        <path d="M410 171 H 430"/>
        <path d="M420 171 V 188M412 188h16M412 194h16M420 194v10M415 204h10M417 207h6"/>
        <path d="M430 171c0-8 8-8 8 0c0-8 8-8 8 0"/>
      </g>
      ${label(414, 226, 'LCL')}

      <!-- to PCC -->
      <path d="M446 171 H 506" class="sv-wire"/>
      <path d="M446 171 H 506" class="sv-flow sv-flow--b"/>

      <!-- PCC breaker and measurement point -->
      <g class="sv-stroke">
        <rect x="506" y="161" width="20" height="20" rx="2"/>
        <circle cx="520" cy="150" r="8" class="sv-thin"/>
      </g>
      <circle cx="520" cy="150" r="2.6" class="sv-node"/>
      ${label(516, 202, 'PCC')}
      ${label(530, 138, 'PMU', 'start', 'sv-label sv-label--faint')}

      <!-- attack detector on the comm link -->
      <g transform="translate(474 110)"><g class="sv-shield">
        <path d="M0 -12l9 3.6v6c0 5.4-3.6 9.6-9 12-5.4-2.4-9-6.6-9-12v-6z"/>
        <path d="M-3.6 -.6l2.6 2.6 4.8-4.8" class="sv-check"/>
      </g></g>
      <text x="474" y="137" class="sv-readout sv-readout--ok" data-readout="fdia" text-anchor="middle">FDIA OK</text>

      <!-- to grid -->
      <path d="M526 171 H 610" class="sv-wire"/>
      <path d="M526 171 H 610" class="sv-flow"/>

      <!-- EV charging disturbance, tapped off the feeder -->
      <g class="sv-stroke">
        <path d="M566 171 V 252"/>
        <rect x="552" y="252" width="28" height="36" rx="4"/>
        <path d="M563 262l-4 9h7l-4 9" class="sv-bolt"/>
      </g>
      <text x="566" y="304" text-anchor="middle" class="sv-label">EV LOAD</text>

      <!-- grid pylon -->
      <g class="sv-stroke">
        <path d="M660 236V120"/>
        <path d="M636 236l10-96h28l10 96"/>
        <path d="M643 196h34M646 166h28" class="sv-thin"/>
        <path d="M644 148 620 132M676 148l24-16M650 128 634 116M670 128l16-12" class="sv-thin"/>
      </g>
      <path d="M610 171 H 640" class="sv-wire"/>
      ${label(660, 256, 'GRID')}
      <text x="660" y="270" text-anchor="middle" class="sv-readout" data-readout="scr">SCR 2.1 · weak</text>

      <!-- grid-side sine that stays in phase -->
      <path class="sv-sine" d="M700 171c6-14 12-14 18 0s12 14 18 0s12-14 18 0"/>
    </svg>

    <div class="scope" >
      <div class="scope-head">
        <span><i class="ph ph--a"></i>Va</span><span><i class="ph ph--b"></i>Vb</span><span><i class="ph ph--c"></i>Vc</span>
        <span class="scope-mode" data-readout="event">NORMAL</span>
      </div>
      <canvas class="scope-canvas" id="scope-canvas" width="360" height="220"></canvas>
      <dl class="scope-read">
        <div><dt>f</dt><dd data-readout="freq">50.00 Hz</dd></div>
        <div><dt>V<sub>rms</sub></dt><dd data-readout="vrms">230.1 V</dd></div>
        <div><dt>P</dt><dd data-readout="p">84.6 kW</dd></div>
        <div><dt>H<sub>vsg</sub></dt><dd data-readout="h">3.92 s</dd></div>
      </dl>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------------------
   Research loop: how the pieces of the work fit together, as six steps with a
   live connector and a feedback path. Rendered as an ordered list so it reads
   correctly without CSS and reflows to a vertical stack on small screens. */
export const researchLoop = (eee) => {
  const steps = [
    ['meter', 'Measure the plant', 'PV, batteries and SiC inverters, observed through the signals they already report.'],
    ['inverter', 'Model the physics', 'Converter, electrothermal and battery models in Simulink and COMSOL.'],
    ['network', 'Learn the residual', 'Physics-informed networks and grey-box terms absorb what the model misses.'],
    ['excite', 'Calibrate online', 'Kalman and Bayesian updates, safe excitation and identifiability checks.'],
    ['band', 'Bound the uncertainty', 'Conformal intervals that carry a coverage guarantee, not a bare guess.'],
    ['shield', 'Act and defend', 'Derating, stability-aware control and detection of cyber-physical attacks.'],
  ];
  return `<ol class="loop">
    ${steps
      .map(
        ([ic, t, d], i) => `<li class="loop-step" style="--i:${i}">
      <span class="loop-node" aria-hidden="true">${eee[ic] || ''}</span>
      <span class="loop-num">0${i + 1}</span>
      <h3>${t}</h3>
      <p>${d}</p>
    </li>`
      )
      .join('')}
  </ol>
  <div class="loop-feedback" aria-hidden="true">
    <svg viewBox="0 0 1000 40" preserveAspectRatio="none" focusable="false">
      <path class="loop-return" d="M985 4 V 22 Q 985 34 973 34 H 27 Q 15 34 15 22 V 4"/>
      <circle r="4" class="loop-dot"><animateMotion dur="5.5s" repeatCount="indefinite" path="M985 4 V 22 Q 985 34 973 34 H 27 Q 15 34 15 22 V 4"/></circle>
    </svg>
    <span>Drift detected, so the twin recalibrates and the loop runs again</span>
  </div>`;
};
