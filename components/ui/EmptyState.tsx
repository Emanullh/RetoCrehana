import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = "search",
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-6">
        <Ionicons name={icon} size={36} color="#94A3B8" />
      </View>

      <Text className="text-xl font-bold text-gray-900 text-center mb-2">
        {title}
      </Text>

      <Text className="text-base text-gray-500 text-center mb-6">
        {message}
      </Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="border-2 border-primary-600 px-8 py-3 rounded-xl active:bg-primary-50"
          accessibilityRole="button"
        >
          <Text className="text-primary-600 font-semibold text-base">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
