export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
  sections: Array<{
    heading: string;
    body: string;
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "best-trucking-companies-midwest",
    title: "Best Trucking Companies in the Midwest: What to Look For",
    description:
      "How experienced CDL-A drivers can compare Midwest trucking companies by pay, freight, equipment, dispatch, home time, and respect.",
    category: "Carrier comparison",
    readingMinutes: 5,
    sections: [
      {
        heading: "Start with the freight network",
        body: "A good Midwest carrier should be able to explain where the freight runs, how loads are planned, and what kind of miles drivers can expect during normal weeks.",
      },
      {
        heading: "Compare the full package",
        body: "Weekly gross pay matters, but equipment age, dispatch quality, weekend planning, detention habits, and home-time consistency decide whether a job works long term.",
      },
      {
        heading: "Ask direct questions",
        body: "Before switching, ask what a strong driver earns, how often weekend home time misses, who handles problems after hours, and what equipment you will actually drive.",
      },
    ],
  },
  {
    slug: "cdl-a-driver-salary-illinois-2026",
    title: "CDL-A Driver Salary in Illinois: 2026 Pay Guide",
    description:
      "A practical Illinois CDL-A driver pay guide covering weekly gross pay, miles, equipment, home time, and questions drivers should ask before switching carriers.",
    category: "Driver pay",
    readingMinutes: 5,
    sections: [
      {
        heading: "Look at weekly gross, not only CPM",
        body: "A higher rate only helps when the carrier also has consistent miles, clean planning, and enough freight density near your home market.",
      },
      {
        heading: "Illinois drivers have Midwest options",
        body: "Plainfield, Bolingbrook, and the Chicago-area freight market can support regional dry van work without forcing every driver into coast-to-coast lanes.",
      },
      {
        heading: "Verify the pay story",
        body: "Ask for realistic high, average, and low weeks. Strong carriers can explain what separates a top week from a normal one.",
      },
    ],
  },
  {
    slug: "home-time-policy-real-vs-promise",
    title: "Home Time Policies: How to Spot the Real vs. the Promise",
    description:
      "How CDL-A drivers can evaluate home time policies and ask better questions before choosing a trucking company.",
    category: "Home time",
    readingMinutes: 4,
    sections: [
      {
        heading: "Ask what happens on a bad week",
        body: "Every carrier can describe the plan. The useful answer is how they recover when freight, weather, equipment, or customer timing gets messy.",
      },
      {
        heading: "Look for lane discipline",
        body: "Predictable home time usually comes from freight density and dispatch discipline, not from a slogan on a recruiting page.",
      },
      {
        heading: "Get the details before orientation",
        body: "Confirm reset expectations, weekend timing, freight regions, and who makes the call when a driver is running late toward home.",
      },
    ],
  },
  {
    slug: "midwest-otr-routes-regional-vs-coast-to-coast",
    title: "Midwest OTR Routes: Why Regional Focus Beats Coast-to-Coast",
    description:
      "Why many CDL-A drivers prefer Midwest regional routes over coast-to-coast trucking when they want miles, home time, and fewer surprises.",
    category: "Routes",
    readingMinutes: 4,
    sections: [
      {
        heading: "Regional does not have to mean short miles",
        body: "Dense Midwest freight can keep a driver moving while reducing the long deadhead, timing risk, and home-time uncertainty of coast-to-coast work.",
      },
      {
        heading: "Dispatch gets more practical",
        body: "When planners know the lanes and customers, they can build weeks that make sense instead of chasing random freight across the map.",
      },
      {
        heading: "The right fit depends on priorities",
        body: "Drivers who want predictable weekends and steady pay should compare lane design as closely as they compare equipment and CPM.",
      },
    ],
  },
  {
    slug: "midwest-regional-lanes-home-time",
    title: "How Midwest Regional Lanes Help Drivers Get Predictable Home Time",
    description:
      "Why Midwest regional truck driving lanes can support strong weekday miles and more predictable weekend home time for CDL-A drivers.",
    category: "Routes",
    readingMinutes: 4,
    sections: [
      {
        heading: "Freight density creates options",
        body: "A carrier with steady Midwest freight has more ways to recover a schedule and route a driver back toward home before the weekend.",
      },
      {
        heading: "Predictability comes from planning",
        body: "The difference is not a single lane. It is the combination of customers, dispatch habits, equipment readiness, and realistic transit planning.",
      },
      {
        heading: "Drivers should ask for examples",
        body: "Ask what a normal week looks like from your home market and how often drivers in that area miss the planned weekend window.",
      },
    ],
  },
  {
    slug: "new-truck-amenities-2023-freightliner",
    title: "New Truck Amenities: What 2023+ Freightliners Actually Include",
    description:
      "A quick guide to newer Freightliner truck amenities CDL-A drivers should ask about, from automatic transmissions to comfort and storage.",
    category: "Equipment",
    readingMinutes: 4,
    sections: [
      {
        heading: "Comfort affects retention",
        body: "A clean newer truck matters because the cab is where a driver works, rests, stores gear, and spends long stretches between home time.",
      },
      {
        heading: "Ask about the assigned truck",
        body: "Confirm model year, transmission, safety technology, storage, inverter policy, fridge expectations, camera setup, and maintenance support.",
      },
      {
        heading: "Equipment should match the job",
        body: "Regional dry van work needs dependable tractors, clean trailers, and a maintenance process that keeps preventable downtime low.",
      },
    ],
  },
  {
    slug: "outward-only-vs-inward-facing-cameras",
    title: "Outward-Only vs. Inward-Facing Cameras: What Drivers Need to Know",
    description:
      "A driver-focused explanation of outward-only and inward-facing truck cameras, including what to ask before choosing a carrier.",
    category: "Equipment",
    readingMinutes: 4,
    sections: [
      {
        heading: "Know what the camera records",
        body: "Drivers should understand whether cameras face the road, the cab, or both, and when footage is reviewed.",
      },
      {
        heading: "Policy matters more than hardware",
        body: "Ask how events are triggered, who can see footage, how long it is retained, and how coaching or discipline decisions are made.",
      },
      {
        heading: "Get clear answers up front",
        body: "A straightforward carrier can explain camera use without making drivers guess after they arrive at orientation.",
      },
    ],
  },
  {
    slug: "pet-friendly-trucking-company-policies",
    title: "Pet-Friendly Trucking Companies: The Real Pet Policies",
    description:
      "A short guide to pet-friendly trucking policies and the questions CDL-A drivers should ask before bringing a pet on the road.",
    category: "Driver life",
    readingMinutes: 3,
    sections: [
      {
        heading: "Pet-friendly still has rules",
        body: "Drivers should ask about fees, size limits, truck cleanliness expectations, customer-site restrictions, and what happens during maintenance or shop time.",
      },
      {
        heading: "Plan for real operating days",
        body: "A policy that sounds easy during recruiting still needs to work during tight appointments, weather delays, breakdowns, and weekend resets.",
      },
      {
        heading: "Protect the opportunity",
        body: "Good policies depend on drivers keeping equipment clean, protecting customer property, and communicating when a situation needs support.",
      },
    ],
  },
  {
    slug: "switching-trucking-companies-cdla-guide",
    title: "Switching Carriers: A Step-by-Step Guide for CDL-A Drivers",
    description:
      "A practical checklist for CDL-A drivers switching trucking companies without creating avoidable gaps, pay surprises, or paperwork problems.",
    category: "Career moves",
    readingMinutes: 5,
    sections: [
      {
        heading: "Do the math before giving notice",
        body: "Compare pay, miles, benefits, home time, equipment, and orientation timing so the move improves the whole job, not just one number.",
      },
      {
        heading: "Keep paperwork clean",
        body: "Have license, medical card, work history, endorsements, violation history, and references ready before the application starts.",
      },
      {
        heading: "Protect your timeline",
        body: "Ask when orientation starts, when equipment is assigned, how first dispatch works, and what could delay the first full week of pay.",
      },
    ],
  },
  {
    slug: "trucking-company-orientation-what-to-expect",
    title: "What to Expect at Trucking Company Orientation",
    description:
      "What CDL-A drivers should expect during trucking company orientation, from paperwork and safety review to equipment assignment and first dispatch.",
    category: "Orientation",
    readingMinutes: 4,
    sections: [
      {
        heading: "Orientation should confirm the job",
        body: "Drivers should leave orientation with clear expectations on pay, lanes, equipment, safety rules, home time, and support contacts.",
      },
      {
        heading: "Bring complete documentation",
        body: "Missing paperwork can delay equipment assignment, payroll setup, and first dispatch. Bring the documents recruiting requests.",
      },
      {
        heading: "Ask about first dispatch",
        body: "The first load sets the tone. Ask who your dispatcher is, how communication works, and what to do if a load plan changes.",
      },
    ],
  },
];
