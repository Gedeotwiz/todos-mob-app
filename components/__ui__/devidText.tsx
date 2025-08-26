import { Text, View } from "react-native";

interface IProps{
    text:string
}

export default function DividerWithText(props:IProps) {
  return (
    <View className="flex-row items-center my-6">
      <View className="flex-1 h-px bg-gray-300" />
      <Text className="px-3 text-gray-500">{props.text}</Text>
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );
}
