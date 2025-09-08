import { Text, View } from "react-native";
import { useGetTodosByStatusQuery } from "../Redux/auth/api.slice";
import { TodoStatus } from "../Redux/types/enum";

interface IProps{
    onPress:() => void
}

export default function TodosStatus(props:IProps){

    const {data:onTrack} = useGetTodosByStatusQuery({status:TodoStatus.ON_TRACK})
    const {data:offTack} = useGetTodosByStatusQuery({status:TodoStatus.OFF_TRACK})
    const {data:done} = useGetTodosByStatusQuery({status:TodoStatus.DONE})

    const numberOnTrack = onTrack?.payload.data.length || 0
    const numberDone = done?.payload.data.length || 0
    const numberOffTrack = offTack?.payload.data.length || 0


    const track = [
        {"name":"ON_TRACK","number":numberOnTrack},
        {"name":"DONE","number":numberDone},
        {"name":"OFF_TRACK","number":numberOffTrack}
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
        <Text className="font-poppins-bold text-white">Todos Status</Text>
         <View className="flex flex-row justify-between">
            {track.map((status,index) =>(
               <View key={index} className="flex flex-col justify-center items-center gap-1">
                 <Text className={`border px-2 py-1 rounded-lg font-poppins text-white ${getBoderColor(status.name)}`}>{status.name}</Text>
                 <Text className="font-poppins-medium text-white">{status.number}</Text>
              </View>
            ))}
            <Text className="px-2 py-1 rounded-lg border boder-gray-600 h-9 font-poppins-medium text-white" onPress={props.onPress}>Add New</Text>
        </View>
      </View>
    )
} 