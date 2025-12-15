import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm shadow-black/5 border border-gray-100">
      <Ionicons name="search" size={20} color="#94A3B8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        className="flex-1 ml-3 text-base text-gray-900"
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Campo de búsqueda"
        accessibilityHint="Escribe para buscar países por nombre"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText("")}
          hitSlop={8}
          accessibilityLabel="Limpiar búsqueda"
        >
          <Ionicons name="close-circle" size={20} color="#94A3B8" />
        </Pressable>
      )}
    </View>
  );
}
