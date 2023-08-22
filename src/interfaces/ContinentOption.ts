import {Continent} from "../enums/Continent";

export interface ContinentOption {
  value: Continent | "",
  label: Continent | "All continents"
}