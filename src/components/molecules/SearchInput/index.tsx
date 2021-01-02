import React, { FC, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "../../atoms/TextInput";
import { Dimensions, TouchableOpacity } from "react-native";

export const SearchInput: FC = () => {
  const [value, setValue] = useState("");
  const handleReset = useCallback(() => {
    setValue("");
  }, []);
  // const { width } = Dimensions.get("window");
  return (
    <TextInput
      leftIcon={<Ionicons name="ios-search" size={20} color="#657786" />}
      rightIcon={
        value.length !== 0 && (
          <TouchableOpacity onPress={handleReset}>
            <Ionicons name="ios-close-circle" size={20} color="#1DA1F2" />
          </TouchableOpacity>
        )
      }
      value={value}
      width={280}
      handleChange={setValue}
      placeholder="キーワード検索"
      round
    />
  );
};
