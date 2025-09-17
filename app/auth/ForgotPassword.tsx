import ForgotForm from "@/components/forms/ForgotForm";
import GLinearGradient from "@/components/ui/GGradient";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";
  
interface IProps{
  email:string
}

export default function ForgotPassword(props:IProps){

    const router = useRouter()
   return (
    <GLinearGradient>
     <View className="px-4 py-10 h-full">
         <TouchableOpacity className="py-1" onPress={()=>router.back()}>
           <Image source={back} className="w-10 h-10" />
          </TouchableOpacity>
          <View>
            <Text className="font-poppins-bold text-2xl py-5 text-white">Forgot Password</Text>
            <Text className="font-poppins text-white">Enter the email address registered with your account. We'll send you a link to reset your password.</Text>
          </View>
          <View>
             <ForgotForm 
             onPress={(email) => router.push({ pathname: "./VerfyOtp", params: { email } })} 
              onClick={() => router.push("/auth/Login")} 
            />

          </View>
     </View>
     </GLinearGradient>
   )
}