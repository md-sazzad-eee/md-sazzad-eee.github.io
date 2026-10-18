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
  title: 'Research Assistant, ReGED · Electrical and Electronic Engineering Graduate',
  tagline:
    'Physics-informed digital twins, inverter control and stability, and trustworthy machine learning for power systems.',
  location: 'Natore, Bangladesh',
  email: 'md.sazzad.eee@gmail.com',
  lang: 'en',
  locale: 'en_US',

  description:
    'Md. Sazzad Hossain is a Research Assistant at ReGED and an Electrical and Electronic Engineering graduate researching grid-forming and grid-following inverter control and stability, physics-informed digital twins of inverters and batteries, trustworthy machine learning for cyber-physical power systems, and SiC and GaN power-electronics reliability.',

  keywords: [
    'Md Sazzad Hossain',
    'artificial intelligence for power systems',
    'machine learning for energy systems',
    'digital twin',
    'grid following inverter',
    'grid forming inverter',
    'virtual synchronous generator',
    'SiC power electronics reliability',
    'false data injection attack detection',
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
    orcid: 'https://orcid.org/0009-0005-2937-7666',
    researchGate: '', // e.g. https://www.researchgate.net/profile/XXXX
    linkedin: 'https://www.linkedin.com/in/md-sazzad-eee',
    github: 'https://github.com/md-sazzad-eee',
  },

  locationMapUrl: 'https://maps.app.goo.gl/8wwykM3eoSpLxrJN7',

  // Web3Forms access key. Get a free one at https://web3forms.com
  // Leave empty and the contact form gracefully falls back to a mailto: link.
  web3formsKey: '',

  cv: {
    primary: {
      file: '/cv/Md-Sazzad-Hossain-CV.pdf',
      download: 'Md-Sazzad-Hossain-CV.pdf',
      label: 'Academic CV',
      note: 'Full academic CV covering education, publications, projects, and skills.',
      updated: 'October 2026',
    },
    alternates: [],
  },
};

export const about = {
  bio: [
    `I am a Research Assistant at the Research Centre for Green Energy, Electro-Anatomy, and Digital Intelligence
     (ReGED) in Dhaka, and an Electrical and Electronic Engineering graduate from American International
     University-Bangladesh. I build physics-based and data-driven digital twins of PV inverters, grid-forming
     batteries and SiC power modules, and work on the control and stability of inverters in weak, low-inertia grids.
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
      title: 'Inverter control and stability',
      body: `Control and stability of grid-forming and grid-following inverters in weak, low-inertia grids, including
             adaptive mode switching and stability-aware demand scheduling.`,
    },
    {
      title: 'Digital twins',
      body: `Physics-informed, self-calibrating digital twins of inverters and batteries that track parameter drift,
             with identifiability analysis and safe excitation design for calibration.`,
    },
    {
      title: 'Trustworthy machine learning',
      body: `Uncertainty-aware machine learning with conformal guarantees for power-system monitoring and detection of
             cyber-physical attacks, so that a deployed model reports calibrated intervals instead of bare point estimates.`,
    },
    {
      title: 'Power-electronics reliability',
      body: `Electrothermal modeling and condition monitoring of SiC and GaN power electronics, including
             junction-temperature estimation and component health.`,
    },
    {
      title: 'Renewable energy integration',
      body: `Multi inverter photovoltaic plants and PV-battery systems, and the modeling problems that come with them,
             from device level conversion efficiency up to plant level coordination with the grid.`,
    },
    {
      title: 'Distributed energy resources and microgrids',
      body: `Coordination and monitoring of many small assets rather than a few large ones, including batteries and
             EV charging as both a resource and a disturbance.`,
    },
    {
      title: 'Grid modernization',
      body: `The broader motivation behind all of the above: making an aging, increasingly converter based grid
             observable and controllable with the instrumentation operators actually have.`,
    },
    {
      title: 'Photovoltaic device modeling',
      body: `Transport layer optimization and optical loss reduction in perovskite tandem architectures, where I
             have a published conference paper.`,
    },
    {
      title: 'Edge AI and embedded systems',
      body: `On device computer vision, low latency inference and multi-robot systems on constrained hardware.
             Relevant to instrumenting grid assets where bandwidth and latency are limited.`,
    },
  ],

  interestsNote: `I am also interested in electric vehicles and vehicle to grid technologies as application areas for
                  the same modeling and estimation methods. My first work there, on EV battery state estimation and
                  EV charging disturbances in grid-forming systems, is under review, and I would treat a PhD as the
                  place to build that background properly.`,

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
      role: 'Research Assistant',
      org: 'Research Centre for Green Energy, Electro-Anatomy, and Digital Intelligence (ReGED)',
      url: '',
      place: 'Dhaka, Bangladesh',
      period: 'Feb 2026 to Present',
      points: [
        'Build physics-based and data-driven digital twins of PV inverters, grid-forming batteries and SiC power modules in MATLAB/Simulink and COMSOL.',
        'Study identifiability, Fisher-information excitation design and online calibration of inverter digital twins.',
        'Develop uncertainty-aware detectors with conformal guarantees for cyber-physical attacks on power systems.',
        'Prepare journal and conference manuscripts with the group, from modeling and simulation to writing and revision.',
      ],
    },
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
    { group: 'Power systems and renewable energy', items: ['MATLAB & Simulink', 'PSCAD', 'PSS/E', 'DIgSILENT PowerFactory', 'HOMER Energy', 'RETScreen'] },
    { group: 'Multiphysics, FEM and EM simulation', items: ['COMSOL Multiphysics', 'CST Microwave Studio', 'Antenna design', 'OptiSystem'] },
    { group: 'Programming and machine learning', items: ['Python', 'C', 'C++', 'NumPy', 'Pandas', 'SciPy', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'OpenCV', 'Matplotlib', 'Seaborn'] },
    { group: 'Circuits, PCB and IC design', items: ['KiCad', 'EasyEDA', 'NI Multisim', 'Proteus', 'Cadence Virtuoso'] },
    { group: 'Mechanical and electrical CAD', items: ['Autodesk Fusion 360', 'SOLIDWORKS', 'FreeCAD', 'AutoCAD', 'AutoCAD Electrical'] },
    { group: 'Embedded systems', items: ['Raspberry Pi 5', 'ESP32', 'Arduino Uno', 'AI Vision Kit', 'Motion sensors'] },
    { group: 'Tools and documentation', items: ['Git/GitHub', 'Visual Studio Code', 'Google Colab', 'LaTeX', 'Overleaf', 'Microsoft Office', 'Inkscape', 'CorelDRAW'] },
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
 * Publications. Mirrors the CV (October 2026).
 * status: 'published' | 'accepted' | 'presented' | 'under-review' | 'submitted' | 'in-preparation'
 * type:   'conference' | 'journal' | 'chapter' | 'preprint'
 */
const PENDING = 'Under peer review. The abstract will be posted here once the paper is public.';
const PENDING_ACCEPTED = 'Accepted for presentation. The abstract will be posted here once the camera ready version is public.';
const PES_IM = {
  venue: 'IEEE PES International Meeting (PES-IM) 2027',
  venueShort: 'PES-IM',
  year: 2027,
  date: '2027-01-10',
  place: 'Beijing, China',
  type: 'conference',
  doi: '',
  url: '',
  authors: [],
  authorLine: '',
  abstractPlaceholder: false,
  bibtex: '',
};
const ICREST = {
  venue: 'International Conference on Robotics, Electrical and Signal Processing Techniques (ICREST) 2027',
  venueShort: 'ICREST',
  year: 2027,
  date: '2026-10-01',
  place: '',
  type: 'conference',
  status: 'submitted',
  doi: '',
  url: '',
  authors: [],
  authorLine: '',
  abstract: PENDING,
  abstractPlaceholder: false,
  bibtex: '',
};

export const publications = [
  /* ---------------------------------------------------------------- journals */
  {
    id: 'nextsust2026-staleness-journal',
    title:
      'Digital-Twin Staleness Detection in Renewable Generation: A False-Alarm-Matched Benchmark of Sequential Drift Detectors across Sixteen European Fleets',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian', 'Debashish Kumar Ghosh', 'Md. Sajid Hossain'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'Next Sustainability (Elsevier)',
    venueShort: 'Next Sustainability',
    year: 2026,
    date: '2026-09-18',
    dateLabel: 'Under review, manuscript NXSUST-D-26-01704',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Digital twins',
    doi: '',
    url: '',
    abstract:
      'A digital twin of a renewable generation asset loses predictive accuracy as the physical fleet evolves, a degradation termed staleness or model drift, yet the operational question of when a deployed twin should be recalibrated is rarely answered with statistical rigor. Prior studies typically report that a chosen change detector fires earlier than a baseline at a single, unmatched threshold, which conflates detector sensitivity with the false-alarm rate the operator is implicitly accepting. This paper reframes staleness detection as a matched-false-alarm benchmarking problem and evaluates five sequential detectors, the Page-Hinkley test, a rolling-RMSE control chart, a cumulative sum chart, an exponentially weighted moving-average chart, and a Kolmogorov-Smirnov windowing test, on residuals from a Random-Forest twin of sixteen European solar and wind fleets over six years of Open Power System Data. When every detector is calibrated to raise zero false alarms on the in-control 2015 to 2017 period, the Page-Hinkley advantage a single fleet suggests does not generalize: across sixteen fleets the mean detection lead over the rolling-RMSE chart is minus 18 days, and a delay-versus-false-alarm analysis shows the control chart detects gradual solar drift at least as quickly at practical false-alarm rates. A capacity-factor decomposition attributes roughly seventy to ninety-three percent of the mean residual on the two solar fleets examined to structural fleet growth, while a residual staleness signal persists and remains detectable. A fleet-wide study of recalibration policies shows timely retraining reduces error under genuine drift but degrades accuracy in noise-dominated wind fleets, yielding a regime-conditioned deployment guideline.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'scirep2026-sic-thermal-history',
    title:
      'Thermal-History Ambiguity in Grid-Connected SiC Photovoltaic Inverters: Electrical Observability, Physics-Constrained Estimation and Uncertainty-Aware Derating',
    authors: ['Md. Sazzad Hossain', 'Abu Shufian', 'Md. Sajid Hossain', 'Md. Rifat Hazari', 'Md. Saniat Rahman Zishan'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'Scientific Reports (Springer Nature)',
    venueShort: 'Scientific Reports',
    year: 2026,
    date: '2026-10-10',
    dateLabel: 'Under review',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Power electronics reliability',
    doi: '',
    url: 'https://github.com/md-sazzad-eee/sic-pv-thermal-history-dataset',
    abstract:
      'Studies how much of the junction-temperature history of a 100 kW grid-connected SiC photovoltaic inverter can be recovered from the electrical signals an inverter already measures, using a coupled MATLAB/Simulink and COMSOL model, a reduced-order Foster thermal model, physics-constrained estimation and uncertainty-aware derating. The simulation dataset, including trajectories under hot ambient, degraded cooling, switching-frequency and load-profile shifts, is openly available on GitHub.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'ecmx2026-fdia-conformal',
    title:
      'Trustworthy False Data Injection Attack Detection Using a Conformalized Digital Twin in Cyber-Physical Power Systems',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'Energy Conversion and Management: X (Elsevier)',
    venueShort: 'ECM: X',
    year: 2026,
    date: '2026-10-05',
    dateLabel: 'Under review, manuscript ECMX-D-26-02450',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Cyber-physical security',
    doi: '',
    url: '',
    abstract: PENDING,
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'scirep2026-excitation-design',
    title:
      'Information-Aware and Safety-Constrained Excitation Design for Digital-Twin Calibration of Grid-Following Inverters with LCL Filters',
    authors: [],
    authorLine: '',
    venue: 'Scientific Reports (Springer Nature)',
    venueShort: 'Scientific Reports',
    year: 2026,
    date: '2026-10-04',
    dateLabel: 'Under review',
    place: '',
    type: 'journal',
    status: 'under-review',
    area: 'Digital twins',
    doi: '',
    url: '',
    abstract: PENDING,
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'natcomms2026-photonic-bond-health',
    title:
      'Differential Calibration Drift Limits Photonic Bond-Health Sensing in SiC Power Modules: A Detectability Law and Ratiometric Two-Heater Self-Calibration',
    authors: [],
    authorLine: '',
    venue: 'Nature Communications (Springer Nature)',
    venueShort: 'Nature Communications',
    year: 2026,
    date: '2026-10-17',
    dateLabel: 'Submitted, under consideration',
    place: '',
    type: 'journal',
    status: 'submitted',
    area: 'Power electronics reliability',
    doi: '',
    url: 'https://github.com/md-sazzad-eee/Photonic-sensor-power-dataset',
    abstract:
      'Examines whether integrated silicon-photonic strain sensors can track bond degradation in a 1200 V, 450 A SiC half-bridge module, and shows that differential calibration drift between sensing rings sets the detectability limit. Proposes a ratiometric two-heater self-calibration to remove it. The raw electrothermal, waveguide-optics, package and heater simulation data are openly available on GitHub.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'ecmx2026-battery-twin',
    title:
      'A Multi-Cell Physics-Based Digital Twin with Closed-Loop Kalman Filtering and Remaining-Useful-Life Prognosis for Lithium-Ion Battery State of Health',
    authors: [],
    authorLine: '',
    venue: 'Energy Conversion and Management: X (Elsevier)',
    venueShort: 'ECM: X',
    year: 2026,
    date: '2026-10-12',
    dateLabel: 'Submitted, manuscript ECMX-D-26-02617, with editor',
    place: '',
    type: 'journal',
    status: 'submitted',
    area: 'Energy storage',
    doi: '',
    url: '',
    abstract:
      'Journal version of the multi-cell battery digital twin: a Thevenin equivalent-circuit model anchored to an extended Kalman filter for closed-loop state-of-charge estimation, with a remaining-useful-life predictor that reports confidence bounds, validated on four separately aged cells.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'prep2026-grid-strength',
    title:
      'Physics-Informed Machine-Learning Grid-Strength Estimation for Adaptive Grid-Forming/Grid-Following Energy Management of PV-BESS Plants',
    authors: [],
    authorLine: '',
    venue: 'Journal manuscript',
    venueShort: 'Journal',
    year: 2026,
    date: '2026-10-19',
    dateLabel: 'In preparation',
    place: '',
    type: 'journal',
    status: 'in-preparation',
    area: 'Inverter control',
    doi: '',
    url: '',
    abstract: 'Manuscript in preparation. Details will be posted once it is submitted.',
    abstractPlaceholder: false,
    bibtex: '',
  },

  /* ------------------------------------------------- conference: published */
  {
    id: 'tensymp2026-digitaltwin',
    title:
      'A Physics-Informed Self-Calibrating Digital Twin with Conformal Uncertainty for Multi-Inverter PV Power Systems',
    authors: [
      'Shaharier Kabir',
      'Md. Sazzad Hossain',
      'Md Sultan Mahamud',
      'Tasnim Kabir',
      'Abu Shufian',
      'Muhammad Masud Karim',
      'Saniat Rahman Zishan',
    ],
    authorLine: 'Second author',
    myPosition: 2,
    venue: 'IEEE Region 10 Symposium (TENSYMP)',
    venueShort: 'TENSYMP',
    year: 2026,
    date: '2026-06-29',
    dateLabel: '29 June to 1 July 2026',
    place: 'Penang, Malaysia',
    type: 'conference',
    status: 'published',
    area: 'Digital twins',
    doi: '', // add the DOI once IEEE Xplore indexes it
    url: '',
    abstract:
      'Develops a physics informed digital twin for multi inverter photovoltaic systems that recalibrates itself against live measurements, and pairs its predictions with conformal prediction intervals to give distribution free coverage guarantees.',
    abstractPlaceholder: false,
    bibtex: `@inproceedings{kabir2026digitaltwin,
  title     = {A Physics-Informed Self-Calibrating Digital Twin with Conformal Uncertainty for Multi-Inverter PV Power Systems},
  author    = {Kabir, Shaharier and Hossain, Md. Sazzad and Mahamud, Md Sultan and Kabir, Tasnim and Shufian, Abu and Karim, Muhammad Masud and Zishan, Saniat Rahman},
  booktitle = {2026 IEEE Region 10 Symposium (TENSYMP)},
  year      = {2026},
  address   = {Penang, Malaysia},
  month     = {jun}
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
    status: 'published',
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

  /* -------------------------------------------------- conference: accepted */
  {
    id: 'ukfcet2026-dsm-evcharging',
    title:
      'A Stability-Aware Demand-Side Management (DSM) Framework for Grid-Forming Inverter Transient Stability Under EV Charging Disturbances',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian', 'Md Aktar Hossain', 'Md. A. Hamid Howlader'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'IEEE ICICAIEECE 2027, UKF College of Engineering and Technology',
    venueShort: 'ICICAIEECE',
    year: 2027,
    date: '2027-01-21',
    dateLabel: '21 to 22 January 2027',
    place: 'Kollam, Kerala, India',
    type: 'conference',
    status: 'accepted',
    area: 'Inverter control',
    doi: '',
    url: 'https://conference.ukfcet.ac.in/#home',
    abstract: PENDING_ACCEPTED,
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    ...PES_IM,
    id: 'pesim2027-disturbance-memory',
    title:
      'Disturbance-Order Memory Indices and a Physics-Memory Digital Twin for Sequential Power System Disturbances',
    dateLabel: '10 to 13 January 2027 · paper 27INT0957',
    status: 'accepted',
    area: 'Digital twins',
    abstract: PENDING_ACCEPTED,
  },
  {
    ...PES_IM,
    id: 'pesim2027-pipeline-session-aware',
    title:
      'Session-Aware, Episode-Disjoint Detection of Rare Cyber-Physical Attacks in Midstream Pipeline SCADA with Calibrated Uncertainty and Physics-Consistent Explanations',
    dateLabel: '10 to 13 January 2027 · paper 27INT0980',
    status: 'accepted',
    area: 'Cyber-physical security',
    abstract: PENDING_ACCEPTED,
  },
  {
    ...PES_IM,
    id: 'pesim2027-dclink-capacitor',
    title:
      'An Event-Excited Digital Twin for Non-Invasive DC-Link Capacitor Health Estimation in Grid-Forming PV-Battery Inverters',
    dateLabel: '10 to 13 January 2027 · paper 27INT0981',
    status: 'accepted',
    area: 'Power electronics reliability',
    abstract: PENDING_ACCEPTED,
  },
  {
    ...PES_IM,
    id: 'pesim2027-vsg-inertia',
    title:
      'Saturation-Aware Digital Twin of a VSG-Controlled Battery for Online Inertia and Damping Identification and Tamper Versus Degradation Discrimination',
    dateLabel: '10 to 13 January 2027 · paper 27INT0984',
    status: 'accepted',
    area: 'Inverter control',
    abstract: PENDING_ACCEPTED,
  },
  {
    ...PES_IM,
    id: 'pesim2027-lcl-inductor',
    title:
      'Electrothermal Validity Boundary of a Fixed-Parameter Digital Twin of the LCL Inductor in PV Inverters During Voltage Sags',
    dateLabel: '10 to 13 January 2027 · paper 27INT1016',
    status: 'accepted',
    area: 'Power electronics reliability',
    abstract: PENDING_ACCEPTED,
  },

  /* ---------------------------------------------- conference: under review */
  {
    id: 'nsyss2026-staleness',
    title:
      'Calibrated Staleness Detection for Solar Digital Twins and the Dominance of the Retraining Window over the Detection Trigger',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian', 'Raihan Chowdhury', 'Goro Fujita'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'National Systems Conference (NSysS)',
    venueShort: 'NSysS',
    year: 2026,
    date: '2026-09-12',
    dateLabel: 'Under review',
    place: "Cox's Bazar, Bangladesh",
    type: 'conference',
    status: 'under-review',
    area: 'Digital twins',
    doi: '',
    url: 'https://cse.buet.ac.bd/nsyss2026/',
    abstract:
      'Drift detectors are usually credited with firing earlier than a control-chart baseline, but the comparisons behind that claim are almost always made at a single, unmatched alarm threshold. This paper recalibrates every detector to the same false-alarm rate first, using six years of data across the German national solar fleet, and shows the reported advantage of the commonly favored Page-Hinkley test mostly disappears once that is done. It further shows the retraining window, not the choice of trigger, is what actually governs whether recalibration pays off.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    id: 'nsyss2026-batterytwin',
    title:
      'A Multi-Cell Physics-Based Digital Twin with Closed-Loop Kalman Filtering and Remaining-Useful-Life Prognosis for Lithium-Ion Battery State of Health',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian', 'Raihan Chowdhury', 'Goro Fujita'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'National Systems Conference (NSysS)',
    venueShort: 'NSysS',
    year: 2026,
    date: '2026-09-12',
    dateLabel: 'Under review',
    place: "Cox's Bazar, Bangladesh",
    type: 'conference',
    status: 'under-review',
    area: 'Energy storage',
    doi: '',
    url: 'https://cse.buet.ac.bd/nsyss2026/',
    abstract:
      'A multi-cell, physics-based digital twin for lithium-ion battery state of health, unifying a Thevenin equivalent-circuit model with an extended Kalman filter for closed-loop charge and voltage estimation and a remaining-useful-life predictor with confidence bounds. Validated against four cells spanning 24.3% to 41.7% capacity fade over up to 168 cycles: the closed-loop filter recovers state of charge to within 1.5% under a 20% initialization error and a 2% current bias (against 9.3% open-loop), and the RUL predictor, trained on only the first 60% of each cell’s life, locates end of life within 0.2 to 10.1 cycles.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    ...PES_IM,
    id: 'pesim2027-counterfactual-abduction',
    title:
      'Counterfactual Abduction for Shift-Robust Intrusion Detection in Midstream Liquid Pipeline SCADA Under Setpoint Changes',
    date: '2026-10-01',
    dateLabel: 'Under review · paper 27INT0873',
    status: 'under-review',
    area: 'Cyber-physical security',
    abstract: PENDING,
  },
  {
    ...PES_IM,
    id: 'pesim2027-loop-integrity-parity',
    title:
      'Loop-Integrity Parity: Zero-Shot Detection, Localization, and Signal Reconstruction of Cyber-Physical Attacks in a Midstream Pipeline Control Loop',
    date: '2026-10-01',
    dateLabel: 'Under review · paper 27INT0983',
    status: 'under-review',
    area: 'Cyber-physical security',
    abstract: PENDING,
  },

  /* ------------------------------------------------- conference: submitted */
  {
    id: 'icece2026-gan-hemt',
    title:
      'Inverse Hot-Spot and Power Estimation in GaN HEMTs Using a Green’s Function-Augmented Physics-Informed Neural Network',
    authors: ['Md. Sazzad Hossain', 'Apurba Joty Roy', 'Abu Shufian', 'Raihan Chowdhury', 'Goro Fujita'],
    authorLine: 'Lead author',
    myPosition: 1,
    venue: 'International Conference on Electrical and Computer Engineering (ICECE)',
    venueShort: 'ICECE',
    year: 2026,
    date: '2026-08-13',
    dateLabel: 'Submitted August 2026',
    place: 'Dhaka, Bangladesh',
    type: 'conference',
    status: 'submitted',
    area: 'Power electronics reliability',
    doi: '',
    url: 'https://icece.org.bd/2026/',
    abstract:
      'Recovers the peak channel temperature of a GaN HEMT, a sub-micron region at the gate edge that no sensor can reach, and the unknown power producing it, from a few surface readings using a two-branch physics-informed neural network. Explicit interface conditions represent the 17.1 K discontinuity at the GaN/SiC interface exactly, and an analytic Green’s-function term reduces power identification to a closed-form least-squares solve. Matches a verified finite-volume reference to within 2.62 K on the 51.4 K peak rise while evaluating about 166 times faster.',
    abstractPlaceholder: false,
    bibtex: '',
  },
  {
    ...ICREST,
    id: 'icrest2027-quantum-reconfiguration',
    title:
      'Quantum-Assisted Self-Reconfiguration of Grid-Forming Renewable Inverters Under Thermal and Grid-Strength Constraints',
    dateLabel: 'Submitted · paper 252',
    area: 'Inverter control',
  },
  {
    ...ICREST,
    id: 'icrest2027-experiment-selection',
    title:
      'Information-Driven Experiment Selection for Self-Calibrating Digital Twins of Grid-Connected PV Inverters, with Weak-Grid Identifiability Maps and a QAOA Benchmark',
    dateLabel: 'Submitted · paper 254',
    area: 'Digital twins',
  },
  {
    ...ICREST,
    id: 'icrest2027-sic-operating-point',
    title:
      'Quantum-Assisted Electrothermal Operating-Point Optimization of SiC Photovoltaic Inverters Using a Physics-Informed Digital Twin',
    dateLabel: 'Submitted · paper 255',
    area: 'Power electronics reliability',
  },
  {
    ...ICREST,
    id: 'icrest2027-ukf-ev-battery',
    title:
      'Drive-Cycle Validation of an Adaptive Unscented Kalman Filter for Joint SOC, Internal Resistance, and SOH Estimation in Electric Vehicle Batteries',
    dateLabel: 'Submitted · paper 256',
    area: 'Energy storage',
  },
  {
    ...ICREST,
    id: 'icrest2027-pv-rul-audit',
    title:
      'Identifiability Audit of Physics-Informed RUL Estimation and Image-Based Fault Diagnosis for PV Digital Twins',
    dateLabel: 'Submitted · paper 422',
    area: 'Digital twins',
  },
  {
    id: 'tpec2027-neural-zubov',
    title:
      'Plant-Anchored Statistical Stability Guarantees for Grid-Forming Inverters Using a Physics-Informed Neural Zubov Score',
    authors: [],
    authorLine: '',
    venue: 'IEEE Texas Power and Energy Conference (TPEC) 2027',
    venueShort: 'TPEC',
    year: 2027,
    date: '2026-10-01',
    dateLabel: 'Submitted · paper 111',
    place: 'Texas, USA',
    type: 'conference',
    status: 'submitted',
    area: 'Inverter control',
    doi: '',
    url: '',
    abstract: PENDING,
    abstractPlaceholder: false,
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
    collaborators: 'Shaharier Kabir, Abu Shufian, Saniat Rahman Zishan and co-authors',
    funding: 'Unfunded research.',
    outputs: [
      { label: 'TENSYMP 2026 paper', href: '/publications/#tensymp2026-digitaltwin' },
      { label: 'ICREST 2027 identifiability audit (submitted)', href: '/publications/#icrest2027-pv-rul-audit' },
    ],
  },
  {
    id: 'grey-box-inverter',
    title: 'Identifiability and safe excitation design for inverter digital twins',
    period: '2025 to present',
    status: 'Under review',
    area: 'Digital twins',
    summary:
      'Calibrating a digital twin of a live grid-following inverter means exciting it, and an operator will only tolerate small, safe test signals. This work asks how much information a given experiment actually carries about the inverter and its LCL filter, and designs excitations that maximize Fisher information while respecting current, voltage and stability limits.',
    points: [
      'Grey box formulation: a physical converter model carrying the structure, a data driven term absorbing the residual.',
      'Fisher-information based experiment design under explicit safety constraints, instead of disruptive broadband test signals.',
      'Identifiability maps showing which parameters can and cannot be recovered as the grid gets weaker, with a QAOA benchmark for experiment selection.',
      'Online calibration suitable for monitoring rather than offline post processing.',
    ],
    collaborators: 'ReGED research group',
    funding: 'ReGED research.',
    outputs: [
      { label: 'Scientific Reports manuscript (under review)', href: '/publications/#scirep2026-excitation-design' },
      { label: 'ICREST 2027 paper (submitted)', href: '/publications/#icrest2027-experiment-selection' },
    ],
  },
  {
    id: 'sic-thermal-history',
    title: 'Thermal-history ambiguity in grid-connected SiC PV inverters',
    period: '2026',
    status: 'Under review',
    area: 'Power electronics reliability',
    summary:
      'Two load histories can end at the same operating point yet leave a SiC module at very different junction temperatures. This work asks how much of that thermal history an inverter can actually infer from the electrical signals it already measures, and builds a physics-constrained estimator with uncertainty-aware derating around the answer.',
    points: [
      'A 100 kW, 400 V grid-following inverter with an LCL filter and three Wolfspeed CAS300M12BM2 half-bridge modules, simulated electrically in MATLAB/Simulink and thermally in COMSOL Multiphysics 6.4.',
      'A six-pole Foster reduced-order thermal model validated against finite-element runs, including mesh, time-step and solver-tolerance checks.',
      'One-hour trajectories with realistic sensor noise and gain error, tested out of distribution under hot ambient, degraded cooling, different switching frequencies and unseen reactive-power ranges.',
      'Full dataset, parameters and checksums released openly on GitHub.',
    ],
    collaborators: 'Abu Shufian, Md. Sajid Hossain, Md. Rifat Hazari, Md. Saniat Rahman Zishan',
    funding: 'ReGED research.',
    outputs: [
      { label: 'Scientific Reports manuscript (under review)', href: '/publications/#scirep2026-sic-thermal-history' },
      { label: 'Dataset on GitHub', href: 'https://github.com/md-sazzad-eee/sic-pv-thermal-history-dataset' },
    ],
  },
  {
    id: 'photonic-bond-health',
    title: 'Photonic bond-health sensing in SiC power modules',
    period: '2026',
    status: 'Submitted',
    area: 'Power electronics reliability',
    summary:
      'Silicon-photonic strain sensors embedded near the die could in principle watch the bond layer of a power module degrade in service. This study shows that differential calibration drift between sensing rings, not sensor resolution, is what limits detectability, derives a detectability law for it, and proposes a ratiometric two-heater self-calibration that removes it.',
    points: [
      'Electrothermal model of one switch of a 1200 V, 450 A SiC half-bridge under constant, step, square-wave, ramp and start-stop current profiles.',
      'Mode solutions of a 220 nm silicon strip waveguide versus width, temperature and strain, with isotropic and anisotropic photoelastic models and a mesh study.',
      'Static and transient package models for healthy, softened and delaminated bonds, plus an axisymmetric micro-heater frequency response.',
      'All raw solver exports released as plain CSV on GitHub under CC BY 4.0.',
    ],
    collaborators: 'ReGED research group',
    funding: 'ReGED research.',
    outputs: [
      { label: 'Nature Communications manuscript (submitted)', href: '/publications/#natcomms2026-photonic-bond-health' },
      { label: 'Dataset on GitHub', href: 'https://github.com/md-sazzad-eee/Photonic-sensor-power-dataset' },
    ],
  },
  {
    id: 'grid-forming-twins',
    title: 'Digital twins and stability for grid-forming inverters',
    period: '2026',
    status: 'Accepted',
    area: 'Inverter control',
    summary:
      'Grid-forming inverters and virtual synchronous generators carry much of the stability burden in low-inertia grids, so their internal state is worth watching. This line of work builds event-excited and saturation-aware digital twins that estimate inertia, damping and component health online from ordinary grid disturbances, and pairs them with stability-aware scheduling and statistical stability certificates.',
    points: [
      'Online inertia and damping identification for a VSG-controlled battery that separates tampering from genuine degradation, while accounting for current saturation.',
      'Non-invasive DC-link capacitor health estimation in grid-forming PV-battery inverters, excited by events the grid already provides.',
      'The electrothermal validity boundary of a fixed-parameter LCL inductor twin during voltage sags, and memory indices for sequential disturbances.',
      'A stability-aware demand-side management framework that protects grid-forming transient stability under EV charging disturbances, and a physics-informed neural Zubov score for plant-anchored stability guarantees.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Md Aktar Hossain, Md. A. Hamid Howlader and the ReGED group',
    funding: 'ReGED research.',
    outputs: [
      { label: 'ICICAIEECE 2027 paper (accepted)', href: '/publications/#ukfcet2026-dsm-evcharging' },
      { label: 'PES-IM 2027 VSG paper (accepted)', href: '/publications/#pesim2027-vsg-inertia' },
      { label: 'PES-IM 2027 DC-link paper (accepted)', href: '/publications/#pesim2027-dclink-capacitor' },
      { label: 'PES-IM 2027 LCL inductor paper (accepted)', href: '/publications/#pesim2027-lcl-inductor' },
      { label: 'TPEC 2027 paper (submitted)', href: '/publications/#tpec2027-neural-zubov' },
    ],
  },
  {
    id: 'cyber-physical-detection',
    title: 'Trustworthy detection of cyber-physical attacks',
    period: '2026',
    status: 'Accepted',
    area: 'Cyber-physical security',
    summary:
      'An attack detector that raises an alarm without saying how confident it is, or that breaks the moment an operator changes a setpoint, is hard to trust in a control room. This work builds detectors for power systems and pipeline SCADA that carry calibrated uncertainty, stay robust to legitimate operating changes, and explain their alarms in physical terms.',
    points: [
      'A conformalized digital twin for false data injection attack detection in cyber-physical power systems.',
      'Session-aware, episode-disjoint evaluation of rare-attack detection in midstream pipeline SCADA, with calibrated uncertainty and physics-consistent explanations.',
      'Counterfactual abduction to keep intrusion detection robust under setpoint changes.',
      'Loop-integrity parity for zero-shot detection, localization and signal reconstruction in a pipeline control loop.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian and the ReGED group',
    funding: 'ReGED research.',
    outputs: [
      { label: 'ECM: X manuscript (under review)', href: '/publications/#ecmx2026-fdia-conformal' },
      { label: 'PES-IM 2027 paper (accepted)', href: '/publications/#pesim2027-pipeline-session-aware' },
    ],
  },
  {
    id: 'battery-digital-twin',
    title: 'Multi-cell digital twin with closed-loop Kalman filtering for battery health',
    period: '2026',
    status: 'Under review',
    area: 'Energy storage',
    summary:
      'Most battery digital twins are validated on one cell and never close the loop on their own state estimate, so an error in the starting charge just drifts forever. This one anchors a first-order Thevenin equivalent-circuit model, with a cell-specific open-circuit-voltage curve, to an extended Kalman filter that continuously corrects itself against measured voltage, then extrapolates the resulting capacity fade into a remaining-useful-life estimate with a stated confidence band rather than a single bare number.',
    points: [
      'Closed-loop extended Kalman filter that recovers state of charge to within 1.5% under a deliberately injected 20% initialization error and a 2% current-sensor bias, against 9.3% for plain open-loop Coulomb counting.',
      'Validated against raw measurements from four separately aged cells (24.3% to 41.7% capacity fade over up to 168 cycles) rather than the single-cell demonstrations common in this literature.',
      'A remaining-useful-life predictor trained on only the first 60% of each cell’s life, locating true end of life within 0.2 to 10.1 cycles.',
      'Follow-on work validating an adaptive unscented Kalman filter on drive cycles for joint SOC, internal resistance and SOH estimation in EV batteries.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita',
    funding: 'Unfunded research.',
    outputs: [
      { label: 'NSysS 2026 paper (under review)', href: '/publications/#nsyss2026-batterytwin' },
      { label: 'ECM: X journal version (submitted)', href: '/publications/#ecmx2026-battery-twin' },
      { label: 'ICREST 2027 UKF paper (submitted)', href: '/publications/#icrest2027-ukf-ev-battery' },
    ],
  },
  {
    id: 'gan-hemt-thermal-pinn',
    title: 'Physics-informed neural network for hot-spot estimation in GaN HEMTs',
    period: '2026',
    status: 'Submitted',
    area: 'Power electronics reliability',
    summary:
      'The hottest point in a GaN power transistor sits in a sub-micron region at the gate edge that no sensor can physically reach, yet it is what actually limits the device’s lifetime. This work recovers that internal temperature, and the unknown power producing it, from just a handful of surface readings, using a two-branch physics-informed neural network that represents each material layer separately and enforces the real interface physics between them exactly, rather than smoothing over it.',
    points: [
      'Two-branch network coupled by explicit flux-continuity and thermal-boundary-resistance conditions, so the 17.1 K temperature discontinuity at the GaN/SiC interface (a third of the total 51.4 K rise) is represented exactly instead of blurred out.',
      'An analytic Green’s-function term folded into the network’s ansatz that satisfies the isothermal baseplate condition exactly on its own, leaving the network to learn only the remainder.',
      'Because that analytic term carries the unknown power linearly, recovering the operating power from live sensor readings is a closed-form least-squares solve rather than an iterative fit: microseconds, not minutes.',
      'Validated against a verified nonlinear finite-volume reference: the peak temperature rise matches to within 2.62 K while evaluating the field about 166 times faster than the numerical solver.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita',
    funding: 'Unfunded research.',
    outputs: [{ label: 'ICECE 2026 paper (submitted)', href: '/publications/#icece2026-gan-hemt' }],
  },
  {
    id: 'digital-twin-staleness',
    title: 'Calibrated staleness detection for renewable-fleet digital twins',
    period: '2026',
    status: 'Under review',
    area: 'Digital twins',
    summary:
      'A digital twin of a renewable fleet drifts out of date as the physical fleet itself changes, and the real operational question is when to retrain it. Drift-detection methods usually get credited with firing earlier than a simple control-chart baseline, but those comparisons are almost always made at a single, unmatched alarm threshold, which quietly conflates how sensitive a detector is with how many false alarms it is allowed. This work re-runs that comparison properly: every detector calibrated to the same false-alarm budget first, using six years of real data across the German national solar fleet, then extended to sixteen European solar and wind fleets for the journal version.',
    points: [
      'A block-bootstrap calibration step that puts every drift detector on the same false-alarm footing before comparing detection speed, rather than comparing raw trigger times.',
      'Once calibrated, the commonly favored Page-Hinkley test’s reported edge over a plain rolling-RMSE chart mostly disappears: a bootstrap median lead of only minus 2 days, with a 95% interval spanning minus 25 to plus 42 days.',
      'Shows the Page-Hinkley statistic is algebraically identical to the one-sided CUSUM recursion, which explains why the two were never really competing methods to begin with.',
      'A two-factor study isolating that the retraining window, not which trigger you pick, is what actually determines whether recalibration pays off.',
    ],
    collaborators: 'Apurba Joty Roy, Abu Shufian, Raihan Chowdhury, Goro Fujita, Debashish Kumar Ghosh, Md. Sajid Hossain',
    funding: 'Unfunded research.',
    outputs: [
      { label: 'NSysS 2026 paper (under review)', href: '/publications/#nsyss2026-staleness' },
      { label: 'Next Sustainability journal paper (under review)', href: '/publications/#nextsust2026-staleness-journal' },
    ],
  },
  {
    id: 'atlas-robotics',
    title: 'ATLAS: modular multi-robot research assistant',
    period: '2026 to present',
    status: 'Phase 1, design and simulation',
    area: 'Robotics and embedded systems',
    summary:
      'A carrier robot that docks, transports, charges and redeploys two small agent robots, collects their results, re-plans when something fails, and tracks which conclusions depend on which evidence. Phase 1 is design and simulation from a single parameter file shared by MATLAB, FreeCAD and Python; every number is a proposed target, not a measured hardware result.',
    points: [
      'Drivetrain and energy sizing in MATLAB, a wheel-speed control loop in Simulink, and a docking state machine in Stateflow with eight scenario tests.',
      'Parametric FreeCAD model with automated interface checks that caught three geometry errors (wheel intrusion, short bays, a latch collision) before any part was printed.',
      'Dock contact heating modeled in MATLAB PDE Toolbox: a contaminated 200 mΩ contact reaches about 177 °C at 2 A, so the charge board measures contact drop and inhibits charging above about 100 mΩ.',
      'Evidence-aware re-planning in a Python fleet simulator: across 300 paired Monte-Carlo runs with sensor drift, wrong conclusions fell from 21% to 0% at about half the re-measurement cost of redoing everything.',
      'KiCad electronics and ESP32 firmware, with 33 automated tests.',
    ],
    collaborators: 'Personal project',
    funding: 'Self funded.',
    outputs: [{ label: 'ATLAS on GitHub', href: 'https://github.com/md-sazzad-eee/ATLAS' }],
  },
  {
    id: 'perovskite-tandem',
    title: 'Transport-layer optimization in perovskite tandem solar cells',
    period: '2025',
    status: 'Published',
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
    date: '2026-10-18',
    title: 'Six conference papers accepted for January 2027',
    body: 'Five papers accepted at the IEEE PES International Meeting 2027 in Beijing (10 to 13 January), covering digital twins for grid-forming inverters, DC-link and LCL inductor health, and cyber-physical attack detection in pipeline SCADA. A sixth, on stability-aware demand-side management for grid-forming inverters under EV charging, is accepted at IEEE ICICAIEECE 2027 in Kollam, India.',
  },
  {
    date: '2026-10-17',
    title: 'Two simulation datasets released on GitHub',
    body: 'Open datasets behind the SiC PV inverter thermal-history study and the photonic bond-health sensing study are now public on GitHub, with full parameter files and documentation.',
  },
  {
    date: '2026-10-15',
    title: 'New journal and conference submissions',
    body: 'Manuscripts submitted to Nature Communications, Energy Conversion and Management: X, ICREST 2027 (five papers) and IEEE TPEC 2027, alongside two further PES-IM papers under review.',
  },
  {
    date: '2026-06-29',
    title: 'Presented at IEEE TENSYMP 2026 in Penang',
    body: 'Presented the physics informed self calibrating digital twin with conformal uncertainty for multi inverter PV systems at the IEEE Region 10 Symposium.',
  },
  {
    date: '2026-02-01',
    title: 'Joined ReGED as a Research Assistant',
    body: 'Started as a Research Assistant at the Research Centre for Green Energy, Electro-Anatomy, and Digital Intelligence (ReGED), working on digital twins of PV inverters, grid-forming batteries and SiC power modules.',
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
