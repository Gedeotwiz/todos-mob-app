import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface IProps {
  name: MaterialIconName;
  title: string;
  onPress?:()=>void
}

export const DoneCard = (props:IProps) => {
  return (
    <TouchableOpacity className="flex flex-col items-center justify-center p-2 bg-[#05243E] w-24 rounded-lg"
      style={{
    shadowColor: "#0EA5E9",       
    shadowOffset: { width: 1, height: 2 }, 
    shadowOpacity: 0.25,       
    shadowRadius: 3.84,        
    elevation: 5,          
  }}
     onPress={props.onPress}>
      <MaterialIcons name={props.name} size={24} color="#05243E" className="bg-green-600 rounded-full"/>
      <Text className="text-sm mt-1 text-white">{props.title}</Text>
    </TouchableOpacity>
  );
}

export const DeleteCard=(props:IProps) => {
  return (
    <View className="flex flex-col items-center justify-center p-2 bg-[#05243E] w-24 rounded-lg"
       style={{
    shadowColor: "#0EA5E9",       
    shadowOffset: { width: 1, height: 2 }, 
    shadowOpacity: 0.25,       
    shadowRadius: 3.84,        
    elevation: 5,          
  }}
    >
      <MaterialIcons name={props.name} size={24} color="red" />
      <Text className="text-sm mt-1 text-white">{props.title}</Text>
    </View>
  );
}

export const EditCard=(props:IProps) => {
  return (
    <View className="flex flex-col items-center justify-center p-2 bg-[#05243E] w-24 rounded-lg" 
      style={{
    shadowColor: "#0EA5E9",       
    shadowOffset: { width: 1, height: 2 }, 
    shadowOpacity: 0.25,       
    shadowRadius: 3.84,        
    elevation: 5,          
  }}
    >
      <MaterialIcons name={props.name} size={24} color="yellow" />
      <Text className="text-sm mt-1 text-white">{props.title}</Text>
    </View>
  );
}
