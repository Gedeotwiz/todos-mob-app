import Hello from "@/components/home/hello";
import TodosStatus from "@/components/home/status";
import HomeTodos from "@/components/home/todos";
import Wellcome from "@/components/home/wellcome";
import { View } from "react-native";

export default function HomeScreen() {
  return (
     <View className="py-10 h-full bg-white flex flex-col gap-6">
        <Hello/>
        <Wellcome/>
        <TodosStatus/>
        <HomeTodos/>
     </View>
  );
}


