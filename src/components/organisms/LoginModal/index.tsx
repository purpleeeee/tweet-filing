import React from "react";
import { Modal, SafeAreaView } from "react-native";

import WebView, { WebViewNavigation } from "react-native-webview";

export type LoginModalProps = {
  visible: boolean;
  authURL: string;
  // onClosePress: () => void;
  onWebViewStateChanged: (webViewState: WebViewNavigation) => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  authURL,
  onWebViewStateChanged,
}) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => {}}>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          startInLoadingState
          source={{ uri: authURL }}
          onNavigationStateChange={onWebViewStateChanged}
        />
      </SafeAreaView>
    </Modal>
  );
};
