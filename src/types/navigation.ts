import { Tweet } from "./tweet";

export type RootStackParamList = {
  Home: undefined;
  TweetDetail: { tweet: Tweet };
};
