import { Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

interface IProps {
  handleChange: (code: string) => void
  code: string
}

export default function OtpInputField(props: IProps) {
  return (
    <View className="flex flex-col gap-3">
      <Text className="font-poppins-bold text-white">Enter Code</Text>
      <OtpInput
        numberOfDigits={6}
        onTextChange={props.handleChange}
        focusColor="#2563eb"
        theme={{
          pinCodeContainerStyle: {
            width: 40,
            height: 45,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#ccc",
          },
          pinCodeTextStyle: {
            fontSize: 18,
            color: "black",
          }
        }}
      />
    </View>
  );
}
