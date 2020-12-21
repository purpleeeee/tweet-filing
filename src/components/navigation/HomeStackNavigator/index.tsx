import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../screens/HomeScreen";
import { AuthContext } from "../../contexts/AuthContext";
import { AvatarIcon } from "../../atoms/AvatarIcon";
import { TouchableOpacity } from "react-native";
import { useTwitter } from "../../../lib/Twitter";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  const { user } = useContext(AuthContext);
  const { twitter } = useTwitter();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   headerLeft: () => (
        //     // <TouchableOpacity onPress={() => twitter.logout()}>
        //     // <Icon
        //     //   // src={user.profile_image_url_https}
        //     //   style={{
        //     //     marginLeft: 2,
        //     //   }}
        //     // />
        //     // </TouchableOpacity>
        //   ),
        // }}
      />
    </Stack.Navigator>
  );
};
