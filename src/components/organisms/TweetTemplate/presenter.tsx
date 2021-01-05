import React, { FC } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tweet } from "../../../types/tweet";
// import ImageView from "react-native-image-viewing";

import { MediaModal } from "../MediaModal";

type TweetTemplatePresenterProps = {
  onPress?: () => void;
  tweet: Tweet;
  images: any[];
  imageIndex: number;
  isVisible: boolean;
  onSelectImage: (index: number) => void;
  onRequestClose: () => void;
  isDetail?: boolean;
};

const _TweetTemplatePresenter: FC<TweetTemplatePresenterProps> = ({
  onPress,
  tweet,
  images,
  imageIndex,
  isVisible,
  onSelectImage,
  onRequestClose,
  isDetail,
}) => (
  <View
    style={{
      flex: 1,
      flexDirection: isDetail ? "column" : "row",
      width: "100%",
      paddingVertical: 8,
      paddingHorizontal: isDetail ? 18 : 14,
      borderBottomWidth: 1,
      borderBottomColor: "#E1E8ED",
    }}
  >
    <View style={isDetail ? { flex: 1, flexDirection: "row" } : { flex: 0.15 }}>
      <Image
        resizeMode={"contain"}
        source={{ uri: tweet.user.profile_image_url_https }}
        style={{
          width: 48,
          height: 48,
          borderColor: "rgba(0,0,0,0.04)",
          borderWidth: 1,
          borderRadius: 999,
        }}
      />
      {isDetail && (
        <View
          style={{
            flexDirection: "column",
            maxWidth: "100%",
            marginLeft: 8,
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontWeight: "bold",
            }}
          >
            {tweet.user.name}
          </Text>
          <Text
            style={{
              color: "#5B7083",
            }}
            numberOfLines={1}
          >
            {`@${tweet.user.screen_name}`}
          </Text>
        </View>
      )}
    </View>

    <View style={{ flex: isDetail ? 1 : 0.85 }}>
      <TouchableOpacity
        onPress={isDetail ? undefined : onPress}
        activeOpacity={1}
      >
        {/* Header */}
        {!isDetail && (
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              // flex: 1,
              // height: 100,
              // width: "100%",
              // justifyContent: "space-between",
              flexShrink: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexShrink: 1,
                maxWidth: "100%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontWeight: "bold",
                }}
              >
                {tweet.user.name}
              </Text>
              <Text
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  flexShrink: 1,
                  marginLeft: 4,
                  color: "#5B7083",
                }}
                numberOfLines={1}
              >
                {`@${tweet.user.screen_name}`}
              </Text>
            </View>

            <View style={{ flexShrink: 0 }}>
              <Text style={{ color: "#5B7083" }}>{tweet.created_at}</Text>
            </View>
          </View>
        )}

        {/* Body */}
        <View
          style={{
            marginTop: isDetail ? 20 : 2,
            marginBottom: isDetail ? 12 : 2,
            justifyContent: "center",
            height: "100%",
            flex: 1,
          }}
        >
          <View style={{ marginBottom: 6 }}>
            <Text
              style={
                isDetail
                  ? { fontSize: 22, lineHeight: 24 }
                  : { fontSize: 14, lineHeight: 16 }
              }
            >
              {tweet.full_text}
            </Text>
          </View>

          {/* Media */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: isDetail ? 16 : 0,
              marginBottom: isDetail ? 16 : 0,
              // flex: 1,
              // width: "100%",
              // borderRadius: 16,
              // borderWidth: 1,
              // overflow: "hidden",
            }}
          >
            {images && images.length !== 0 && (
              // <ImageView
              //   images={images!}
              //   imageIndex={imageIndex}
              //   visible={isVisible}
              //   onRequestClose={onRequestClose}
              //   animationType="fade"
              // />
              <MediaModal
                onRequestClose={onRequestClose}
                imageIndex={imageIndex}
                images={images}
                isVisible={isVisible}
              />
            )}

            {images.map((img, index) => (
              // FIX
              <TouchableOpacity
                key={index}
                onPress={() => onSelectImage(index)}
                activeOpacity={0.8}
                style={
                  images.length === 4
                    ? { width: "48%", margin: 2 }
                    : images.length === 3
                    ? { width: "48%", margin: 2 }
                    : images.length === 2
                    ? { width: "48%", margin: 2 }
                    : { width: "100%" }
                }
              >
                <Image
                  source={{ uri: img.uri }}
                  style={
                    images.length === 4
                      ? {
                          width: "100%",
                          height: 90,
                        }
                      : images.length === 3
                      ? {
                          width: "100%",
                          height: 90,
                        }
                      : images.length === 2
                      ? {
                          width: "100%",
                          height: 180,
                        }
                      : {
                          width: "100%",
                          height: 180,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: "#c4cfd6",
                        }
                  }
                  // resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
          {isDetail && (
            <Text style={{ color: "#5B7083" }}>{tweet.created_at}</Text>
          )}
        </View>

        {isDetail && (
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#c4cfd6",
              paddingVertical: 12,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{tweet.retweet_count}</Text>
              <Text>件のリツイート</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>{tweet.favorite_count}</Text>
              <Text>件のいいね</Text>
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: isDetail ? 6 : 0,
            paddingHorizontal: "18%",
          }}
        >
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="chat-outline" size={20} />
            <Text style={{ paddingHorizontal: 5, fontSize: 12 }}>1</Text>
          </View> */}

          <View
            style={{ flexDirection: "row", alignItems: "center", width: "50%" }}
          >
            <MaterialCommunityIcons
              name="twitter-retweet"
              size={isDetail ? 32 : 24}
              color="#c4cfd6"
            />
            {!isDetail && tweet.retweet_count !== 0 && (
              <Text style={{ paddingHorizontal: 5 }}>
                {tweet.retweet_count}
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "33%",
            }}
          >
            <MaterialCommunityIcons
              name="heart"
              size={isDetail ? 32 : 20}
              color="#e0255e"
            />
            {!isDetail && tweet.favorite_count !== 0 && (
              <Text style={{ paddingHorizontal: 5 }}>
                {tweet.favorite_count}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export const TweetTemplatePresenter: FC<TweetTemplatePresenterProps> = ({
  onPress,
  tweet,
  images,
  imageIndex,
  isVisible,
  onSelectImage,
  onRequestClose,
  isDetail,
}) => {
  return isDetail ? (
    <ScrollView>
      <_TweetTemplatePresenter
        onPress={onPress}
        tweet={tweet}
        images={images}
        imageIndex={imageIndex}
        isVisible={isVisible}
        onSelectImage={onSelectImage}
        onRequestClose={onRequestClose}
        isDetail={isDetail}
      />
    </ScrollView>
  ) : (
    <_TweetTemplatePresenter
      onPress={onPress}
      tweet={tweet}
      images={images}
      imageIndex={imageIndex}
      isVisible={isVisible}
      onSelectImage={onSelectImage}
      onRequestClose={onRequestClose}
    />
  );
};
