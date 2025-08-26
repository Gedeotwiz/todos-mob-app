import { Text, TouchableOpacity } from "react-native";

interface IProps {
  name: string;
  onPress?: () => void;  
  disabled?: boolean;         
}

export default function FormButton({ name, onPress, disabled }: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-3xl px-3 py-4 items-center justify-center ${
        disabled ? 'bg-gray-400' : 'bg-blue-600'
      }`}
    >
      <Text className={`text-white font-bold`}>{name}</Text>
    </TouchableOpacity>
  );
}
