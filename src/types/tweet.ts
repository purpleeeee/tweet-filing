import { User, TrimmedUser } from "./user";

export interface Tweet {
  contributors?: null;
  coordinates?: Coordinates | null;
  created_at: string;
  current_user_retweet?: TrimmedUser;
  display_text_range?: [number, number] | null;
  // entities: Entities;
  // extended_entities?: ExtendedEntities | null;
  favorite_count: number;
  favorited: boolean;
  text: string;
  id_str: string;
  id: number;
  in_reply_to_screen_name?: string | null;
  in_reply_to_status_id_str?: string | null;
  in_reply_to_status_id?: number | null;
  in_reply_to_user_id_str?: string | null;
  in_reply_to_user_id?: number | null;
  is_quote_status: boolean;
  lang?: string | null;
  // place?: Place | null;
  possibly_sensitive?: boolean | null;
  quoted_status_id_str?: string | null;
  quoted_status_id?: number | null;
  // quoted_status_permalink?: QuotedStatusPermalink | null;
  quoted_status?: Tweet | null;
  retweet_count: number;
  retweeted_status?: Tweet | null;
  retweeted: boolean;
  // scopes?: Scope | null;
  source: string;
  truncated: boolean;
  user: User;
  withheld_copyright?: boolean | null;
  withheld_in_countries?: string[] | null;
  withheld_scope?: string | null;
}