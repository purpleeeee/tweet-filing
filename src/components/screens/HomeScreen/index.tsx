import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useTwitter } from "../../../lib/Twitter";
import { AuthContext } from "../../contexts/AuthContext";
import { TweetTemplate } from "../../organisms/TweetTemplate";
import { StackNavigationProp } from "@react-navigation/stack";
import { Tweet } from "../../../types/tweet";
import { BigNumber } from "bignumber.js";
import { RootStackParamList } from "../../../types/navigation";

const { width } = Dimensions.get("window");

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Tweet[]>([]);

  const { setUser } = useContext(AuthContext);
  const { twitter } = useTwitter();

  const unmounted = useRef(true);
  useEffect(() => {
    if (unmounted.current) {
      twitter
        .get("favorites/list.json", {
          count: 100,
          tweet_mode: "extended",
        })
        .then((res: any) => setFavorites([...res]));
    }

    return () => {
      unmounted.current = false;
    };
  }, []);

  // const dummy: Tweet = {
  //   created_at: "2020/11/20",
  //   favorite_count: 23,
  //   favorited: true,
  //   retweet_count: 100,
  //   retweeted: false,
  //   text: "hogeeeeeeeeeeeeeee",
  //   user: {
  //     name: "むらさき",
  //     screen_name: "murasakiiii",
  //     profile_image_url_https:
  //       "https://pbs.twimg.com/profile_images/1337775785004810242/99fFaPbW_normal.jpg",
  //   },
  // };
  const getMoreTweet = useCallback(() => {
    const max_id = new BigNumber(favorites.slice(-1)[0]?.id_str)
      .minus(1)
      .c?.join("");

    twitter
      .get("favorites/list.json", {
        count: 100,
        max_id: max_id,
      })
      .then((res: any) => setFavorites([...favorites, ...res]));
  }, [favorites]);

  const onPressTweet = (tweet: Tweet) => {
    navigation.navigate("TweetDetail", { tweet });
  };

  const renderItem = useCallback(({ item }: { item: Tweet }) => {
    return (
      <TweetTemplate
        key={item.id_str}
        onPress={() => onPressTweet(item)}
        tweet={item}
      />
    );
  }, []);

  const keyExtractor = useCallback((item: Tweet) => {
    return item.id_str;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites || []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <ActivityIndicator size="large" style={{ marginTop: 10 }} />
        }
        onEndReached={getMoreTweet}
        onEndReachedThreshold={0.3}
      />
      <Button
        title="logout"
        onPress={() => {
          twitter.logout();
          setUser(undefined);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: "#fff",
  },
});
