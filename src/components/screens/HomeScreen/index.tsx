import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Button,
} from "react-native";
import { useTwitter } from "../../../lib/Twitter";
import { Status as Tweet } from "twitter-d";
import { AuthContext } from "../../contexts/AuthContext";

export const HomeScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>();
  const { setUser } = useContext(AuthContext);
  const { twitter } = useTwitter();
  useEffect(() => {
    twitter.get("favorites/list.json").then((res: any) => setFavorites(res));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => {
          return <Text key={item.id_str}>{item.text}</Text>;
        }}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
