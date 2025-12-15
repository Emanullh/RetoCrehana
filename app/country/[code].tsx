import { ErrorView, LoadingSpinner } from "@/components/ui";
import { useCountryDetails } from "@/features/countries/hooks";
import { HLSPlayer } from "@/features/video-player/components";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

interface DetailRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | null | undefined;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  if (!value) return null;

  return (
    <View className="flex-row items-start py-3 border-b border-gray-100">
      <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#0284C7" />
      </View>
      <View className="flex-1">
        <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
          {label}
        </Text>
        <Text className="text-base text-gray-900">{value}</Text>
      </View>
    </View>
  );
}

export default function CountryDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const { country, loading, error, refetch } = useCountryDetails(code || "");

  if (loading) {
    return <LoadingSpinner message="Cargando información del país..." />;
  }

  if (error || !country) {
    return (
      <ErrorView
        title="País no encontrado"
        message="No pudimos cargar la información de este país."
        onRetry={refetch}
      />
    );
  }

  const languagesList = country.languages.map((l) => l.name).join(", ");

  return (
    <>
      <Stack.Screen
        options={{
          title: country.name,
          headerBackTitle: "Países",
        }}
      />

      <ScrollView
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center py-8 bg-white border-b border-gray-100">
          <View className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center mb-4 shadow-lg shadow-primary-200/50">
            <Text className="text-6xl">{country.emoji}</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 text-center px-4">
            {country.name}
          </Text>
          {country.native && country.native !== country.name && (
            <Text className="text-base text-gray-500 mt-1">
              {country.native}
            </Text>
          )}
          <View className="bg-primary-100 px-3 py-1 rounded-full mt-3">
            <Text className="text-sm font-semibold text-primary-700">
              {country.code}
            </Text>
          </View>
        </View>

        <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm shadow-black/5">
          <Text className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Información General
          </Text>

          <DetailRow icon="business" label="Capital" value={country.capital} />
          <DetailRow
            icon="earth"
            label="Continente"
            value={country.continent.name}
          />
          <DetailRow icon="cash" label="Moneda" value={country.currency} />
          <DetailRow
            icon="language"
            label={country.languages.length > 1 ? "Idiomas" : "Idioma"}
            value={languagesList}
          />

          {country.states && country.states.length > 0 && (
            <View className="flex-row items-start py-3">
              <View className="w-10 h-10 rounded-xl bg-primary-50 items-center justify-center mr-4">
                <Ionicons name="map" size={20} color="#0284C7" />
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  Divisiones administrativas
                </Text>
                <Text className="text-base text-gray-900">
                  {country.states.length} estados/regiones
                </Text>
              </View>
            </View>
          )}
        </View>

        <View className="mt-4">
          <HLSPlayer
            title={`Video cultural - ${country.name}`}
            source="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          />
        </View>
      </ScrollView>
    </>
  );
}
