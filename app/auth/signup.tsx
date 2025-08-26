import DividerWithText from "@/components/__ui__/devidText"
import GoagleButton from "@/components/__ui__/gogalButton"
import SignUpForm from "@/components/forms/signupForm"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"
import goagle from "../../assets/icon/goagle.png"

export default function SignUp(){
    const router = useRouter()
    return (
       <View className="bg-white h-full px-4 py-10">
            <TouchableOpacity className="py-1" onPress={()=>router.back()}>
                <Image source={back} className="w-10 h-10" />
            </TouchableOpacity>
            <View className="flex flex-row justify-center items-center py-5">
                <Text className="font-bold text-3xl">SignUp</Text>
            </View>
            <GoagleButton name="Sign up with Goagle" icon={goagle}/>
            <DividerWithText text="or sign up with"/>
            <View>
                <SignUpForm/>
            </View>
            <View className='flex flex-row justify-center items-center gap-2 pt-7'>
                <Text>Have an Account</Text>
                <Text className='text-blue-600' onPress={() => router.replace("./login")}>Sign in here</Text>
                </View>
           </View>
    )
}