import { SearchInput } from "@/components/__ui__/searchInput"
import TodosCard from "@/components/home/todo-card"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"

export default function AllTodos(){
    const router = useRouter()

    return (
       <View className="flex flex-col h-full py-10 px-4 gap-6">
          <View className="flex flex-row justify-between items-center">
             <TouchableOpacity className="py-5" onPress={() => {
             if (router.canGoBack()) {
               router.back()
             } else {
               router.push("../(tabs)") 
             }
           }}>
             <Image source={back}  className="w-10 h-10" />
            </TouchableOpacity>
            <TouchableOpacity className="py-1 px-3 rounded-xl border-2 border-blue-600" onPress={()=>router.push('./addTodos')}>
                <Text>Add Todo</Text>
            </TouchableOpacity>
          </View>
          
            <View>
                <SearchInput/>
            </View>
            <View className="flex-1">
                <Text className="text-lg font-bold pb-2">All Todos Here!</Text>
                <TodosCard/>
            </View>
       </View>
    )
}