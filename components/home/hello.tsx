import { useState } from "react";
import { Image, Text, View } from "react-native";
import notify from "../../assets/icon/notif.png";
import misnotify from "../../assets/icon/notnotf.png";
import menu from "../../assets/icon/option.png";
import image from "../../assets/images/profile.jpeg";
import { useUserLogedInQuery } from "../rtk/auth/api.slice";


export default function Hello(){
     const [notification]= useState(null)

     const hour = new Date().getHours();

  let greeting = "Hello 👋";
  if (hour >= 5 && hour < 12) {
    greeting = "Morning 👋";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Goog afternoon 👋";
  } else {
    greeting = "Good evening 👋";
  }

  const { data, isLoading} = useUserLogedInQuery();

  const name = data?.payload?.names

     
    return (
        <View className="flex flex-row justify-between items-center pt-5 px-4">
          <View className="flex flex-row justify-center items-start gap-4">
              <Image source={image} className="w-12 h-12 rounded-full"/>
             <View>
                <Text >{greeting}</Text>
                <Text className="font-bold">{name || isLoading}</Text>
             </View>
          </View>
          <View className="flex flex-row gap-2 justify-center items-center">
             <Image source={notification ? notify : misnotify} className="w-6 h-6"/>
             <View className="border border-gray-400 rounded-full p-1">
                <Image source={menu} className="w-5 h-5"/>
             </View>
          </View>
       </View>
    )
}