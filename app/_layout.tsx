import { useColorScheme } from "@/hooks/use-color-scheme";
import { apolloClient } from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client/react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#0F172A" : "#F8FAFC",
            },
            headerTintColor: colorScheme === "dark" ? "#F8FAFC" : "#0F172A",
            headerTitleStyle: {
              fontWeight: "600",
            },
            headerBackTitle: "Atrás",
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#0F172A" : "#F8FAFC",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "🌍 Países del Mundo",
              headerSearchBarOptions: undefined,
            }}
          />
          <Stack.Screen
            name="country/[code]"
            options={{
              title: "Detalle del País",
              headerBackTitle: "Países",
            }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
