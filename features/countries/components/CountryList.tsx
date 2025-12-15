import { EmptyState, ErrorView, LoadingSpinner } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { View } from "react-native";
import { useCountries } from "../hooks";
import { CountryCard } from "./CountryCard";
import { FilterBar } from "./FilterBar";

export function CountryList() {
  const {
    countries,
    continents,
    currencies,
    filters,
    loading,
    error,
    handleSearchChange,
    handleContinentChange,
    handleCurrencyChange,
    clearFilters,
    refetch,
  } = useCountries();

  const handleCountryPress = (countryCode: string) => {
    router.push(`/country/${countryCode}`);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando países..." />;
  }

  if (error) {
    return (
      <ErrorView
        title="Error al cargar países"
        message={error.message || "Por favor, verifica tu conexión a internet."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1">
      <FlashList
        data={countries}
        keyExtractor={(item) => item.code}
        ListHeaderComponent={
          <FilterBar
            filters={filters}
            continents={continents}
            currencies={currencies}
            onSearchChange={handleSearchChange}
            onContinentChange={handleContinentChange}
            onCurrencyChange={handleCurrencyChange}
            onClearFilters={clearFilters}
            resultCount={countries.length}
          />
        }
        ListEmptyComponent={
          <EmptyState
            icon="earth"
            title="Sin resultados"
            message="No se encontraron países con los filtros aplicados."
            actionLabel="Limpiar filtros"
            onAction={clearFilters}
          />
        }
        renderItem={({ item }) => (
          <CountryCard
            country={item}
            onPress={() => handleCountryPress(item.code)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
