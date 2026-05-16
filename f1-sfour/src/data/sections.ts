export type ScrollPhase = {
  scrollStart: number;
  scrollEnd: number;
  headline: string;
  subheadline: string;
  paragraph: string;
  alignment: 'left' | 'right' | 'center';
  accentWordIndex?: number;
  accentColor?: string;
};

export type SectionData = {
  id: string;
  frameCount: number;
  framesPath: string;
  stickyHeight: string;
  accentLabel: string;
  systemLabel?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  sideRailItems: string[];
  phases: ScrollPhase[];
};

export const SECTIONS: SectionData[] = [
  {
    id: 'hero',
    frameCount: 106,
    framesPath: '/frames/section1',
    stickyHeight: '500vh',
    accentLabel: '01 / PRESENCE',
    systemLabel: 'SYSTEM ACTIVE',
    heroTitle: 'FERRARI',
    heroSubtitle: 'ENGINEERED FOR SPEED',
    sideRailItems: [],
    phases: [
      {
        scrollStart: 0,
        scrollEnd: 0.3,
        alignment: 'center',
        headline: '',
        subheadline: '',
        paragraph: '',
      },
      {
        scrollStart: 0.3,
        scrollEnd: 0.72,
        alignment: 'left',
        subheadline: 'The Machine Beneath the Speed',
        headline: 'Built for one\nmoment.',
        paragraph:
          'Every component exists for a single purpose — the corner ahead. Weight stripped to nothing. Power concentrated into fractions of a second.',
      },
      {
        scrollStart: 0.72,
        scrollEnd: 1.0,
        alignment: 'right',
        subheadline: 'It Is the Architecture',
        headline: 'Speed is not\na feature.',
        paragraph:
          'The chassis is a philosophy. The powertrain is a statement. Together they define a vehicle that exists only at the edge of what physics will allow.',
      },
    ],
  },
  {
    id: 'aero',
    frameCount: 91,
    framesPath: '/frames/section2',
    stickyHeight: '500vh',
    accentLabel: '02 — THE DRIVER',
    sideRailItems: [
      'HAND DEVICE',
      'HALO SYSTEM',
      'FIREPROOF SUIT',
      '5-POINT HARNESS',
    ],
    phases: [
      {
        scrollStart: 0,
        scrollEnd: 0.28,
        alignment: 'left',
        subheadline: 'INSIDE THE COCKPIT',
        headline: 'HUMAN.\nMACHINE.\nONE.',
        paragraph:
          'The helmet is the last barrier between a human and 300 km/h. Instinct and engineering converge.',
        accentWordIndex: 2,
        accentColor: '#E8002D',
      },
      {
        scrollStart: 0.28,
        scrollEnd: 0.7,
        alignment: 'left',
        subheadline: 'DRIVER INTERFACE',
        headline: 'Every input\nis a decision.',
        paragraph:
          'Six hundred inputs per lap. No room for error. The driver and car are a single system operating at the limit.',
      },
      {
        scrollStart: 0.7,
        scrollEnd: 1.0,
        alignment: 'right',
        subheadline: 'REFLEX AND REASON',
        headline: 'The fastest\nthought wins.',
        paragraph:
          'Reaction time under 200ms. G-forces beyond 5 lateral. The cockpit is the most demanding office on Earth.',
      },
    ],
  },
  {
    id: 'apex',
    frameCount: 106,
    framesPath: '/frames/section3',
    stickyHeight: '500vh',
    accentLabel: '03 — THE LIVERY',
    sideRailItems: ['T300 PREPREG', '7-PLY LAYUP', 'AUTOCLAVE CURE'],
    phases: [
      {
        scrollStart: 0,
        scrollEnd: 0.3,
        alignment: 'center',
        subheadline: 'CARBON CONSTRUCTION',
        headline: 'CARBON.\nCOLOUR.\nSPEED.',
        paragraph:
          'Every graphic slash is a declaration. Aggression made visual at 340 km/h.',
        accentWordIndex: 1,
        accentColor: '#F5C518',
      },
      {
        scrollStart: 0.3,
        scrollEnd: 0.72,
        alignment: 'left',
        subheadline: 'THE SURFACE',
        headline: 'Painted at\n340 km/h.',
        paragraph:
          'The livery is not decoration. It is aerodynamic continuity made visible — a graphic record of the airflow that defines the machine.',
      },
      {
        scrollStart: 0.72,
        scrollEnd: 1.0,
        alignment: 'right',
        subheadline: 'IDENTITY IN MOTION',
        headline: 'The fastest\ncolour on track.',
        paragraph:
          'Twelve layers of paint. Zero grams of waste. Every millimetre of surface chosen for what it communicates at full speed.',
      },
    ],
  },
];
