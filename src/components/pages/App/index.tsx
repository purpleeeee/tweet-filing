import React from "react";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { AppNavigator } from "../../navigation/AppNavigator";

export const App = () => {
  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
};
