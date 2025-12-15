// Tipos TypeScript para la API GraphQL de países

export interface Continent {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
  native: string;
}

export interface State {
  code: string | null;
  name: string;
}

export interface CountryListItem {
  code: string;
  name: string;
  emoji: string;
  continent: Continent;
  currency: string | null;
}

export interface CountryDetails {
  code: string;
  name: string;
  native: string;
  capital: string | null;
  emoji: string;
  currency: string | null;
  languages: Language[];
  continent: Continent;
  states: State[];
}

export interface GetCountriesListResponse {
  countries: CountryListItem[];
}

export interface GetCountryDetailsResponse {
  country: CountryDetails | null;
}

export interface GetContinentsResponse {
  continents: Continent[];
}

// Tipos para filtros
export interface CountryFilters {
  search: string;
  continentCode: string;
  currency: string;
}
