import { SettingCard } from "@/components/__ui__/SetingCard";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";


type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

export default function TabTwoScreen() {

  const setting: { name: MaterialIconName; title: string }[] = [
     {name:"person-outline",title:"Profile"},
     {name:"gavel",title:"Terms and Polices"},
     {name:"chat",title:"Conversation"},
     {name:"info",title:"Help"}
  ]
  const router = useRouter()

   
 const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    Alert.alert("Success", "Logout successfully",[
      {
              text:'OK',
              onPress: () => {
           router.replace("../auth/login")
          },
            }
    ]);
  } catch (error) {
    Alert.alert("Error", "Something went wrong during logout");
  }
};


  return (
    <View className=" h-full py-10 px-4 flex flex-col gap-10">
      <TouchableOpacity className="py-5 flex flex-row justify-between items-center gap-1 w-2/3 pr-8" onPress={() => router.back()}>
         <Image source={back} className="w-10 h-10" />
          <Text className="text-lg font-poppins-bold">Settings</Text>
      </TouchableOpacity>
      <View className="flex flex-col gap-4 justify-center h-1/2">
         {setting.map((set,index)=>(
           <SettingCard key={index} name={set.name} title={set.title} icon="chevron-right"/>
         ))}
      </View>
      <View className="flex flex-col justify-center items-center">
       <TouchableOpacity className="flex flex-row justify-center items-center bg-slate-200 w-2/3 rounded-3xl py-2" onPress={handleLogout}>
         <MaterialIcons name="logout" size={24} color='red'/>
         <Text className="text-red-500 font-poppins-medium">Logout</Text>
       </TouchableOpacity>
       </View>
     </View>
  );
}

