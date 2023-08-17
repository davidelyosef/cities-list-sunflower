import {Continent} from "../enums/Continent";

export interface City {
  name: string;
  continent: Continent | string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: Coords;
}

export interface Coords {
  lat: number;
  lng: number;
}