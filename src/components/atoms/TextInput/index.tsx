import React, { FC, ReactNode } from "react";
import {
  View,
  TextInput as _TextInput,
  TextInputProps as _TextInputProps,
} from "react-native";

type TextInputProps = _TextInputProps & {
  handleChange?: React.Dispatch<React.SetStateAction<string>>;
  width?: number;
  height?: number | string;
  round?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const TextInput: FC<TextInputProps> = ({
  leftIcon,
  value,
  placeholder,
  handleChange,
  width = 300,
  height = 40,
  round,
  style,
  rightIcon,
  ...props
}) => {
  // const [textInputValue, setTextInputValue] = useState("");

  // const _handleChange = useCallback((value: string) => {
  //   setTextInputValue(value);
  //   if (handleChange) {
  //     handleChange(value);
  //   }
  // }, []);

  return (
    // <View
    //   style={{
    //     width: "100%",

    //     padding: 8,
    //   }}
    // >
    //   <View
    //     style={{
    //       // flex: 1,
    //       flexDirection: "row",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       minHeight: 30,
    //       borderRadius: 999,
    //       // borderBottomWidth: 0,
    //       // borderTopWidth: 1,
    //       // borderBottomWidth: 1,
    //       // borderColor: "#0a0909",s
    //       backgroundColor: "#E1E8ED",
    //     }}
    //   >
    //     {leftIcon && (
    //       <View
    //         style={{
    //           height: 40,
    //           marginLeft: 8,
    //           justifyContent: "center",
    //           alignItems: "center",
    //           paddingRight: 4,
    //           // marginVertical: 4,
    //         }}
    //       >
    //         {leftIcon}
    //       </View>
    //     )}
    //     <_TextInput
    //       style={{
    //         minHeight: 40,
    //         fontSize: 18,
    //         flex: 1,
    //         // alignSelf: "center",
    //         marginLeft: 10,
    //       }}
    //       placeholder={placeholder}
    //       onChangeText={_handleChange}
    //       autoCompleteType="name"
    //       autoCapitalize="none"
    //     />
    //     {rightIcon && (
    //       <View
    //         style={{
    //           // height: 40,
    //           marginRight: 8,
    //           alignItems: "center",
    //           justifyContent: "center",
    //         }}
    //       >
    //         {rightIcon}
    //       </View>
    //     )}
    //   </View>
    // </View>
    <View
      style={{
        // flex: 1,
        minHeight: 30,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E1E8ED",
        borderRadius: round ? 999 : 0,
        width: width,
        // paddingLeft: 10,
        // paddingRight: 10,
      }}
    >
      {leftIcon && (
        <View
          style={{
            marginLeft: 10,
            paddingRight: 8,
            // position: "absolute",
            // left: 13,
            // marginRight: 30,
            // paddingLeft: width * 0.05,
            // zIndex: 2,
          }}
        >
          {leftIcon}
        </View>
      )}
      <_TextInput
        value={value}
        onChangeText={handleChange}
        style={{
          flex: 1,
          // position: "absolute",
          // height: height,
          // width: width,
          paddingLeft: leftIcon ? 0 : 10,
          paddingRight: rightIcon ? 0 : 10,
          // borderWidth: 1,
          // borderRadius: 100,
          // borderColor: "#ffffff",

          fontSize: 16,

          // ...(style as TextStyle),
        }}
        autoCompleteType="name"
        autoCapitalize="none"
        placeholder={placeholder}
        {...props}
      />
      {rightIcon && (
        <View
          style={{
            marginRight: 8,
            paddingLeft: 8,
            // position: "absolute",
            // right: 10,
            // marginLeft: -30,
            // paddingRight: width * 0.05,
            // zIndex: 2,
          }}
        >
          {rightIcon}
        </View>
      )}
    </View>
  );
};
