import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface IProps {
  name: MaterialIconName;
  title: string;
  icon:MaterialIconName
}


export const SettingCard = (props:IProps) => {
    return (
      <View className="flex flex-row justify-between items-center border-b border-slate-200 pb-4">
         <View className="flex flex-row justify-center items-center gap-2">
            <MaterialIcons name={props.name} size={24} color='#0EA5E9'/>
            <Text className="font-poppins">{props.title}</Text>
         </View>
         <MaterialIcons name={props.icon} size={16} color='gray'/>
      </View>
    )
}