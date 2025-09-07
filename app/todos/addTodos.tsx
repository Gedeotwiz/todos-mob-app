import AddTodoForm from "@/components/forms/addTodoForm"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"

export default function AddNewTodo () {
    const router = useRouter()

    const handleNext = (todoData: { title: string,summary:string, description: string }) => {
        router.push({
            pathname: './todoTime',
            params: todoData,
        })
    }

    return (
        <View className="flex flex-col py-10 h-full px-4 gap-6">
            <TouchableOpacity className="py-5" onPress={() => {
                         if (router.canGoBack()) {
                           router.back()
                         } else {
                           router.push("./allTodos") 
                         }
                       }}>
                <Image source={back}  className="w-10 h-10" />
            </TouchableOpacity>
            <Text className="text-xl font-poppins-bold">Add new todo you propose to work</Text>
            <View>
              <AddTodoForm onPress={handleNext}/>
            </View>
        </View>
    )
}
