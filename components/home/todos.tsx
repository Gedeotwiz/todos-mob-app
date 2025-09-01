import { Text, View } from "react-native";
import TodosCard from "./todo-card";


export default function HomeTodos(){
   return (
     <View>
        <View className="flex flex-row justify-between items-center px-4">
            <Text className="font-semibold">New Todos</Text>
            <Text className="font-semibold text-blue-600">All Todos</Text>
        </View>
        <View className="bg-gray-200 rounded-lg px-4 h-full py-5">
            <TodosCard/>
        </View>
     </View>
   )
}