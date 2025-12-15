import { gql } from "@apollo/client";

// Query para obtener la lista de países (ligera)
export const GET_COUNTRIES_LIST = gql`
  query GetCountriesList {
    countries {
      code
      name
      emoji
      continent {
        code
        name
      }
      currency
    }
  }
`;

// Query para obtener los detalles de un país específico
export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      code
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
        native
      }
      continent {
        code
        name
      }
      states {
        code
        name
      }
    }
  }
`;

// Query para obtener continentes (para el filtro)
export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;
