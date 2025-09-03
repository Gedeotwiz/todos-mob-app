import { SearchInput } from "@/components/__ui__/searchInput"
import TodosCard from "@/components/home/todo-card"
import { useGetTodosQuery } from "@/components/rtk/auth/api.slice"
import { TodoResponse } from "@/components/rtk/types/integration.type"
import { useRouter } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"


export default function AllTodos(){
    const router = useRouter()
    

    const { data} = useGetTodosQuery({} as any);


     const rawTodos = data?.payload?.data ?? []
     const todos = [...rawTodos]


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
            <View className="flex-1 h-full">
                <Text className="text-lg font-bold pb-2">All Todos Here!</Text>
                 <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{ gap: 8, paddingVertical: 5 }}

                >
                 {todos.reverse().map((todo: TodoResponse, index: number) => {
                             return (
                               <TodosCard
                                 key={todo.id}
                                 id={todo.id}
                                 title={todo.title}
                                 description={todo.description}
                                 index={index}
                               />
                             );
                           })}
                </ScrollView>
                
            </View>
       </View>
    )
}