import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Button,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { auth } from "../../../lib/firebase";
import { TWITTER_API_KEY, TWITTER_API_SECRET } from "@env";
import { useTwitter } from "../../../lib/Twitter";

export const AuthScreen: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { twitter, LoginModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      setUser(user);
      // console.log("token", accessToken);
    },
  });
  useEffect(() => {
    //FIX
    if (!user) {
      twitter.setConsumerKey(TWITTER_API_KEY, TWITTER_API_SECRET);
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>ログイン中...</Text>
      {/* <Button title="hoge" onPress={auth} /> */}
      <Button
        title="ログインする"
        onPress={() => {
          twitter.login();
        }}
      />

      <LoginModal />
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
