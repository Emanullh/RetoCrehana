import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({
  title = "Algo salió mal",
  message = "No pudimos cargar la información. Por favor, intenta de nuevo.",
  onRetry,
}: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-20 h-20 rounded-full bg-red-100 items-center justify-center mb-6">
        <Ionicons name="alert-circle" size={40} color="#EF4444" />
      </View>

      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </Text>

      <Text className="text-base text-gray-500 text-center mb-6">
        {message}
      </Text>

      {onRetry && (
        <Pressable
          onPress={onRetry}
          className="bg-primary-600 px-8 py-3 rounded-xl active:bg-primary-700"
          accessibilityRole="button"
          accessibilityLabel="Reintentar"
        >
          <Text className="text-white font-semibold text-base">Reintentar</Text>
        </Pressable>
      )}
    </View>
  );
}
