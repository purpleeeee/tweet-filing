import React, { useState, useEffect } from "react";
import { User } from "../../../types/user";
import firebase from "../../../lib/firebase";

type AuthContextValue = {
  user: any;
  setUser: (user: any) => void;
  signIn: any;
};

export const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const auth = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    const result = await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
    setUser(result);
  };

  // const auth = async () => {
  //   const user = await firebase.auth().signInAnonymously();
  //   setUser(user);
  // };
  const signIn = async () => {
    auth();
  };

  useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
