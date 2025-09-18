
import GLinearGradient from "@/components/ui/GGradient";
import { useRouter,useLocalSearchParams } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";
import VerfyForm from "@/components/forms/Verfy-otp-Form";



export default function VerfyOtp(){
    const { email } = useLocalSearchParams<{ email: string }>();
    const router = useRouter()
   return (
    <GLinearGradient>
     <View className="px-4 py-10 h-full">
         <TouchableOpacity className="py-1" onPress={()=>router.back()}>
           <Image source={back} className="w-10 h-10" />
          </TouchableOpacity>
          <View>
            <Text className="font-poppins-bold text-xl py-5 text-white">Verify account</Text>
            <Text className="font-poppins text-white">By verifying your account, you data will be secured and be default you are accepting our terms and policies</Text>
            <Text className="font-poppins">Check otp code to <Text className="text-blue-500 font-poppins">{email}</Text></Text>
          </View>
          <View>
             <VerfyForm 
               onPress={(email,otp) => router.push({ pathname: "./ChangePassword", params: { email,otp } })} 
               onClick={() => router.push("/auth/ForgotPassword")} 
              />
          </View>
     </View>
     </GLinearGradient>
   )
} 