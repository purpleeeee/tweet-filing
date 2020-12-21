import React, { FC } from "react";
import { Image } from "react-native";

type AvatarIconProps = {
  src: string;
  width?: number;
  height?: number;
  style?: object;
};

export const AvatarIcon: FC<AvatarIconProps> = ({
  src,
  width = 35,
  height = 35,
  style,
}) => {
  return (
    <Image
      source={{ uri: src }}
      fadeDuration={0}
      style={{
        width,
        height,
        borderColor: "rgba(0,0,0,0.04)",
        borderWidth: 1,
        borderRadius: width / 2,
        ...style,
      }}
    />
  );
};
