import DividerWithText from "@/components/__ui__/devidText"
import GoagleButton from "@/components/__ui__/gogalButton"
import SignUpForm from "@/components/forms/signupForm"
import GLinearGradient from "@/components/ui/GGradient"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"
import goagle from "../../assets/icon/goagle.png"

export default function SignUp(){
    const router = useRouter()
    return (
        <GLinearGradient>
       <View className="h-full px-4 py-10">
            <TouchableOpacity className="py-1" onPress={()=>router.back()}>
                <Image source={back} className="w-10 h-10" />
            </TouchableOpacity>
            <View className="flex flex-row justify-center items-center py-5">
                <Text className="font-poppins-bold text-3xl text-white">SignUp</Text>
            </View>
            <GoagleButton name="Sign up with Goagle" icon={goagle}/>
            <DividerWithText text="or sign up with"/>
            <View>
                <SignUpForm/>
            </View>
            <View className='flex flex-row justify-center items-center gap-2 pt-7'>
                <Text className="font-poppins text-white">Have an Account</Text>
                <Text className='text-blue-600 font-poppins' onPress={() => router.replace("./login")}>Sign in here</Text>
                </View>
           </View>
           </GLinearGradient>
    )
}