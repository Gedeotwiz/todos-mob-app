
import { DeleteCard, DoneCard, EditCard } from "@/components/__ui__/ActionCard"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"


export default function TodoDetails(){
    const router = useRouter()
    const { id, title, summary, description ,time} = useLocalSearchParams()
    return (
       <View className="h-full py-10 px-10 bg-white flex flex-col gap-10">
        <TouchableOpacity className="py-5 flex flex-row justify-start items-center gap-1" onPress={() => router.back()}>
          <Image source={back} className="w-10 h-10" />
          <Text className="text-lg font-bold">Todo Details</Text>
        </TouchableOpacity>
         <View className="pb-10 border-b border-gray-300 flex flex-col gap-2">
           <Text className="text-lg font-semibold">{title}</Text>
           <Text>{time}</Text>
        </View>
          <View className="flex flex-col gap-5">
             <Text>{summary}</Text>
              <Text>{description}</Text>
          </View>
          <View className="flex flex-row gap-5 justify-center items-center pt-5">
             <DoneCard name="done" title="Done"/>
             <DeleteCard name="delete" title="Delete"/>
             <EditCard name="edit" title="Update"/>
          </View>
       </View>
    )
}