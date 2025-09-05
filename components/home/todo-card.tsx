import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "@ui-kitten/components";
import { useState } from "react";
import { Text, View } from "react-native";

interface IProps{
  id:string,
  title:string,
  summary:string,
  time:string,
  index:number,
  click:()=>void
}

export default function TodosCard(props:IProps) {
    const [open,setOpen] = useState(false)

    const handleOpen = () => {
      setOpen((prev) => !prev);
    }
  
  return (
          <Card key={props.id || props.index} onPress={props.click}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-col gap-1 w-3/4">
                <Text className="font-bold text-lg">{props.title}</Text>
                <Text >Deadline | {props.time}</Text>
              </View>
                <MaterialIcons name={open ? "expand-more" : "chevron-right"} size={24} color='#0EA5E9' onPress={handleOpen}/>
            </View>
            {open && (<Text className="pt-3">{props.summary}</Text>)}
          </Card>
  );
}
