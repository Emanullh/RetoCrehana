import { GET_COUNTRY_DETAILS } from "@/lib/graphql/queries";
import { CountryDetails, GetCountryDetailsResponse } from "@/lib/graphql/types";
import { useQuery } from "@apollo/client/react";

interface UseCountryDetailsResult {
  country: CountryDetails | null;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useCountryDetails(code: string): UseCountryDetailsResult {
  const { data, loading, error, refetch } = useQuery<GetCountryDetailsResponse>(
    GET_COUNTRY_DETAILS,
    {
      variables: { code },
      skip: !code,
      fetchPolicy: "cache-first",
    }
  );

  return {
    country: data?.country || null,
    loading,
    error: error as Error | undefined,
    refetch,
  };
}
