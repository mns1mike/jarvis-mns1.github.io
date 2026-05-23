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
    description: `CDL-A regional truck driver jobs near ${city} with MNS1 Express. Home weekends, Midwest dry van freight, newer Freightliners, and top weekly pay.`,
  };
};

export const jobMarkets: JobMarket[] = [
  market("Bolingbrook", "IL", "Illinois"),
  market("Cedar Rapids", "IA", "Iowa"),
  market("Chippewa Falls", "WI", "Wisconsin"),
  market("Des Moines", "IA", "Iowa"),
  market("Green Bay", "WI", "Wisconsin"),
  market("Indianapolis", "IN", "Indiana"),
  market("Kansas City", "KS", "Kansas"),
  market("Kansas City", "MO", "Missouri"),
  market("Louisville", "KY", "Kentucky"),
  market("Milwaukee", "WI", "Wisconsin"),
  market("Minneapolis", "MN", "Minnesota"),
  market("Omaha", "NE", "Nebraska"),
  market("Plainfield", "IL", "Illinois"),
  market("St. Louis", "MO", "Missouri"),
  market("Toledo", "OH", "Ohio"),
];

export const driverBenefits = [
  "Top drivers average $1,650-$1,900+ gross per week",
  "Midwest regional dry van freight",
  "Home weekends on practical lanes",
  "2023 or newer Freightliner Cascadias",
  "Weekly direct deposit and per diem advantage",
  "Dispatcher support from a family-owned carrier",
];
