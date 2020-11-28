import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStackNavigator } from "../HomeStackNavigator";
import { CategorizeScreen } from "../../screens/CategorizeScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <MaterialCommunityIcons
                  name="home-heart"
                  size={30}
                  color={focused ? "#1DA1F2" : "#657786"}
                />
              );
            case "Categorize":
              return (
                <MaterialCommunityIcons
                  name="view-list"
                  size={30}
                  color={focused ? "#1DA1F2" : "#657786"}
                />
              );
            default:
              break;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Categorize" component={CategorizeScreen} />
    </Tab.Navigator>
  );
};
