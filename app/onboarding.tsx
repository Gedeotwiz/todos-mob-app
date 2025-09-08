
import GLinearGradient from "@/components/ui/GGradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import path from "../assets/icon/path.png";



export default function Onboarding() {
  const router = useRouter();

  return (
    <GLinearGradient>
    <View className="flex flex-col justify-around items-center gap-8 h-full">
      <Image source={path} className="w-70 h-70" />
      <View className="flex flex-col justify-center items-center">
        <Text className="font-poppins-medium text-lg text-white">You informations are </Text>
        <Text className="font-poppins-medium text-lg text-white">secure with us</Text>
      </View>
      <TouchableOpacity onPress={() => router.replace("./auth/login")} className="p-5 bg-white rounded-full">
         <MaterialIcons name="done" color='gray' size={26}/>
      </TouchableOpacity>
    </View>
    </GLinearGradient>
  );
}
