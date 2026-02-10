export interface StatesAndCities {
  country: string;
  states: State[];
}

export interface State {
  cities: City[];
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
}