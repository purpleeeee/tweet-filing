import React, { FC } from "react";

import { Image } from "react-native";

type IconProps = {
  src: string;
  width?: number;
  height?: number;
  style?: object;
};

export const Icon: FC<IconProps> = ({
  src,
  width = 35,
  height = 35,
  style,
}) => {
  return (
    <Image
      source={{ uri: src }}
      fadeDuration={0}
      style={{ width, height, borderColor: "#999", borderWidth: 1, ...style }}
    />
  );
};