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
      className={`rounded-xl px-4 py-4 items-center justify-center ${
        disabled ? 'bg-violet-300' : 'bg-violet-600'
      }`}
    >
      <Text className={`text-white font-poppins-bold`}>{name}</Text>
    </TouchableOpacity>
  );
}
