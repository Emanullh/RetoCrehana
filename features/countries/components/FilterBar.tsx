import { FilterDropdown, SearchInput } from "@/components/ui";
import { Continent, CountryFilters } from "@/lib/graphql/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface FilterBarProps {
  filters: CountryFilters;
  continents: Continent[];
  currencies: string[];
  onSearchChange: (text: string) => void;
  onContinentChange: (code: string) => void;
  onCurrencyChange: (currency: string) => void;
  onClearFilters: () => void;
  resultCount: number;
}

export function FilterBar({
  filters,
  continents,
  currencies,
  onSearchChange,
  onContinentChange,
  onCurrencyChange,
  onClearFilters,
  resultCount,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.search || filters.continentCode || filters.currency;

  const continentOptions = continents.map((c) => ({
    value: c.code,
    label: c.name,
  }));

  const currencyOptions = currencies.map((c) => ({
    value: c,
    label: c,
  }));

  return (
    <View className="bg-gray-50 pt-4 pb-4">
      <View className="px-4 mb-4">
        <SearchInput
          value={filters.search}
          onChangeText={onSearchChange}
          placeholder="Buscar país..."
        />
      </View>

      <View className="flex-row px-4 gap-3">
        <FilterDropdown
          label="Continente"
          value={filters.continentCode}
          options={continentOptions}
          onValueChange={onContinentChange}
          placeholder="Todos"
        />
        <FilterDropdown
          label="Moneda"
          value={filters.currency}
          options={currencyOptions}
          onValueChange={onCurrencyChange}
          placeholder="Todas"
        />
      </View>

      <View className="flex-row items-center justify-between px-4 mt-4">
        <Text className="text-sm text-gray-500">
          {resultCount}{" "}
          {resultCount === 1 ? "país encontrado" : "países encontrados"}
        </Text>

        {hasActiveFilters && (
          <Pressable
            onPress={onClearFilters}
            className="flex-row items-center"
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Limpiar todos los filtros"
          >
            <Ionicons name="close-circle" size={16} color="#0EA5E9" />
            <Text className="text-sm font-medium text-primary-600 ml-1">
              Limpiar filtros
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
