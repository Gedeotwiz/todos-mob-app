import { SettingCard } from "@/components/__ui__/SetingCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";


export default function TabTwoScreen() {
  const router = useRouter()
  return (
    <View className=" h-full py-10 px-4">
      <TouchableOpacity className="py-5 flex flex-row justify-between items-center gap-1 w-2/3 pr-8" onPress={() => router.back()}>
         <Image source={back} className="w-10 h-10" />
          <Text className="text-lg font-bold">Settings</Text>
      </TouchableOpacity>
      <View>
         <SettingCard name="person-outline" title="Profile" icon="arrow-back"/>
      </View>
      <View className="flex flex-col justify-center items-center">
       <TouchableOpacity className="flex flex-row justify-center items-center bg-slate-200 w-2/3 rounded-3xl py-2">
         <MaterialIcons name="logout" size={24} color='red'/>
         <Text className="text-red-500">Logout</Text>
       </TouchableOpacity>
       </View>
     </View>
  );
}

