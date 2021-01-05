import React, { FC } from "react";
import { View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import ViewPager from "@react-native-community/viewpager";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

type MediaModalProps = {
  onRequestClose: () => void;
  imageIndex: number;
  images: any[];
  isVisible: boolean;
};

export const MediaModal: FC<MediaModalProps> = ({
  onRequestClose,
  imageIndex,
  images,
  isVisible,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      backdropColor="#000"
      backdropOpacity={1}
      onBackButtonPress={onRequestClose}
      swipeDirection={"down"}
      animationIn="fadeIn"
      onSwipeComplete={onRequestClose}
      swipeThreshold={200}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* header */}
          <View
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              onPress={onRequestClose}
              style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Ionicons name="ios-close" size={46} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <ViewPager
            initialPage={imageIndex}
            style={{ flex: 1 }}
            pageMargin={12}
          >
            {images.map((img, index) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  key={index}
                  source={{ uri: img.uri }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </ViewPager>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
