import { Text, TouchableOpacity } from "react-native";

interface IProps {
  name: string;
  onPress?: () => void;          
}

export default function ContinueButton({ name, onPress}: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl px-2 py-3 w-1/4 items-center justify-center bg-blue-600`}
    >
      <Text className={`text-white font-bold`}>{name}</Text>
    </TouchableOpacity>
  );
}
