import Checkbox from "expo-checkbox";
import { Text, View } from "react-native";

interface IProps {
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function CheckBoxExample({ label, value, onChange }: IProps) {
  return (
    <View className="flex-row gap-2">
      <Checkbox
        value={value}
        onValueChange={onChange}
        color={value ? "#7152e8" : undefined}
      />
      <Text className="font-poppins text-[#6f7285] flex-1">{label}</Text>
    </View>
  );
}
