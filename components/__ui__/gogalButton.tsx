import { Image, Text, View } from "react-native"


interface IProps{
    name:string,
    icon:any
}


export default function GoagleButton(props:IProps){
    return (
        <View className="flex flex-row justify-center items-center bg-[#F4F7FF] p-[12px] rounded-2xl gap-3">
             <Image source={props.icon} style={{ width: 20, height: 20 }} />
            <Text className="font-poppins">{props.name}</Text>
        </View>
    )
}