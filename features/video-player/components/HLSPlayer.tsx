import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

const DEFAULT_HLS_URL = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

interface HLSPlayerProps {
  source?: string;
  title?: string;
}

export function HLSPlayer({
  source = DEFAULT_HLS_URL,
  title = "Video de demostración",
}: HLSPlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.muted = false;
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        try {
          if (player) {
            player.pause();
          }
        } catch {}
      };
    }, [player])
  );

  useEffect(() => {
    if (!player) return;

    const statusSubscription = player.addListener("statusChange", (event) => {
      if (event.status === "readyToPlay") {
        setIsLoading(false);
        setError(null);
      } else if (event.status === "loading") {
        setIsLoading(true);
      } else if (event.status === "error") {
        setIsLoading(false);
        setError("Error al cargar el video");
      }
    });

    return () => {
      statusSubscription.remove();
    };
  }, [player]);

  const handleRetry = () => {
    if (player) {
      setError(null);
      setIsLoading(true);
      player.replace(source);
    }
  };

  const { width } = Dimensions.get("window");
  const videoHeight = (width - 32) * (9 / 16);

  return (
    <View className="mx-4 my-4">
      <View className="flex-row items-center mb-3">
        <Ionicons name="videocam" size={20} color="#0EA5E9" />
        <Text className="text-base font-semibold text-gray-800 ml-2">
          {title}
        </Text>
      </View>

      <View
        className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
        style={{ height: videoHeight }}
      >
        {error ? (
          <View className="flex-1 items-center justify-center px-6">
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
            <Text className="text-white text-center mt-4 mb-4">{error}</Text>
            <Pressable
              onPress={handleRetry}
              className="bg-primary-600 px-6 py-2 rounded-lg active:bg-primary-700"
            >
              <Text className="text-white font-medium">Reintentar</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <VideoView
              player={player}
              style={{ flex: 1 }}
              contentFit="contain"
              nativeControls
              allowsFullscreen
              allowsPictureInPicture
            />

            {isLoading && (
              <View className="absolute inset-0 items-center justify-center bg-black/50">
                <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                  <Ionicons name="play" size={32} color="white" />
                </View>
                <Text className="text-white mt-4">Cargando video...</Text>
              </View>
            )}
          </>
        )}
      </View>

      <View className="flex-row items-center mt-3 px-1">
        <View className="bg-primary-100 px-2 py-1 rounded">
          <Text className="text-xs font-semibold text-primary-700">HLS</Text>
        </View>
        <Text className="text-xs text-gray-500 ml-2">Streaming adaptativo</Text>
      </View>
    </View>
  );
}
