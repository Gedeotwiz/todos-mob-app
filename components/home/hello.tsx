import { useState } from "react";
import { Image, Text, View } from "react-native";
import notify from "../../assets/icon/notif.png";
import misnotify from "../../assets/icon/notnotf.png";
import menu from "../../assets/icon/option.png";
import image from "../../assets/images/profile.jpeg";


export default function Hello(){
     const [notification]= useState(null)

     
    return (
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row justify-center items-start gap-4">
              <Image source={image} className="w-12 h-12 rounded-full"/>
             <View>
                <Text >Morning 👋</Text>
                <Text >Jant Gedeon </Text>
             </View>
          </View>
          <View className="flex flex-row gap-2 justify-center items-center">
             <Image source={notification ? notify : misnotify} className="w-6 h-6"/>
             <View className="border border-gray-400 rounded-full p-3">
                <Image source={menu} className="w-6 h-6"/>
             </View>
          </View>
       </View>
    )
}