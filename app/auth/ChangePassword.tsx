
import GLinearGradient from "@/components/ui/GGradient";
import { useRouter} from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";
import ChangePasswordForm from "@/components/forms/ChangePasswordForm";



export default function ChangePassword(){
    
    const router = useRouter()
   return (
    <GLinearGradient>
     <View className="px-4 py-10 h-full">
         <TouchableOpacity className="py-1" onPress={()=>router.back()}>
           <Image source={back} className="w-10 h-10" />
          </TouchableOpacity>
          <View>
            <Text className="font-poppins-medium text-xl py-5 text-white">Enter new password you need to use</Text>
            <Text className="font-poppins text-white">And confirm if you aggree to use new password</Text>
          </View>
          <View>
             <ChangePasswordForm/>
          </View>
     </View>
     </GLinearGradient>
   )
} 