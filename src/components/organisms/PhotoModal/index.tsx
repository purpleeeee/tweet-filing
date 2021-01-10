import React, { FC } from "react";
import { View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import ViewPager from "@react-native-community/viewpager";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

type PhotoModalProps = {
  onRequestClose: () => void;
  imageIndex: number;
  media: any[];
  isVisible: boolean;
};

export const PhotoModal: FC<PhotoModalProps> = ({
  onRequestClose,
  imageIndex,
  media,
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
            {media.map((img, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
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
