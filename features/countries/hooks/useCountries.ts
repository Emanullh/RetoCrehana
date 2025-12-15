import { GET_CONTINENTS, GET_COUNTRIES_LIST } from "@/lib/graphql/queries";
import {
  Continent,
  CountryFilters,
  CountryListItem,
  GetContinentsResponse,
  GetCountriesListResponse,
} from "@/lib/graphql/types";
import { useQuery } from "@apollo/client/react";
import { useCallback, useMemo, useState } from "react";

const DEBOUNCE_DELAY = 300;

export function useCountries() {
  const [filters, setFilters] = useState<CountryFilters>({
    search: "",
    continentCode: "",
    currency: "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: countriesData,
    loading: countriesLoading,
    error: countriesError,
    refetch: refetchCountries,
  } = useQuery<GetCountriesListResponse>(GET_COUNTRIES_LIST);

  const { data: continentsData } =
    useQuery<GetContinentsResponse>(GET_CONTINENTS);

  const uniqueCurrencies = useMemo(() => {
    if (!countriesData?.countries) return [];

    const currencySet = new Set<string>();
    countriesData.countries.forEach((country: CountryListItem) => {
      if (country.currency) {
        country.currency.split(",").forEach((c: string) => {
          currencySet.add(c.trim());
        });
      }
    });

    return Array.from(currencySet).sort();
  }, [countriesData]);

  const continents: Continent[] = useMemo(() => {
    return continentsData?.continents || [];
  }, [continentsData]);

  const filteredCountries = useMemo(() => {
    if (!countriesData?.countries) return [];

    return countriesData.countries.filter((country: CountryListItem) => {
      const searchMatch =
        !debouncedSearch ||
        country.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        country.code.toLowerCase().includes(debouncedSearch.toLowerCase());

      const continentMatch =
        !filters.continentCode ||
        country.continent.code === filters.continentCode;

      const currencyMatch =
        !filters.currency ||
        (country.currency && country.currency.includes(filters.currency));

      return searchMatch && continentMatch && currencyMatch;
    });
  }, [countriesData, debouncedSearch, filters.continentCode, filters.currency]);

  const handleSearchChange = useCallback((text: string) => {
    setFilters((prev) => ({ ...prev, search: text }));

    const timeoutId = setTimeout(() => {
      setDebouncedSearch(text);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleContinentChange = useCallback((continentCode: string) => {
    setFilters((prev) => ({ ...prev, continentCode }));
  }, []);

  const handleCurrencyChange = useCallback((currency: string) => {
    setFilters((prev) => ({ ...prev, currency }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ search: "", continentCode: "", currency: "" });
    setDebouncedSearch("");
  }, []);

  return {
    countries: filteredCountries,
    continents,
    currencies: uniqueCurrencies,
    filters,
    loading: countriesLoading,
    error: countriesError,
    handleSearchChange,
    handleContinentChange,
    handleCurrencyChange,
    clearFilters,
    refetch: refetchCountries,
  };
}
