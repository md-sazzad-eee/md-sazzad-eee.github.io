/**
 * Single source of truth for the whole site.
 * Edit this file, run `node build.mjs`, and every page updates.
 *
 * House style: no em dashes and no en dashes anywhere in visible copy.
 * Use commas, colons, full stops, or the word "to" for ranges.
 */

export const site = {
  // Used for canonical URLs, sitemap, and Open Graph tags.
  // Must match the GitHub Pages address exactly, with no trailing slash.
  url: 'https://md-sazzad-eee.github.io',

  name: 'Md. Sazzad Hossain',
  shortName: 'Sazzad Hossain',
  title: 'Electrical and Electronic Engineering Graduate',
  tagline:
    'Artificial intelligence and machine learning for power systems: digital twins, inverter modeling, and grid resilience.',
  location: 'Natore, Bangladesh',
  email: 'md.sazzad.eee@gmail.com',
  lang: 'en',
  locale: 'en_US',

  description:
    'Md. Sazzad Hossain is an Electrical and Electronic Engineering graduate researching artificial intelligence and machine learning for power systems, physics informed digital twins for grid following inverters, renewable energy integration, and photovoltaic devices.',

  keywords: [
    'Md Sazzad Hossain',
    'artificial intelligence for power systems',
    'machine learning for energy systems',
    'digital twin',
    'grid following inverter',
    'renewable energy integration',
    'grid modernization',
    'distributed energy resources',
    'power system reliability',
    'power system stability and resilience',
    'cyber physical energy infrastructure',
    'photovoltaic',
    'perovskite solar cells',
    'conformal prediction',
    'AIUB',
  ],

  // ---- FILL IN when you have them ----
  profiles: {
    googleScholar: '', // e.g. https://scholar.google.com/citations?user=XXXX
    orcid: '', // e.g. https://orcid.org/0000-0000-0000-0000
    researchGate: '', // e.g. https://www.researchgate.net/profile/XXXX
    linkedin: 'https://www.linkedin.com/in/md-sazzad-eee',
    github: 'https://github.com/md-sazzad-eee',
  },

  // Web3Forms access key. Get a free one at https://web3forms.com
  // Leave empty and the contact form gracefully falls back to a mailto: link.
  web3formsKey: '',

  cv: {
    primary: {
      file: '/cv/Md-Sazzad-Hossain-CV.pdf',
      download: 'Md-Sazzad-Hossain-CV.pdf',
      label: 'Academic CV',
      note: 'Full academic CV covering education, publications, projects, and skills.',
      updated: 'September 2026',
    },
    alternates: [],
  },
};

export const about = {
  bio: [
    `I am an Electrical and Electronic Engineering graduate from American International University-Bangladesh,
     drawn to the intersection of machine learning and power systems. My research on digital twins and inverter
     modeling sparked a deeper interest in building intelligent solutions for grid resilience and renewable energy.
     I am seeking a PhD to grow as a researcher and contribute meaningfully to modern energy infrastructure.`,
    `That interest grew out of two projects on grid following inverters. The first asked whether a self calibrating
     twin could carry honest uncertainty estimates alongside its predictions, using conformal prediction to produce
     intervals with finite sample coverage guarantees. The second asked a more practical question: how little
     excitation do you actually need, given that voltage and frequency step experiments are what an operator can
     realistically apply to a live asset, to identify inverter parameters in real time.`,
    `Alongside this I have worked on device level photovoltaics, optimizing transport layers in perovskite tandem
     cells, and on embedded computer vision at the edge. Taken together these sit on the boundary between physical
     energy hardware and the computation that supervises it, which is the boundary I want to keep working on.`,
  ],

  /* Ordered to match the research areas advertised for the positions I am applying to.
     Each one is grounded in work I have actually done, except where noted as an
     area I want to move into. */
  interests: [
    {
      title: 'Artificial intelligence for power systems',
      body: `Applying learned models to problems where the physics is known but incompletely parameterized, so that
             the model corrects the gap rather than replacing the physics.`,
    },
    {
      title: 'Machine learning for energy systems',
      body: `Grey box formulations that combine a physical model with a data driven residual term, and uncertainty
             quantification through conformal prediction so that a deployed model reports calibrated intervals
             instead of bare point estimates.`,
    },
    {
      title: 'Cyber physical energy infrastructure',
      body: `Digital twins of power electronic converters that stay faithful to device physics while continuously
             recalibrating themselves against live measurements, tracking parameter drift from aging, temperature,
             and changing operating points.`,
    },
    {
      title: 'Power system stability and resilience',
      body: `Behavior of inverter dominated networks, where synchronous inertia is scarce and converter dynamics
             set system response. Real time parameter estimation is the route I have taken into this.`,
    },
    {
      title: 'Renewable energy integration',
      body: `Multi inverter photovoltaic plants and the modeling problems that come with them, from device level
             conversion efficiency up to plant level coordination with the grid.`,
    },
    {
      title: 'Distributed energy resources and microgrids',
      body: `Coordination and monitoring of many small assets rather than a few large ones. My multi inverter work
             is a step toward this, and it is an area I would like to develop further in a PhD.`,
    },
    {
      title: 'Power system reliability',
      body: `Using self calibrating models for condition monitoring, so that drift in an estimated parameter becomes
             an early signal about the health of an asset.`,
    },
    {
      title: 'Grid modernization',
      body: `The broader motivation behind all of the above: making an aging, increasingly converter based grid
             observable and controllable with the instrumentation operators actually have.`,
    },
    {
      title: 'Optimization for power systems',
      body: `Parameter identification and design optimization, from estimating inverter parameters under minimal
             excitation to optimizing transport layers in tandem photovoltaic cells.`,
    },
    {
      title: 'Photovoltaic device modeling',
      body: `Transport layer optimization and optical loss reduction in perovskite tandem architectures, where I
             have a published conference paper.`,
    },
    {
      title: 'Edge AI and embedded systems',
      body: `On device computer vision and low latency inference on constrained hardware, with no cloud dependency.
             Relevant to instrumenting grid assets where bandwidth and latency are limited.`,
    },
  ],

  interestsNote: `I am also interested in electric vehicles, vehicle to grid, and vehicle to vehicle technologies as
                  application areas for the same modeling and estimation methods. I have no publications there yet,
                  and I would treat a PhD as the place to build that background properly.`,

  education: [
    {
      degree: 'BSc in Electrical and Electronic Engineering',
      institution: 'American International University-Bangladesh (AIUB)',
      url: 'https://www.aiub.edu/',
      place: 'Dhaka, Bangladesh',
      start: '2022-01-23',
      end: '2025-12-26',
      period: 'Jan 2022 to Dec 2025',
      detail: 'CGPA 3.57 / 4.00 · 148 credits · Field: Engineering',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Qadirabad Cantonment Sapper College',
      url: 'https://qcsc.edu.bd/',
      place: 'Natore, Bangladesh',
      start: '2018-01-01',
      end: '2021-01-30',
      period: 'Jan 2018 to Jan 2021',
      detail: 'Science · GPA 4.67 / 5.00',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Jigori High School',
      url: 'https://jigorihighschool.com/en/',
      place: 'Natore, Bangladesh',
      start: '2016-01-01',
      end: '2018-05-06',
      period: 'Jan 2016 to May 2018',
      detail: 'Science · GPA 4.89 / 5.00',
    },
  ],

  experience: [
    {
      role: 'Internship Trainee',
      org: 'Energypac Engineering Ltd.',
      url: 'https://www.energypac.com/epgl/',
      place: 'Dhaka, Bangladesh',
      period: 'Jun 2025 to Jul 2025',
      points: [
        'Hands on work in the manufacturing and testing of power equipment, including transformers, switchgear, and protective devices.',
        'Assisted with equipment assembly, relay settings, and quality inspections.',
        'Participated in high voltage testing procedures in accordance with IEC standards.',
        'Supported testing and commissioning activities for power distribution equipment.',
      ],
    },
  ],

  skills: [
    { group: 'Programming and data', items: ['Python', 'C', 'C++', 'NumPy', 'Pandas', 'SciPy', 'Matplotlib', 'Seaborn', 'Git/GitHub'] },
    { group: 'Machine learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'] },
    { group: 'Simulation and modeling', items: ['MATLAB', 'Simulink', 'CST Microwave Studio', 'OptiSystem', 'Antenna design'] },
    { group: 'EDA, IC and CAD', items: ['Cadence Virtuoso', 'AutoCAD', 'AutoCAD Electrical', 'SOLIDWORKS'] },
    { group: 'Hardware and PCB', items: ['EasyEDA', 'NI Multisim', 'Proteus'] },
    { group: 'Embedded systems', items: ['Raspberry Pi 5', 'ESP32', 'Arduino Uno', 'AI Vision Kit', 'Motion sensors'] },
    { group: 'Energy systems', items: ['Renewable energy', 'HOMER Energy', 'RETScreen'] },
  ],

  languages: [
    { name: 'Bengali', level: 'Mother tongue' },
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'Hindi', level: 'Conversational' },
    { name: 'Urdu', level: 'Conversational' },
  ],

  awards: [
    {
      title: 'IEEE TENSYMP 2026 Certificate of Presentation',
      org: 'IEEE Region 10 Symposium',
      year: '2026',
      note: 'For presenting the physics informed digital twin work in Penang, Malaysia.',
    },
    {
      title: 'Certificate of Achievement in Spoken English and Phonetics',
      org: 'Professional short course',
      year: '2025',
      note: '72% in class and test performance, September to November 2025.',
    },
  ],
};

/**
 * Publications.
 * status: 'published' | 'accepted' | 'presented' | 'under-review'
 * type:   'conference' | 'journal' | 'chapter' | 'preprint'
 */
export const publications = [
  {
    id: 'tensymp2026-digitaltwin',
    title:
      'A Physics-Informed Self-Calibrating Digital Twin with Conformal Uncertainty for Multi-Inverter PV Power Systems',
    authors: ['Md. Sazzad Hossain'],
    authorLine: 'Second author',
    myPosition: 2,
    venue: 'IEEE Region 10 Symposium (TENSYMP)',
    venueShort: 'TENSYMP',
    year: 2026,
    date: '2026-06-29',
    dateLabel: '29 June to 1 July 2026',
    place: 'Penang, Malaysia',
    type: 'conference',
    status: 'presented',
    area: 'Digital twins',
    doi: '', // add the DOI once IEEE Xplore indexes it
    url: '',
    // replace with the published abstract
    abstract:
      'Abstract to be added once the camera ready version is public. The paper develops a physics informed digital twin for multi inverter photovoltaic systems that recalibrates itself against live measurements, and pairs its predictions with conformal prediction intervals to give distribution free coverage guarantees.',
    abstractPlaceholder: true,
    bibtex: `@inproceedings{hossain2026digitaltwin,
  title     = {A Physics-Informed Self-Calibrating Digital Twin with Conformal Uncertainty for Multi-Inverter PV Power Systems},
  author    = {Hossain, Md. Sazzad},
  booktitle = {2026 IEEE Region 10 Symposium (TENSYMP)},
  year      = {2026},
  address   = {Penang, Malaysia},
  month     = {jun}
}`,
  },
  {
    id: 'tencon2026-greybox',
    title:
      'Hybrid Grey-Box Digital Twin Using Voltage & Frequency Step Experiments for Real-Time Parameter Estimation of Grid-Following Inverters',
    authors: ['Md. Sazzad Hossain'],
    authorLine: 'Second author',
    myPosition: 2,
    venue: 'IEEE Region 10 Conference (TENCON)',
    venueShort: 'TENCON',
    year: 2026,
    date: '2026-10-10',
    dateLabel: '10 to 13 October 2026',
    place: 'Bali, Indonesia',
    type: 'conference',
    status: 'accepted',
    area: 'Digital twins',
    doi: '',
    url: '',
    abstract:
      'Abstract to be added once the camera ready version is public. The paper combines a physical inverter model with data driven residual correction, and shows that voltage and frequency step experiments alone are sufficient excitation to identify grid following inverter parameters in real time.',
    abstractPlaceholder: true,
    bibtex: `@inproceedings{hossain2026greybox,
  title     = {Hybrid Grey-Box Digital Twin Using Voltage and Frequency Step Experiments for Real-Time Parameter Estimation of Grid-Following Inverters},
  author    = {Hossain, Md. Sazzad},
  booktitle = {2026 IEEE Region 10 Conference (TENCON)},
  year      = {2026},
  address   = {Bali, Indonesia},
  month     = {oct}
}`,
  },
  {
    id: 'peeiacon2025-perovskite',
    title: 'Optimized Transport Layers for Enhanced Efficiency in Perovskite-Perovskite Tandem Solar Cells',
    authors: [
      'Asif Iqbal',
      'Sumit Hassan Eshan',
      'Md Farukuzzaman',
      'Md Sazzad Hossain',
      'Azizul H Tuhin',
      'Sadia Ahmed',
      'Samiul Hasan',
      'Orpyta Karmokar Aupy',
    ],
    authorLine: 'Fourth author',
    myPosition: 4,
    venue:
      'IEEE International Conference on Power, Electrical, Electronics and Industrial Applications (PEEIACON)',
    venueShort: 'PEEIACON',
    year: 2025,
    date: '2025-12-04',
    dateLabel: '4 to 5 December 2025',
    place: 'Southeast University (SEU), Dhaka, Bangladesh',
    type: 'conference',
    status: 'presented',
    area: 'Photovoltaics',
    doi: '',
    url: '',
    abstract:
      'Due to their potential to exceed traditional silicon-based solar cells in terms of energy conversion efficiency, tandem solar cells, in particular perovskite/perovskite combinations, have attracted a lot of attention. According to the Detailed Balance Limit hypothesis, the efficiency of tandem devices can surpass 40%. In order to increase short-circuit current and power conversion efficiency (PCE), this study focuses on optimizing the electron transport layer (ETL) and the hole transport layer (HTL). By choosing suitable materials with superior bandgaps for the top and bottom cells, we suggest an enhanced energy harvesting arrangement for a perovskite/perovskite tandem solar cell. With an open-circuit voltage (Voc) of around 1.85 V and a short-circuit current density (Jsc) of approximately 17.4 mA/cm², the optimized design achieves a power conversion efficiency (PCE) of approximately 22.2%. Our results demonstrate that improving PCE in perovskite-based tandem solar cells requires reduced optical losses and effective photon coupling, both of which are enabled by improved transport layers. The suggested design offers practical elements for the advancement of perovskite solar cell technology, which will contribute to the future development of renewable energy sources.',
    keywords: ['Tandem device', 'Perovskite', 'Power loss', 'Quantum efficiency', 'Short circuit current'],
    bibtex: `@inproceedings{iqbal2025perovskite,
  title     = {Optimized Transport Layers for Enhanced Efficiency in Perovskite-Perovskite Tandem Solar Cells},
  author    = {Iqbal, Asif and Eshan, Sumit Hassan and Farukuzzaman, Md and Hossain, Md Sazzad and Tuhin, Azizul H and Ahmed, Sadia and Hasan, Samiul and Aupy, Orpyta Karmokar},
  booktitle = {2025 IEEE International Conference on Power, Electrical, Electronics and Industrial Applications (PEEIACON)},
  year      = {2025},
  address   = {Dhaka, Bangladesh},
  month     = {dec}
}`,
  },
  {
    id: 'scirep-multicell',
    title: 'A Multi-Cell Physics-Based Study (manuscript under review)',
    authors: ['Md. Sazzad Hossain'],
    authorLine: 'Co-author',
    venue: 'Scientific Reports',
    venueShort: 'Sci Rep',
    year: 2026,
    date: '2026-07-08',
    dateLabel: 'Submitted July 2026',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Photovoltaics',
    doi: '',
    url: '',
    abstract:
      'Manuscript currently under peer review at Scientific Reports. Title and abstract will be published here once a decision is reached.',
    abstractPlaceholder: true,
    bibtex: '',
  },
  {
    id: 'ijepes-submission',
    title: 'Manuscript under review at the International Journal of Electrical Power and Energy Systems',
    authors: ['Md. Sazzad Hossain'],
    authorLine: 'Co-author',
    venue: 'International Journal of Electrical Power and Energy Systems',
    venueShort: 'IJEPES',
    year: 2026,
    date: '2026-07-09',
    dateLabel: 'Submitted July 2026',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Power systems',
    doi: '',
    url: '',
    abstract:
      'Manuscript currently under peer review. Details will be published here once a decision is reached.',
    abstractPlaceholder: true,
    bibtex: '',
  },
  {
    id: 'nexus-submission',
    title: 'Manuscript under review at Nexus',
    authors: ['Md. Sazzad Hossain'],
    authorLine: 'Co-author',
    venue: 'Nexus',
    venueShort: 'Nexus',
    year: 2026,
    date: '2026-07-09',
    dateLabel: 'Submitted July 2026',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Power systems',
    doi: '',
    url: '',
    abstract:
      'Manuscript currently under peer review. Details will be published here once a decision is reached.',
    abstractPlaceholder: true,
    bibtex: '',
  },
];

export const projects = [
  {
    id: 'digital-twin-pv',
    title: 'Self-calibrating digital twin for multi-inverter PV systems',
    period: '2025 to present',
    status: 'Ongoing',
    area: 'Digital twins',
    summary:
      'A digital twin of a multi inverter photovoltaic plant that keeps its internal parameters honest by recalibrating against streaming measurements, and reports conformal prediction intervals instead of bare point estimates. The latest iteration adds a Kalman filter that tracks inverter efficiency itself as a drifting state, so the twin catches degradation rather than just following it.',
    points: [
      'Physics informed model structure so that predictions stay consistent with converter dynamics rather than fitting arbitrary curves.',
      'A 27-feature physics-informed representation (irradiance non-linearity, module thermal dynamics, solar angle, temporal lags) feeding a gradient-boosted forecaster that outperformed a full LSTM/GRU/CNN benchmark family by 11.8 to 13.3 percentage points on a 34-day validation window.',
      'Split conformal prediction wrapped around every forecast, holding 96.1% empirical coverage against a 95% nominal target instead of an unverified confidence claim.',
      'A scalar Kalman filter tracking inverter efficiency as a latent state, catching a 2% degradation event within about 75 hours and improving on a fixed-efficiency baseline by 2.1% RMSE and 6.5% MAE.',
      'Zero-shot transfer to a second, unseen plant to check the physics baseline generalizes without retraining, rather than assuming it does.',
    ],
    collaborators: 'Research group at American International University-Bangladesh (AIUB)',
    funding: 'Unfunded undergraduate research.',
    outputs: [{ label: 'TENSYMP 2026 paper', href: '/publications/#tensymp2026-digitaltwin' }],
  },
  {
    id: 'grey-box-inverter',
    title: 'Hybrid grey-box parameter estimation for grid-following inverters',
    period: '2025 to 2026',
    status: 'Accepted for publication',
    area: 'Power systems',
    summary:
      'Real time identification of grid following inverter parameters using only voltage and frequency step experiments, chosen deliberately as minimal excitation because that is what an operator can realistically apply to a live asset.',
    points: [
      'Grey box formulation: a physical converter model carrying the structure, a data driven term absorbing the residual.',
      'Step response experiment design that avoids injecting disruptive test signals into a working system.',
      'Real time estimation suitable for online monitoring rather than offline post processing.',
    ],
    collaborators: 'Research group at American International University-Bangladesh (AIUB)',
    funding: 'Unfunded undergraduate research.',
    outputs: [{ label: 'TENCON 2026 paper', href: '/publications/#tencon2026-greybox' }],
  },
  {
    id: 'battery-digital-twin',
    title: 'Multi-cell digital twin with closed-loop Kalman filtering for battery health',
    period: '2026',
    status: 'Submitted, under review',
    area: 'Energy storage',
    summary:
      'Most battery digital twins are validated on one cell and never close the loop on their own state estimate, so an error in the starting charge just drifts forever. This one anchors a first-order Thevenin equivalent-circuit model, with a cell-specific open-circuit-voltage curve, to an extended Kalman filter that continuously corrects itself against measured voltage, then extrapolates the resulting capacity fade into a remaining-useful-life estimate with a stated confidence band rather than a single bare number.',
    points: [
      'Closed-loop extended Kalman filter that recovers state of charge to within 1.5% under a deliberately injected 20% initialization error and a 2% current-sensor bias, against 9.3% for plain open-loop Coulomb counting.',
      'Validated against raw measurements from four separately aged cells (24.3% to 41.7% capacity fade over up to 168 cycles) rather than the single-cell demonstrations common in this literature.',
      'A remaining-useful-life predictor trained on only the first 60% of each cell’s life, locating true end of life within 0.2 to 10.1 cycles.',
      'A nine-check, equation-based validation protocol that gates every reported number for physical admissibility before it is trusted, built as a reproducible, dependency-light pipeline.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita',
    funding: 'Unfunded undergraduate research.',
    outputs: [],
  },
  {
    id: 'grid-forming-dsm',
    title: 'Distributed stability certification for grid-forming inverter microgrids',
    period: '2026',
    status: 'Submitted, under review',
    area: 'Power systems',
    summary:
      'Keeping a stability guarantee inside an optimal power flow solve is normally either centralized, which stops scaling as a feeder grows, or certified region by region, which quietly loses its guarantee the moment regions couple electrically. This work decomposes the small-signal Lyapunov stability condition over the feeder’s own chordal region graph and verifies it with a couple of rounds of ADMM, then folds the resulting margin back into dispatch as an ordinary constraint.',
    points: [
      'A chordal, region-graph decomposition of the stability certificate that agrees exactly with the centralized feasibility test on the real linearized model, verified in just 2 ADMM iterations.',
      'A parameter sweep on the IEEE 33-bus feeder showing the stability constraint never actually binds against cost minimization at nominal operation, traced to reactive dispatch carrying roughly eight times the stability authority of active dispatch.',
      'A 116-draw random placement study quantifying how often the naive, per-region shortcut gets it badly wrong (over 50% error in 15.7% of stable cases) against a clique-edge certificate that never does, repeated on a second, topologically distinct feeder to check what actually transfers.',
      'A direct cost comparison showing verification of a fixed certificate is cheap (2 ADMM iterations) while synthesizing the truly optimal one needs a centralized semidefinite program that ran out of memory on the available hardware.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Md Aktar Hossain, Md. A. Hamid Howlader',
    funding: 'Unfunded undergraduate research.',
    outputs: [],
  },
  {
    id: 'gan-hemt-thermal-pinn',
    title: 'Physics-informed neural network for hot-spot estimation in GaN HEMTs',
    period: '2026',
    status: 'Submitted, under review',
    area: 'Embedded systems',
    summary:
      'The hottest point in a GaN power transistor sits in a sub-micron region at the gate edge that no sensor can physically reach, yet it is what actually limits the device’s lifetime. This work recovers that internal temperature, and the unknown power producing it, from just a handful of surface readings, using a two-branch physics-informed neural network that represents each material layer separately and enforces the real interface physics between them exactly, rather than smoothing over it.',
    points: [
      'Two-branch network coupled by explicit flux-continuity and thermal-boundary-resistance conditions, so the 17.1 K temperature discontinuity at the GaN/SiC interface (a third of the total 51.4 K rise) is represented exactly instead of blurred out.',
      'An analytic Green’s-function term folded into the network’s ansatz that satisfies the isothermal baseplate condition exactly on its own, leaving the network to learn only the remainder.',
      'Because that analytic term carries the unknown power linearly, recovering the operating power from live sensor readings is a closed-form least-squares solve rather than an iterative fit — microseconds, not minutes.',
      'Validated against a verified nonlinear finite-volume reference: the peak temperature rise matches to within 2.62 K while evaluating the field about 166 times faster than the numerical solver.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita',
    funding: 'Unfunded undergraduate research.',
    outputs: [],
  },
  {
    id: 'digital-twin-staleness',
    title: 'Calibrated staleness detection for renewable-fleet digital twins',
    period: '2026',
    status: 'Submitted, under review',
    area: 'Digital twins',
    summary:
      'A digital twin of a renewable fleet drifts out of date as the physical fleet itself changes, and the real operational question is when to retrain it. Drift-detection methods usually get credited with firing earlier than a simple control-chart baseline, but those comparisons are almost always made at a single, unmatched alarm threshold — which quietly conflates how sensitive a detector is with how many false alarms it is allowed. This work re-runs that comparison properly: every detector calibrated to the same false-alarm budget first, using six years of real data across the German national solar fleet.',
    points: [
      'A block-bootstrap calibration step that puts every drift detector on the same false-alarm footing before comparing detection speed, rather than comparing raw trigger times.',
      'Once calibrated, the commonly favored Page-Hinkley test’s reported edge over a plain rolling-RMSE chart mostly disappears — a bootstrap median lead of only −2 days, with a 95% interval spanning −25 to +42 days.',
      'Shows the Page-Hinkley statistic is algebraically identical to the one-sided CUSUM recursion, which explains why the two were never really competing methods to begin with.',
      'A two-factor study isolating that the retraining window, not which trigger you pick, is what actually determines whether recalibration pays off.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita',
    funding: 'Unfunded undergraduate research.',
    outputs: [],
  },
  {
    id: 'perovskite-tandem',
    title: 'Transport-layer optimization in perovskite tandem solar cells',
    period: '2025',
    status: 'Presented',
    area: 'Photovoltaics',
    summary:
      'Device level simulation study optimizing electron and hole transport layers in a two terminal perovskite tandem stack, reaching approximately 22.2% power conversion efficiency.',
    points: [
      'Material and bandgap selection for top and bottom sub cells in a 2 terminal monolithic stack.',
      'Optimized design reaching Voc of about 1.85 V, Jsc of about 17.4 mA/cm², and PCE of about 22.2%.',
      'Analysis showing reduced optical losses and effective photon coupling as the dominant levers on efficiency.',
    ],
    collaborators:
      'Asif Iqbal, Sumit Hassan Eshan, Md Farukuzzaman, Azizul H Tuhin (EWU), Sadia Ahmed, Samiul Hasan, Orpyta Karmokar Aupy',
    funding: 'Unfunded undergraduate research.',
    outputs: [{ label: 'PEEIACON 2025 paper', href: '/publications/#peeiacon2025-perovskite' }],
  },
  {
    id: 'edge-vision',
    title: 'Edge AI motion detection and classification system',
    period: 'Apr 2024 to May 2025',
    status: 'Completed',
    area: 'Embedded systems',
    summary:
      'An intelligent edge computing system that captures and processes images on device, detecting motion through sequential frame analysis and classifying events with no cloud dependency.',
    points: [
      'Computer vision pipeline detecting motion via sequential frame differencing.',
      'AI based classification on captured frames to identify motion events and trigger automated responses.',
      'Integrated an AI Camera Module with Raspberry Pi 5 and Vision Kit for complete on device processing.',
      'Optimized the capture pipeline and detection algorithms for low latency on constrained edge hardware.',
    ],
    collaborators: 'Undergraduate capstone project, AIUB',
    funding: 'Self funded.',
    outputs: [],
  },
];

export const news = [
  {
    date: '2026-07-09',
    title: 'Two manuscripts submitted for journal review',
    body: 'Co-authored submissions sent to the International Journal of Electrical Power and Energy Systems and to Nexus. Both are now with reviewers.',
  },
  {
    date: '2026-07-08',
    title: 'Manuscript submitted to Scientific Reports',
    body: 'A multi cell physics based study has been received by Scientific Reports and entered peer review.',
  },
  {
    date: '2026-06-29',
    title: 'Presented at IEEE TENSYMP 2026 in Penang',
    body: 'Presented the physics informed self calibrating digital twin with conformal uncertainty for multi inverter PV systems at the IEEE Region 10 Symposium.',
  },
  {
    date: '2026-05-01',
    title: 'TENCON 2026 paper accepted',
    body: 'The hybrid grey box digital twin paper has been accepted for the IEEE Region 10 Conference in Bali, October 2026.',
  },
  {
    date: '2025-12-26',
    title: 'Graduated from AIUB',
    body: 'Completed the BSc in Electrical and Electronic Engineering at American International University-Bangladesh with a CGPA of 3.57 out of 4.00.',
  },
  {
    date: '2025-12-04',
    title: 'Presented at PEEIACON 2025',
    body: 'Presented work on optimized transport layers for perovskite tandem solar cells at Southeast University, Dhaka.',
  },
];

export const teaching = {
  intro: `I have not yet held a formal teaching appointment, having graduated in December 2025 and now applying for
          PhD positions. What follows is the mentoring and demonstration work I have done so far. This page will grow
          as I take on teaching assistantships.`,
  entries: [
    {
      role: 'Peer mentor for undergraduate project work',
      org: 'American International University-Bangladesh',
      period: '2024 to 2025',
      points: [
        'Supported junior students working on embedded systems and computer vision projects, covering Raspberry Pi setup, OpenCV pipelines, and debugging on constrained hardware.',
        'Walked teammates through simulation workflows in MATLAB and Simulink for converter and power system coursework.',
      ],
    },
    {
      role: 'Conference presenter',
      org: 'IEEE TENSYMP 2026 · IEEE PEEIACON 2025',
      period: '2025 to 2026',
      points: [
        'Presented research to international audiences, fielding questions on model structure, uncertainty quantification, and device physics.',
      ],
    },
  ],
  interests: [
    'Circuit theory and electronics fundamentals',
    'Power electronics and converter control',
    'Signals, systems, and control',
    'Applied machine learning for engineers',
    'Programming for engineering (Python, MATLAB)',
  ],
};
