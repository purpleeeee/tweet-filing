import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, View, FlatList } from "react-native";
import { useTwitter } from "../../../lib/Twitter";
import { Status as Tweet } from "twitter-d";

export const HomeScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>();
  const { twitter } = useTwitter();
  useEffect(() => {
    twitter.get("favorites/list.json").then((res: any) => setFavorites(res));
    console.log(favorites);
  }, []);
  console.log("favo", favorites);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => {
          return <Text>{item.text}</Text>;
        }}
      />
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
