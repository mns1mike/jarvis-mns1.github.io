export type JobMarket = {
  slug: string;
  city: string;
  state: string;
  stateName: string;
  title: string;
  headline: string;
  description: string;
};

const market = (city: string, state: string, stateName: string): JobMarket => {
  const cityState = `${city}, ${state}`;
  return {
    slug: `cdl-a-driver-${city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")}-${state.toLowerCase()}`,
    city,
    state,
    stateName,
    title: `CDL-A Driver Jobs in ${cityState} | MNS1 Express`,
    headline: `Regional Truck Driving Jobs Near ${city}`,
    description: `MNS1 Express is hiring experienced CDL-A regional truck drivers near ${city} for dry van, no-touch Midwest freight. Run strong miles Monday through Friday and be home every weekend.`,
  };
};

export const jobMarkets: JobMarket[] = [
  market("Bolingbrook", "IL", "Illinois"),
  market("Cedar Rapids", "IA", "Iowa"),
  market("Chippewa Falls", "WI", "Wisconsin"),
  market("Des Moines", "IA", "Iowa"),
  market("Green Bay", "WI", "Wisconsin"),
  market("Indianapolis", "IN", "Indiana"),
  market("Louisville", "KY", "Kentucky"),
  market("Milwaukee", "WI", "Wisconsin"),
  market("Minneapolis", "MN", "Minnesota"),
  market("Plainfield", "IL", "Illinois"),
  market("St. Louis", "MO", "Missouri"),
  market("Toledo", "OH", "Ohio"),
  market("Kansas City", "KS", "Kansas"),
  market("Omaha", "NE", "Nebraska"),
];

export const driverBenefits = [
  "Top 25% drivers average $1,650-$1,900+ gross per week",
  "2,500-3,000 miles per week",
  "Home every weekend",
  "Dry van only, no-touch freight",
  "Some drop and hook freight",
  "2023 or newer Freightliners",
];

export const equipmentSummary =
  "2023 or newer Freightliners with eAPU, inverter, refrigerator, microwave, double-bunk sleeper, Bluetooth, SiriusXM radio, and 70 MPH speed limiters.";

export const benefitsSummary =
  "Medical, dental, vision, company-paid life insurance, supplemental options, PTO, paid holidays, 401(k) with match, and Employee Assistance Program.";

export const perksSummary =
  "Pet and passenger program, $1,500 OTR referral bonus, detention, layover and breakdown pay, fuel cards, cash advances, EFS checks, 24/7 dispatch and roadside assistance.";

export const requirementSummary = [
  "Valid CDL-A license",
  "At least 2 years of commercial driving experience",
  "1 year recent, verifiable CDL-A OTR experience",
  "Must be 25 years of age or older",
  "Must meet FMCSA requirements",
];
