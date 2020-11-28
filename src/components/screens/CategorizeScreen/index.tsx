import React from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";

export const CategorizeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>カテゴリー</Text>
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
