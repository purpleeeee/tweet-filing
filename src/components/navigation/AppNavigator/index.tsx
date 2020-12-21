import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "../MainTabNavigator";
import { AuthScreen } from "../../screens/AuthScreen";
import { AuthContext } from "../../contexts/AuthContext";

export const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* {!user ? <AuthScreen /> : <MainTabNavigator />} */}
      <MainTabNavigator />
    </NavigationContainer>
  );
};
