import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function FilterDropdown({
  label,
  value,
  options,
  onValueChange,
  placeholder = "Seleccionar",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption?.label || placeholder;

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <>
      <View className="flex-1">
        <Text className="text-xs font-medium text-gray-500 mb-1.5 ml-1">
          {label}
        </Text>
        <Pressable
          onPress={() => setIsOpen(true)}
          className="flex-row items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm shadow-black/5"
          accessibilityRole="button"
          accessibilityLabel={`Filtrar por ${label}`}
        >
          <Text
            className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}
            numberOfLines={1}
          >
            {displayText}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#94A3B8" />
        </Pressable>
      </View>

      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <SafeAreaView className="flex-1 bg-gray-50">
          <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
            <Pressable onPress={() => setIsOpen(false)} hitSlop={8}>
              <Text className="text-primary-600 text-base font-medium">
                Cancelar
              </Text>
            </Pressable>
            <Text className="text-lg font-semibold text-gray-900">{label}</Text>
            <Pressable
              onPress={() => handleSelect("")}
              hitSlop={8}
              accessibilityLabel="Limpiar selección"
            >
              <Text className="text-primary-600 text-base font-medium">
                Limpiar
              </Text>
            </Pressable>
          </View>

          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            contentContainerStyle={{ paddingVertical: 8 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item.value)}
                className={`flex-row items-center justify-between px-5 py-4 mx-4 my-1 rounded-xl ${
                  item.value === value
                    ? "bg-primary-50 border border-primary-200"
                    : "bg-white"
                }`}
              >
                <Text
                  className={`text-base ${
                    item.value === value
                      ? "text-primary-700 font-semibold"
                      : "text-gray-900"
                  }`}
                >
                  {item.label}
                </Text>
                {item.value === value && (
                  <Ionicons name="checkmark-circle" size={22} color="#0284C7" />
                )}
              </Pressable>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}
