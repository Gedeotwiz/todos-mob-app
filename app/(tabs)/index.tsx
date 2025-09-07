import { SearchInput } from "@/components/__ui__/searchInput";
import Hello from "@/components/home/hello";
import TodosStatus from "@/components/home/status";
import HomeTodos from "@/components/home/todos";
import Wellcome from "@/components/home/wellcome";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
   const router = useRouter()
  return (
     <View className="py-10 h-full bg-white flex flex-col gap-6">
        <Hello onPress={()=>router.push("../auth/login")}/>
         <View className="px-4">
            <SearchInput/>
         </View>
        <Wellcome/>
        <TodosStatus onPress={()=>router.push("../todos/addTodos")}/>
        <HomeTodos onPress={()=>router.push("./Todos")} />
     </View>
  );
}


