import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../screens/HomeScreen";
import { AuthContext } from "../../contexts/AuthContext";
import { Icon } from "../../atoms/Icon";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon
              src={user.profile_image_url_https}
              style={{
                marginLeft: 2,
                borderRadius: 50,
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
