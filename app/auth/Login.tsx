import DividerWithText from "@/components/__ui__/DevidText"
import GoagleButton from "@/components/__ui__/GogalButton"
import LoginForm from "@/components/forms/LoginForm"
import GLinearGradient from "@/components/ui/GGradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import back from "../../assets/icon/back.png"
import goagle from "../../assets/icon/goagle.png"

interface DecodedToken {
  exp: number 
}

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        if (!token) {
          return
        }

        const decoded: DecodedToken = jwtDecode(token)
        const isExpired = decoded.exp * 1000 < Date.now()

        if (isExpired) {
          await AsyncStorage.removeItem("token")
          Alert.alert("Session expired", "Please login again!",[
            {
              text:'OK',
              onPress: () => {
           router.replace("/auth/Login")
          },
            }
          ])
        } 
      } catch (err) {
        console.error("Token check failed", err)
        await AsyncStorage.removeItem("token")
        Alert.alert("Error", "Please login again!")
      }
    }

    checkToken()
  }, [])

  return (
    <GLinearGradient>
    <View className="h-full px-4 py-5">
      <TouchableOpacity
        className="py-5"
        onPress={() => {
          if (router.canGoBack()) {
            router.back()
          } else {
            router.push("../onboarding")
          }
        }}
      >
        <Image source={back} className="w-10 h-10" />
      </TouchableOpacity>

      <View className="flex flex-row justify-center items-center pb-10">
        <Text className="text-3xl font-poppins-bold text-white">Login</Text>
      </View>

      <GoagleButton name="Sign in with Goagle" icon={goagle} />
      <DividerWithText text="or sign in with" />

      <View>
        <LoginForm
          onPress={() => router.push("./ForgotPassword")}
          onLogin={() => router.push("../(tabs)")}
        />
      </View>

      <View className="flex flex-row justify-center items-center gap-2 pb-10 pt-5">
        <Text className="font-poppins text-white">Don't have an Account?</Text>
        <Text
          className="text-blue-600 font-poppins"
          onPress={() => router.replace("./Signup")}
        >
          Sign up here
        </Text>
      </View>
    </View>
    </GLinearGradient>
  )
}
