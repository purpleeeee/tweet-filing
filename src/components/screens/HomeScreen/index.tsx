import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { useTwitter } from "../../../lib/Twitter";
import { Status as Tweet } from "twitter-d";

export const HomeScreen: React.FC = () => {
  const [favorite, setFavorite] = useState<Tweet[]>();
  const { twitter } = useTwitter();
  useEffect(() => {
    twitter.get("favorites/list.json").then((res: any) => setFavorite(res));
    console.log(favorite);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      {favorite?.map((f, i) => (
        <View key={i}>
          <Text>{f.favorited}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
