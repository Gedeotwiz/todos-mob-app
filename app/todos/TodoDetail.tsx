import { DeleteCard, DoneCard, EditCard } from "@/components/__ui__/ActionCard"
import { useDoneTodoUpdateMutation } from "@/components/Redux/auth/api.slice"
import GLinearGradient from "@/components/ui/GGradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"
import { Modal } from "react-native"
import { useState } from "react"
import UpdateTime from "@/components/__ui__/UpdateTime"

export default function TodoDetails() {
  const router = useRouter()
  const { id, title, summary, description, time, status } = useLocalSearchParams()
  const [visible, setVisible] = useState(false);

  const isDone = status === 'DONE'


  const [markDone] = useDoneTodoUpdateMutation()

  const data = {
    title: String(title),
    summary: String(summary),
    description: String(description),
    time:String(time),
    status: "DONE",
  }

  const handleDone = async () => {
    try {
      await markDone({ id: String(id), DTO: data }).unwrap()
      Alert.alert("Success", "Todo marked as done ")
      router.back()
    } catch (err) {
      Alert.alert("Error", "Failed to update todo")
      console.error(err)
    }
  }

  const HandeUpdate = () => {
    setVisible(true)
  }
  const CloseModal = () =>{
    setVisible(false)
  }

  return (
    <GLinearGradient>
      <View className="h-full py-10 px-10 flex flex-col gap-10">
        <TouchableOpacity
          className="py-5 flex flex-row justify-start items-center gap-2"
          onPress={() => router.back()}
        >
          <Image source={back} className="w-10 h-10" />
          <Text className="text-lg font-poppins-bold text-white">Todo Details</Text>
        </TouchableOpacity>

        <View className="pb-10 border-b border-gray-300 flex flex-col gap-2">
          <Text className="text-lg font-poppins-bold text-white">{title}</Text>
          <Text className="font-poppins text-white">{time}</Text>
        </View>

        <View className="flex flex-col gap-5">
          <Text className="font-poppins-medium text-white">{summary}</Text>
          <Text className="font-poppins text-white">{description}</Text>
        </View>

        <View className="flex flex-row gap-5 justify-center items-center pt-5">
          
          {!isDone && (
            <DoneCard name="done" title="Done" onPress={handleDone} />
          )}
          <DeleteCard name="delete" title="Delete" />
          <EditCard name="edit" title="Update" onPress={HandeUpdate}/>
        </View>
      </View>
      <Modal
           animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={CloseModal}
        >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent:"flex-end" }}>
         <View style={{ backgroundColor: "white",padding:20, borderTopLeftRadius: 20,borderTopRightRadius: 20,}}>
         <UpdateTime 
            onPress={CloseModal} 
            onSuccess={CloseModal}  
/>
        </View>
      </View>
    </Modal>

    </GLinearGradient>
  )
}