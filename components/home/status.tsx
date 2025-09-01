import { Text, View } from "react-native";


export default function TodosStatus(){

    const track = [
        {"name":"ON_TRACK","number":5},
        {"name":"DONE","number":10},
        {"name":"OFF_TRACK","number":3}
    ]
       const getBoderColor = (statusName:string) =>{
            switch(statusName){
                case "ON_TRACK":
                    return "border-blue-600";
                case "DONE":
                    return "border-green-600";
                case "OFF_TRACK":
                    return "border-red-600"
                default:
                    return "boder-gray-600"
            }
        }
    return (
      <View className="flex flex-col gap-4 px-4">
        <Text className="font-bold text-sl">Todos Status</Text>
         <View className="flex flex-row justify-between items-center">
            {track.map((status,index) =>(
               <View key={index} className="flex flex-col justify-center items-center gap-1">
                 <Text className={`border px-2 py-1 rounded-lg ${getBoderColor(status.name)}`}>{status.name}</Text>
                 <Text>{status.number}</Text>
              </View>
            ))}
          
        </View>
      </View>
    )
}