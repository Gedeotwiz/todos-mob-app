import { Card } from "@ui-kitten/components";
import { Text, View } from "react-native";

interface IProps{
  id:string,
  title:string,
  description:string
  index:number
}

export default function TodosCard(props:IProps) {
  
  return (
          <Card key={props.id || props.index}>
            <View className="flex flex-row justify-between items-end ">
              <View className="flex flex-col gap-2 w-3/4">
                <Text className="font-bold text-lg">{props.title}</Text>
                <Text >{props.description}</Text>
              </View>
              <View>
                <Text className="text-blue-600">View</Text>
              </View>
            </View>
          </Card>
  );
}
