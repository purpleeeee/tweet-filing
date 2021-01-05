import { User } from "./user";

export interface Tweet {
  id: number;
  id_str: string;
  created_at: string;
  favorite_count: number;
  favorited: boolean;
  retweet_count: number;
  retweeted: boolean;
  // text?: string;
  full_text: string;
  user: User;
  extended_entities?: {
    media?: {
      id: number;
      id_str: string;
      media_url: string;
      media_url_https: string;
      type: "photo" | "video";
      video_info?: {
        variants: [
          {
            content_type: string;
            url: string;
          }
        ];
      };
    }[];
  };
}
