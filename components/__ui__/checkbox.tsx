import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

interface IProps{
    label:string
}

export default function CheckBoxExample(props:IProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View className="flex-row gap-2  space-x-2 p-4">
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? "#2563EB" : undefined} 
      />
      <Text>{props.label}</Text>
    </View>
  );
}
