import * as firebase from "firebase";
import "firebase/auth";

import { Client } from "../lib/Twitter";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from "@env";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// export const auth = async () => {
//   const provider = new firebase.auth.TwitterAuthProvider();
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(async (result: any) => {
//       await Client.setAccessToken(
//         result.credential.accessToken,
//         result.credential.secret
//       );
//       await Client.setConsumerKey(TWITTER_API_KEY, TWITTER_API_SECRET);
//       const hoge = await Client.get("/favorites/list.json");
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

export default firebase;
