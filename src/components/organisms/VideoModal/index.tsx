import React, { FC, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Video, VideoFullscreenUpdateEvent, Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

type VideoModalProps = {
  item: any;
};

//NativeControlsのフルスクリーンでonFullscreenUpdateが発火しないバグあり（Expo）。FIX予定
export const VideoModal: FC<VideoModalProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<Video>(null);

  const closeFullscreen = (event: VideoFullscreenUpdateEvent) => {
    if (event.fullscreenUpdate === 3) {
      ref.current?.dismissFullscreenPlayer();
      setIsOpen(false);
    }
  };

  const onPress = async () => {
    if (isOpen) return;
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeIOS: 2,
    });
    await ref?.current?.playAsync();
    ref.current?.presentFullscreenPlayer();
    setIsOpen(true);
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Video
        ref={ref}
        source={{ uri: item?.url! }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        isLooping
        style={{ width: "100%", height: 180 }}
        onFullscreenUpdate={closeFullscreen}
      />
      {!isOpen && (
        <View
          style={{
            position: "absolute",
            zIndex: 10,
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{
              width: 56,
              borderWidth: 2,
              borderRadius: 999,
              borderColor: "#fff",
              backgroundColor: "#1DA1F2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="ios-play"
              size={48}
              color="#fff"
              style={{ paddingLeft: 6 }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
