import React, { useEffect, useState, useCallback } from "react";
import client from "./client";
import { TwitterUser, AccessToken, ErrorResponse } from "./types";
import { WebViewNavigation } from "react-native-webview";
import {
  LoginModal as Modal,
  LoginModalProps,
} from "../../components/organisms/LoginModal";

type useTwitterProps = {
  onSuccess: (user: TwitterUser, accessToken: AccessToken) => void;
  onError?: (err: ErrorResponse) => void;
};

export const useTwitter = (props?: useTwitterProps) => {
  const [visible, setVisible] = useState(false);
  const [authURL, setAuthURL] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [webViewState, setWebViewState] = useState<WebViewNavigation | null>(
    null
  );

  const login = async (callback_url?: string) => {
    console.log("これからログイン");
    const url = await client.getLoginUrl(callback_url);
    console.log("loginしたよ", url);
    setAuthURL(url);
    setVisible(true);
  };

  const LoginModal = useCallback(() => {
    const onWebViewStateChanged = (webViewNavigation: WebViewNavigation) => {
      setWebViewState(webViewNavigation);
    };
    return (
      <Modal
        visible={visible}
        authURL={authURL}
        onWebViewStateChanged={onWebViewStateChanged}
      />
    );
  }, [visible]);

  useEffect(() => {
    if (webViewState) {
      const match = webViewState.url.match(
        /\?oauth_token=.+&oauth_verifier=(.+)/
      );
      if (match && match.length > 0) {
        setVisible(false);
        setAuthURL("");

        client
          .getAccessToken(match[1])
          .then((response) => {
            client.setAccessToken(
              response.oauth_token,
              response.oauth_token_secret
            );
            setLoggedIn(true);
          })
          .catch((error) => {
            console.warn(`[getAccessToken failed] ${error}`);

            if (props?.onError) {
              props.onError(error);
            }
          });
      }
    }
  }, [webViewState]);

  useEffect(() => {
    if (loggedIn && props?.onSuccess) {
      const options = {
        include_entities: false,
        skip_status: true,
        include_email: true,
      };

      client
        .api<TwitterUser>("GET", "account/verify_credentials.json", options)
        .then((response) => {
          props.onSuccess(response, {
            oauth_token: client.oauthToken,
            oauth_token_secret: client.oauthTokenSecret,
          });
          setLoggedIn(false);
        })
        .catch((error) => {
          console.warn(
            `[get("account/verify_credentials.json") failed] ${error}`
          );

          if (props?.onError) {
            props.onError(error);
          }

          setLoggedIn(false);
        });
    }
  }, [loggedIn]);

  return {
    twitter: {
      login,
      getAccessToken: (): AccessToken => ({
        oauth_token: client.oauthToken,
        oauth_token_secret: client.oauthTokenSecret,
      }),
      setAccessToken: client.setAccessToken,
      setConsumerKey: client.setConsumerKey,
      api: client.api,
      post: client.post,
      get: client.get,
    },
    LoginModal,
  };
};
