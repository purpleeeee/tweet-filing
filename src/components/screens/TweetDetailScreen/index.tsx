import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { RootStackParamList } from "../../../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { TweetTemplate } from "../../organisms/TweetTemplate";

type TweetDetailScreemProps = {
  navigation: StackNavigationProp<RootStackParamList, "TweetDetail">;
  route: RouteProp<RootStackParamList, "TweetDetail">;
};
const { width } = Dimensions.get("window");
export const TweetDetailScreen: React.FC<TweetDetailScreemProps> = ({
  navigation,
  route,
}) => {
  const { tweet } = route.params;
  console.log(tweet);
  return (
    <SafeAreaView style={styles.container}>
      <TweetTemplate tweet={tweet} isDetail />
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
