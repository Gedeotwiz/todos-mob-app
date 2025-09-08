import ResentForm from "@/components/forms/ResentForm";
import GLinearGradient from "@/components/ui/GGradient";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";


export default function ResentPassword(){

    const router = useRouter()
   return (
    <GLinearGradient>
     <View className="px-4 py-10 h-full">
         <TouchableOpacity className="py-1" onPress={()=>router.back()}>
           <Image source={back} className="w-10 h-10" />
          </TouchableOpacity>
          <View>
            <Text className="font-poppins-medium text-xl py-5 text-white">Please verify your email address</Text>
            <Text className="font-poppins text-white">We’ve sent an email to becca@gmail.com, please enter the code below.</Text>
          </View>
          <View>
             <ResentForm onPress={()=>router.push("./Login")}/>
          </View>
     </View>
     </GLinearGradient>
   )
} 