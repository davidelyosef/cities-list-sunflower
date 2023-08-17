export interface Weather {
  Date: string;
  Day: DayTime;
  Link: string;
  Night: DayTime;
  Temperature: Temperature;
}

interface DayTime {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
}

interface Temperature {
  Minimum: ValueUnit;
  Maximum: ValueUnit;
}

interface ValueUnit {
  Unit: string;
  Value: number;
}