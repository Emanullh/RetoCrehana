import { CountryListItem } from "@/lib/graphql/types";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface CountryCardProps {
  country: CountryListItem;
  onPress: () => void;
}

export function CountryCard({ country, onPress }: CountryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 mx-4 shadow-sm shadow-black/5 border border-gray-100 active:opacity-90 active:scale-[0.99]"
      accessibilityRole="button"
      accessibilityLabel={`País ${country.name}, código ${country.code}, continente ${country.continent.name}. Toca para ver detalles.`}
    >
      <View className="flex-row items-center">
        <View className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 items-center justify-center mr-4">
          <Text className="text-3xl">{country.emoji}</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text
              className="text-lg font-bold text-gray-900 flex-1"
              numberOfLines={1}
            >
              {country.name}
            </Text>
            <View className="bg-primary-100 px-2 py-0.5 rounded-md ml-2">
              <Text className="text-xs font-semibold text-primary-700">
                {country.code}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="earth" size={14} color="#64748B" />
            <Text className="text-sm text-gray-500 ml-1.5">
              {country.continent.name}
            </Text>
          </View>

          {country.currency && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="cash-outline" size={14} color="#64748B" />
              <Text className="text-sm text-gray-500 ml-1.5" numberOfLines={1}>
                {country.currency}
              </Text>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
      </View>
    </Pressable>
  );
}
