// Image file types
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

// React Native SVG support
declare module "*.svg" {
  import * as React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

// react-native-phone-number-input
declare module "react-native-phone-number-input" {
  import * as React from "react";
  import { StyleProp, TextStyle, ViewStyle } from "react-native";

  export interface PhoneInputProps {
    defaultCode?: string;
    defaultValue?: string;
    layout?: "first" | "second";
    onChangeText?: (text: string) => void;
    onChangeFormattedText?: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    textContainerStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<TextStyle>;
    codeTextStyle?: StyleProp<TextStyle>;
  }

  export default class PhoneInput extends React.Component<PhoneInputProps> {}
}
