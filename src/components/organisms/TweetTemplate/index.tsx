import React, { FC, useState, useMemo } from "react";
import { Tweet } from "../../../types/tweet";
import { TweetTemplatePresenter } from "./presenter";
import { format } from "date-fns";
import { findHighestBitrate } from "../../../utils/twitter";

type TweetTemplateProps = {
  onPress?: () => void;
  tweet: Tweet;
  isDetail?: boolean;
};
export const TweetTemplate: FC<TweetTemplateProps> = ({
  onPress,
  tweet,
  isDetail,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const originalProfileImageUrl = tweet.user.profile_image_url_https.replace(
    "_normal",
    ""
  );

  const _tweet: Tweet = {
    ...tweet,
    created_at: format(
      new Date(tweet.created_at),
      isDetail ? "HH:mm ・yyyy年MM月dd日" : "・MM月dd日"
    ),
    user: {
      ...tweet.user,
      profile_image_url_https: originalProfileImageUrl,
    },
  };

  const media: any[] = useMemo(() => {
    if (!_tweet.extended_entities?.media?.length) return [];

    const photoOrVideoInfo = _tweet.extended_entities.media.map((item) => {
      return item.type === "photo"
        ? {
            type: "photo",
            uri: item.media_url_https,
          }
        : {
            type: "video",
            ...findHighestBitrate(item?.video_info?.variants!),
          };
    });

    return photoOrVideoInfo;
  }, [_tweet]);

  const onSelectImage = (index: number) => {
    setImageIndex(index);
    setIsVisible(true);
  };

  const onRequestClose = () => {
    setIsVisible(false);
  };

  return (
    <TweetTemplatePresenter
      onPress={onPress}
      tweet={_tweet}
      media={media}
      imageIndex={imageIndex}
      isVisible={isVisible}
      onSelectImage={onSelectImage}
      onRequestClose={onRequestClose}
      isDetail={isDetail}
    />
  );
};
