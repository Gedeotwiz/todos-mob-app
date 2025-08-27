import Hello from "@/components/home/hello";
import { View } from "react-native";

export default function HomeScreen() {
  return (
     <View className="px-4 py-10 h-full bg-white">
        <Hello/>
     </View>
  );
}


