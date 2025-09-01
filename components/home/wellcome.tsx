import { Text, View } from "react-native"
import ImageSlider from "./slider"


export default function Wellcome(){
    return (
      <View className="bg-blue-500 p-4 rounded-xl flex flex-row mx-4">
            <View className="w-2/3">
                <Text className="text-xl font-bold text-white">Favorite App🌟</Text>
                <Text className="text-lg font-semibold text-white">Wellcom this app help you to manage your task</Text>
            </View>
            <View className="flex-1">
                <ImageSlider/>
            </View>
      </View>
    )
}