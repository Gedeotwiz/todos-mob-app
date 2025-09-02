import DividerWithText from "@/components/__ui__/devidText"
import GoagleButton from "@/components/__ui__/gogalButton"
import LoginForm from "@/components/forms/loginForm"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"
import goagle from "../../assets/icon/goagle.png"

export default function Login(){
    const router = useRouter()

    useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.push("../(tabs)");
      } else {
        Alert.alert("Error", "Please login now!");
      }
    };

    checkToken();
  }, []);


    return (
        <View className="bg-white h-full px-4 py-5">
            <TouchableOpacity className="py-5" onPress={() => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.push("../onboarding") 
    }
  }}>
                <Image source={back} className="w-10 h-10" />
            </TouchableOpacity>
            <View className="flex flex-row justify-center items-center pb-10">
                <Text className="font-bold text-3xl">Login</Text>
            </View>
            <GoagleButton name="Sign in with Goagle" icon={goagle}/>
            <DividerWithText text="or sign in with"/>
            <View>
                <LoginForm onPress={()=>router.push("./forgotPassword")} onLogin={()=>router.push("../(tabs)")}/>
            </View>
             <View className='flex flex-row justify-center items-center gap-2 pb-10 pt-5'>
                <Text>Don't have an Account?</Text>
              <Text className='text-blue-600' onPress={() => router.replace("./signup")}>Sign up here</Text>
              </View>
        </View>
    )
}