import { CommunityPost, CommunityComment } from '../types';

const SAMPLE_VEHICLES = [
  '2021 BMW M340i xDrive',
  '2019 Toyota RAV4 Hybrid',
  '2020 Audi S5 Sportback',
  '2018 Ford F-150 EcoBoost',
  '2022 Porsche Macan GTS',
  '2017 Honda Civic Si',
  '2020 Subaru Outback 2.5i',
  '2021 Mercedes-Benz E350'
];

const MASTER_TECHS = [
  { name: 'Sarah Chen', badge: 'ASE Master Diagnostic Tech', email: 's.chen@apexautocare.com' },
  { name: 'Marcus Vance', badge: 'Lead Powertrain Specialist', email: 'm.vance@apexautocare.com' },
  { name: 'David Miller', badge: 'Chassis & Alignment Director', email: 'd.miller@apexautocare.com' }
];

export async function fetchCommunityDiagnosticLogs(): Promise<CommunityPost[]> {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=6'),
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=20')
    ]);

    if (!postsRes.ok || !commentsRes.ok) {
      throw new Error('Failed to fetch from JSONPlaceholder');
    }

    const posts = await postsRes.json();
    const comments: Array<{ postId: number; id: number; name: string; email: string; body: string }> = await commentsRes.json();

    const curatedCategories = [
      'CAN-Bus Diagnostics',
      'Ceramic Brake Calibration',
      'Turbocharger Boost Leak',
      '4-Wheel Laser Alignment',
      'Cold Weather AGM Battery',
      'Differential Fluid Service'
    ];

    const curatedTitles = [
      'Intermittent P0300 Random Misfire under high engine load solved',
      'Ceramic pad bedding and front rotor runout elimination report',
      'Boost deviation fault trace & charge pipe replacement breakdown',
      'High-speed steering tremor cured via 4-wheel road force calibration',
      'Sub-zero cold crank voltage drop testing and AGM battery upgrade',
      'Synthetic transaxle fluid exchange & magnetic plug wear inspection'
    ];

    return posts.map((post: { id: number; title: string; body: string }, index: number) => {
      const postComments = comments
        .filter((c) => c.postId === post.id)
        .slice(0, 3)
        .map((c, cIdx) => {
          const tech = MASTER_TECHS[cIdx % MASTER_TECHS.length];
          return {
            id: c.id,
            postId: post.id,
            name: cIdx === 0 ? tech.name : c.name.split(' ')[0] + ' ' + (c.name.split(' ')[1]?.[0] || 'D') + '.',
            email: cIdx === 0 ? tech.email : c.email,
            body: cIdx === 0 
              ? `Master Tech Note: Inspected freeze-frame data, confirmed proper harness continuity, and completed 15-mile road test verifying 0 misfire counts.`
              : c.body.slice(0, 140) + '...',
            isMasterTech: cIdx === 0,
            badge: cIdx === 0 ? tech.badge : undefined
          };
        });

      return {
        id: post.id,
        title: curatedTitles[index % curatedTitles.length],
        body: post.body,
        author: postComments[1]?.name || 'Verified Customer',
        vehicleModel: SAMPLE_VEHICLES[index % SAMPLE_VEHICLES.length],
        serviceCategory: curatedCategories[index % curatedCategories.length],
        mileage: 42000 + index * 12500,
        verifiedRepair: true,
        repliesCount: postComments.length,
        solved: true,
        date: `2026-11-0${index + 2}`,
        comments: postComments
      };
    });
  } catch (error) {
    console.warn('Using fallback data for community logs:', error);
    return getFallbackCommunityLogs();
  }
}

function getFallbackCommunityLogs(): CommunityPost[] {
  return [
    {
      id: 1,
      title: 'Intermittent P0300 Random Misfire under high load resolved',
      body: 'Brought in my 2021 BMW M340i after two other shops guessed coils. Apex connected their oscilloscope, traced a hairline carbon track on cylinder 4 insulator, and resolved the idle stumble completely.',
      author: 'Julian Thorne',
      vehicleModel: '2021 BMW M340i xDrive',
      serviceCategory: 'CAN-Bus Diagnostics',
      mileage: 48500,
      verifiedRepair: true,
      repliesCount: 2,
      solved: true,
      date: '2026-11-08',
      comments: [
        {
          id: 101,
          postId: 1,
          name: 'Sarah Chen',
          email: 's.chen@apexautocare.com',
          body: 'Master Tech Note: Monitored live DME cylinder roughness counts and fuel trims. New spark plugs torqued to 23 Nm factory spec. Running smooth.',
          isMasterTech: true,
          badge: 'ASE Master Diagnostic Tech'
        }
      ]
    },
    {
      id: 2,
      title: 'Brake squeal eliminated with ceramic pads and rotor resurfacing',
      body: 'Noticeable grinding noise coming from the front right wheel on cold mornings. Apex measured rotor runout with digital micrometer and performed full ceramic brake service.',
      author: 'Elena Rostova',
      vehicleModel: '2020 Audi S5 Sportback',
      serviceCategory: 'Ceramic Brake Calibration',
      mileage: 62100,
      verifiedRepair: true,
      repliesCount: 1,
      solved: true,
      date: '2026-11-07',
      comments: [
        {
          id: 102,
          postId: 2,
          name: 'Marcus Vance',
          email: 'm.vance@apexautocare.com',
          body: 'Master Tech Note: Rotors measured 31.8mm (discard spec 30.0mm). Caliper slide pins cleaned, lubricated with high-temp ceramic grease.',
          isMasterTech: true,
          badge: 'Lead Powertrain Specialist'
        }
      ]
    }
  ];
}
