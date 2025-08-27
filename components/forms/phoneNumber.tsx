// phoneNumber.tsx
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";

interface Props {
  onChangeFormatted?: (val: string) => void;
}

export default function PhoneNumberInput({ onChangeFormatted }: Props) {
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");

  return (
    <View className="py-3">
      <Text className="mb-2 font-medium">Phone Number</Text>

      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="RW"
        layout="first"
        onChangeText={(text) => setValue(text)}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
          if (onChangeFormatted) onChangeFormatted(text);
        }}
        containerStyle={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          height: 38,
          width: "100%",
        }}
        textContainerStyle={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          borderRadius: 8,
          backgroundColor: "white",
        }}
        textInputStyle={{
          padding: 0,
          margin: 0,
          fontSize: 14,
        }}
        codeTextStyle={{
          fontSize: 14,
          paddingHorizontal: 2,
        }}
      />

      {formattedValue ? (
        <Text className="text-red-500 mt-2">Selected: {formattedValue}</Text>
      ) : null}
    </View>
  );
}
