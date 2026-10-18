/**
 * Domain specific SVG for electrical and electronic engineering.
 * All hand drawn on a 24x24 grid, stroke based so they inherit currentColor and
 * work in both themes. Decorative, so every one is aria-hidden.
 */

/* pathLength="1" on every shape lets CSS draw any icon in with a single
   dash animation, whatever its real length. */
const s = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(d + extra).replace(/<(path|circle|rect|line|polyline|ellipse)(?![^>]*pathLength)/g, '<$1 pathLength="1"')}</svg>`;

export const eee = {
  /* Grid following inverter: DC in on the left, AC sine out on the right */
  inverter: s(`
    <rect x="3.5" y="5" width="17" height="14" rx="2"/>
    <path d="M12 5v14"/>
    <path d="M6 10.5h3.5M6 13.5h3.5"/>
    <path d="M14.5 12c.6-2 1.2-2 1.8 0s1.2 2 1.8 0"/>
  `),

  /* Photovoltaic panel with incident light */
  solar: s(`
    <path d="M4 15.5 6.4 8.5h11.2L20 15.5z"/>
    <path d="M7.2 15.5 8.6 8.5M12 8.5v7M16.8 15.5 15.4 8.5"/>
    <path d="M5.4 12h13.2"/>
    <path d="M12 3v2M6.5 4.5l1 1.4M17.5 4.5l-1 1.4"/>
    <path d="M12 15.5V21"/>
  `),

  /* Transmission pylon: the grid connection point */
  grid: s(`
    <path d="M12 3v18"/>
    <path d="M6 21 9 8h6l3 13"/>
    <path d="M7.6 14h8.8M8.6 11h6.8"/>
    <path d="M9 8 5 5.5M15 8l4-2.5"/>
  `),

  /* Waveform: what the scope actually shows */
  waveform: s(`
    <path d="M2 12h2.5c.9 0 1.2-5 2.4-5s1.5 10 2.6 10 1.4-8 2.5-8 1.5 6 2.5 6 1.3-3 2.2-3H22"/>
  `),

  /* Digital twin: a physical asset and its synchronised model */
  twin: s(`
    <rect x="2.5" y="6" width="8.5" height="12" rx="1.6"/>
    <rect x="13" y="6" width="8.5" height="12" rx="1.6" stroke-dasharray="2.6 2"/>
    <path d="M11.4 9.6h1.2M11.4 14.4h1.2"/>
    <path d="M6.7 10.5v3M5.2 12h3"/>
    <path d="M15.8 12h3"/>
  `),

  /* Neural network: three layers, the learned half of a grey box model */
  network: s(`
    <circle cx="5" cy="7" r="1.7"/><circle cx="5" cy="17" r="1.7"/>
    <circle cx="12" cy="12" r="1.7"/>
    <circle cx="19" cy="7" r="1.7"/><circle cx="19" cy="17" r="1.7"/>
    <path d="M6.4 8.1 10.6 11M6.4 15.9 10.6 13M13.4 11l4.2-2.9M13.4 13l4.2 2.9"/>
  `),

  /* Oscilloscope: measurement and uncertainty */
  scope: s(`
    <rect x="2.5" y="4" width="19" height="14" rx="2"/>
    <path d="M5.5 12.5c1.6 0 1.6-4 3.2-4s1.6 7 3.2 7 1.6-5 3.2-5 1.4 2 2.4 2"/>
    <path d="M9 21h6M12 18v3"/>
  `),

  /* Transformer: two coupled windings */
  transformer: s(`
    <path d="M8 6v12M16 6v12"/>
    <path d="M11 7.5h2M11 12h2M11 16.5h2"/>
    <path d="M8 8.5c-1.5 0-1.5 2 0 2M8 13c-1.5 0-1.5 2 0 2"/>
    <path d="M16 8.5c1.5 0 1.5 2 0 2M16 13c1.5 0 1.5 2 0 2"/>
    <path d="M4 9h4M4 15h4M16 9h4M16 15h4"/>
  `),

  /* Integrated circuit: embedded and edge computing */
  chip: s(`
    <rect x="7" y="7" width="10" height="10" rx="1.5"/>
    <rect x="10" y="10" width="4" height="4" rx="0.6"/>
    <path d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3"/>
  `),

  /* Distributed nodes around a hub: DER and microgrids */
  nodes: s(`
    <circle cx="12" cy="12" r="2.4"/>
    <circle cx="5" cy="6" r="1.5"/><circle cx="19" cy="6" r="1.5"/>
    <circle cx="5" cy="18" r="1.5"/><circle cx="19" cy="18" r="1.5"/>
    <path d="M6.2 7.1 10 10.3M17.8 7.1 14 10.3M6.2 16.9 10 13.7M17.8 16.9 14 13.7"/>
  `),

  /* Shield with a pulse: reliability and condition monitoring */
  reliability: s(`
    <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.9 7 9.8 4.1-1.9 7-5.5 7-9.8V5.8z"/>
    <path d="M8 12.2h2.2l1.2-2.6 1.4 5 1.2-2.4H16"/>
  `),

  /* Descending curve to a minimum: optimisation */
  optimize: s(`
    <path d="M3 4v16h18"/>
    <path d="M6 7c3.5 0 4.5 8 7.5 8S18 10 21 9.4"/>
    <circle cx="13.5" cy="15" r="1.6" fill="currentColor" stroke="none"/>
  `),

  /* Modern substation and meter: grid modernisation */
  meter: s(`
    <rect x="3.5" y="4.5" width="17" height="15" rx="2"/>
    <path d="M7 15a5 5 0 0 1 10 0"/>
    <path d="m12 15 3-3.2"/>
    <path d="M7.5 19.5v1M16.5 19.5v1"/>
  `),

  /* Plug and cable: EV, V2G, V2V */
  plug: s(`
    <path d="M9 3v5M15 3v5"/>
    <path d="M6.5 8h11v2.5a5.5 5.5 0 0 1-11 0z"/>
    <path d="M12 16v2.5a2.5 2.5 0 0 0 2.5 2.5H17"/>
  `),

  /* Signal tower: sensing and telemetry */
  sensor: s(`
    <circle cx="12" cy="12" r="2"/>
    <path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8"/>
    <path d="M6 6a8.5 8.5 0 0 0 0 12M18 6a8.5 8.5 0 0 1 0 12"/>
  `),

  /* Layered stack: tandem solar cell architecture */
  layers: s(`
    <path d="m12 3 8.5 4.2L12 11.4 3.5 7.2z"/>
    <path d="m3.5 12 8.5 4.2 8.5-4.2"/>
    <path d="m3.5 16.8 8.5 4.2 8.5-4.2"/>
  `),
  /* Battery energy storage with charge level */
  battery: s(`
    <rect x="3" y="7" width="16" height="10" rx="2"/>
    <path d="M19 10.5h1.5v3H19"/>
    <path d="M6.5 10v4M9.5 10v4M12.5 10v4"/>
  `),

  /* Shield with check: cyber-physical attack detection */
  shield: s(`
    <path d="M12 3l7 3v5.2c0 4.4-3 8-7 9.8-4-1.8-7-5.4-7-9.8V6z"/>
    <path d="M9 12l2.2 2.2L15.5 10"/>
  `),

  /* SiC die with a thermometer: junction temperature and reliability */
  thermo: s(`
    <rect x="3" y="8" width="10" height="10" rx="1.5"/>
    <path d="M5.5 8V5.5M10.5 8V5.5M5.5 18v2.5M10.5 18v2.5"/>
    <path d="M18 4a1.8 1.8 0 0 1 1.8 1.8v8.4a3.4 3.4 0 1 1-3.6 0V5.8A1.8 1.8 0 0 1 18 4z"/>
    <path d="M18 9v7"/>
  `),

  /* Photonic ring resonator coupled to a bus waveguide */
  ring: s(`
    <circle cx="12" cy="10" r="5.5"/>
    <circle cx="12" cy="10" r="3"/>
    <path d="M3 18.5h18"/>
    <path d="M5 21l2-2.5M17 21l2-2.5"/>
  `),

  /* Small rover robot */
  robot: s(`
    <rect x="5" y="8" width="14" height="9" rx="2.5"/>
    <path d="M12 8V5M12 5h.01"/>
    <circle cx="9.3" cy="12.4" r="1.1"/>
    <circle cx="14.7" cy="12.4" r="1.1"/>
    <circle cx="8" cy="19.5" r="1.5"/>
    <circle cx="16" cy="19.5" r="1.5"/>
  `),

  /* Conformal prediction band around a trace */
  band: s(`
    <path d="M3 8.5c4-3.5 6.5 1.5 9.5-.8S17.5 5 21 7"/>
    <path d="M3 15.5c4-2.5 6.5 2.5 9.5.4S17.5 13 21 15"/>
    <path d="M3 12c4-3 6.5 2 9.5-.2S17.5 9 21 11"/>
  `),

  /* Step and pulse excitation used for calibration */
  excite: s(`
    <path d="M3 17h3.5V9H10v8h2.5v-5H16v5h2v-3h3"/>
    <path d="M3 21h18"/>
  `),
};

/* Which icon represents which research interest and project.
   Keyed by title and id so that reordering the content never breaks the pairing. */
export const interestIcon = {
  'Inverter control and stability': 'inverter',
  'Digital twins': 'twin',
  'Trustworthy machine learning': 'band',
  'Power-electronics reliability': 'thermo',
  'Renewable energy integration': 'solar',
  'Distributed energy resources and microgrids': 'nodes',
  'Grid modernization': 'meter',
  'Photovoltaic device modeling': 'layers',
  'Edge AI and embedded systems': 'robot',
};

export const projectIcon = {
  'digital-twin-pv': 'twin',
  'grey-box-inverter': 'excite',
  'sic-thermal-history': 'thermo',
  'photonic-bond-health': 'ring',
  'grid-forming-twins': 'inverter',
  'cyber-physical-detection': 'shield',
  'battery-digital-twin': 'battery',
  'gan-hemt-thermal-pinn': 'chip',
  'digital-twin-staleness': 'band',
  'atlas-robotics': 'robot',
  'perovskite-tandem': 'layers',
  'edge-vision': 'chip',
};

/* Publication research areas. */
export const areaIcon = {
  'Digital twins': 'twin',
  'Inverter control': 'inverter',
  'Power electronics reliability': 'thermo',
  'Cyber-physical security': 'shield',
  'Energy storage': 'battery',
  'Photovoltaics': 'solar',
  'Power systems': 'grid',
};

/** Fall back to a neutral domain icon rather than rendering nothing. */
export const iconFor = (map, key) => eee[map[key]] || eee.waveform;

/**
 * Hero graphic: a PV array feeding a grid following inverter, which feeds the
 * grid, with the AC waveform drawn underneath. The dashes animate along the
 * conductors to show power flow. Purely decorative, so it is hidden from
 * assistive technology and the surrounding text carries the meaning.
 */
export const heroDiagram = `
<svg class="hero-diagram" viewBox="0 0 420 210" role="img"
     aria-label="Diagram of a photovoltaic array feeding a grid following inverter, which feeds the transmission grid, with the resulting alternating current waveform shown below."
     preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--accent)"/>
      <stop offset="100%" stop-color="var(--accent-2)"/>
    </linearGradient>
  </defs>

  <g stroke="var(--border-strong)" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <!-- PV array -->
    <path d="M16 74 30 46h54L70 74z"/>
    <path d="M30.5 74 44 46M47 46 33.5 74M61 46 47.5 74" stroke-width="1"/>
    <path d="M23 60h54" stroke-width="1"/>
    <path d="M50 74v10"/>

    <!-- Inverter enclosure -->
    <rect x="168" y="44" width="84" height="52" rx="4"/>
    <path d="M210 44v52"/>
    <path d="M182 62h14M182 72h14" stroke-width="1.2"/>
    <path d="M222 70c3-9 6-9 9 0s6 9 9 0" stroke-width="1.2"/>

    <!-- Pylon -->
    <path d="M370 100V38"/>
    <path d="M352 100l6-42h24l6 42"/>
    <path d="M357 74h26M359 62h22" stroke-width="1"/>
    <path d="M358 58 344 48M382 58l14-10"/>
  </g>

  <!-- Conductors, with current animated along them -->
  <g fill="none" stroke="url(#trace)" stroke-width="2.2" stroke-linecap="round">
    <path class="flow" d="M100 70h68"/>
    <path class="flow flow--delayed" d="M252 70h100"/>
  </g>

  <!-- Labels -->
  <g fill="var(--text-faint)" font-family="ui-monospace, monospace" font-size="9" letter-spacing="1">
    <text x="50" y="106" text-anchor="middle">PV ARRAY</text>
    <text x="210" y="112" text-anchor="middle">GRID FOLLOWING INVERTER</text>
    <text x="370" y="116" text-anchor="middle">GRID</text>
  </g>

  <!-- Divider between the schematic and the waveform it produces -->
  <line x1="16" y1="140" x2="404" y2="140" stroke="var(--border)" stroke-width="1" stroke-dasharray="2 4"/>

  <!-- Output waveform, given its own clear band below everything else -->
  <path class="hero-wave" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round"
        d="M20 178c12 0 12-20 24-20s12 20 24 20 12-20 24-20 12 20 24 20 12-20 24-20 12 20 24 20
           12-20 24-20 12 20 24 20 12-20 24-20 12 20 24 20 12-20 24-20 12 20 24 20 12-20 24-20 12 20 24 20"/>
</svg>`;

/** Extra CSS the hero diagram needs. Appended to the deferred stylesheet. */
export const heroDiagramCss = `
.hero-visual { position: relative; margin-top: 2.5rem; }
.hero-diagram { width: 100%; height: auto; overflow: visible; }
.hero-diagram .flow {
  stroke-dasharray: 8 10;
  animation: flow 1.8s linear infinite;
}
.hero-diagram .flow--delayed { animation-delay: -0.9s; }
@keyframes flow { to { stroke-dashoffset: -36; } }

.hero-diagram .hero-wave {
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
  animation: draw 3.2s ease-out forwards;
  opacity: 0.85;
}
@keyframes draw { to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .hero-diagram .flow { animation: none; stroke-dasharray: none; }
  .hero-diagram .hero-wave { animation: none; stroke-dashoffset: 0; }
}
`;
