import { Tweet, VideoVariant } from "../types/tweet";

export const findHighestBitrate = (videos: VideoVariant[]): VideoVariant => {
  const video = videos.reduce((a, b) => (a.bitrate! > b.bitrate! ? a : b));
  return video;
};
