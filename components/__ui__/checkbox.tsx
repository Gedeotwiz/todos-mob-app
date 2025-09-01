import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

interface IProps {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function CheckBoxExample({ label, value, onChange }: IProps) {
  return (
    <View className="flex-row gap-2 p-4">
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? "#2563EB" : undefined}
      />
      <Text>{label}</Text>
    </View>
  );
}
