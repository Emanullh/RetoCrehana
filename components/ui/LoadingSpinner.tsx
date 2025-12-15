import { ActivityIndicator, Text, View } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
}

export function LoadingSpinner({
  message = "Cargando...",
  size = "large",
}: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <ActivityIndicator size={size} color="#0EA5E9" />
      {message && (
        <Text className="text-gray-500 mt-4 text-base">{message}</Text>
      )}
    </View>
  );
}
