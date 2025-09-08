import { SearchInput } from "@/components/__ui__/SearchInput";
import Hello from "@/components/home/Hello";
import TodosStatus from "@/components/home/Status";
import HomeTodos from "@/components/home/Todos";
import Wellcome from "@/components/home/Wellcome";
import GLinearGradient from "@/components/ui/GGradient";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
   const router = useRouter()
  return (
    <GLinearGradient>
     <View className="py-10 h-full flex flex-col gap-6">
        <Hello onPress={()=>router.push("../auth/login")}/>
         <View className="px-4">
            <SearchInput/>
         </View>
        <Wellcome/>
        <TodosStatus onPress={()=>router.push("../todos/addTodos")}/>
        <HomeTodos onPress={()=>router.push("./Todos")} />
     </View>
     </GLinearGradient>
  );
}


