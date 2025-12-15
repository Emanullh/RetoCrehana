import { forwardRef } from "react";
import { Pressable, View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  onPress?: () => void;
  variant?: "elevated" | "outlined" | "filled";
}

export const Card = forwardRef<View, CardProps>(
  (
    { children, className = "", onPress, variant = "elevated", ...props },
    ref
  ) => {
    const baseStyles = "rounded-2xl overflow-hidden";

    const variantStyles = {
      elevated: "bg-white shadow-lg shadow-black/10",
      outlined: "bg-white border border-gray-200",
      filled: "bg-gray-50",
    };

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    if (onPress) {
      return (
        <Pressable
          onPress={onPress}
          className={`${combinedStyles} active:opacity-80 active:scale-[0.98]`}
          style={{ transform: [{ scale: 1 }] }}
          accessibilityRole="button"
          {...props}
        >
          {children}
        </Pressable>
      );
    }

    return (
      <View ref={ref} className={combinedStyles} {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = "Card";
