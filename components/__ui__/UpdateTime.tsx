import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import CalendarInput from "./CalendalInput";
import { useDoneTodoUpdateMutation } from "../Redux/auth/api.slice";
import anser from "../../assets/icon/anser.png";
import vect from "../../assets/icon/Vector.png";

interface IProps {
  onPress: () => void
  onSuccess: () => void
}

export default function UpdateTime(props: IProps) {
  const { id, title, summary, description, time, status } = useLocalSearchParams();
  const [date, setDate] = useState(new Date());
  const [disabled, setDisabled] = useState<boolean>(false);

  const [ChangeDate] = useDoneTodoUpdateMutation();

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  const data = {
    title: String(title),
    summary: String(summary),
    description: String(description),
    time: formattedDate,
    status: String(status),
  };

  const HandleSubmit = async () => {
    try {
      const res = await ChangeDate({ id: String(id), DTO: data }).unwrap();
      Alert.alert("✅ Success", res.message);
      setDisabled(true);
      props.onSuccess(); 
    } catch (error) {
      console.log(error);
      Alert.alert("❌ Error", "Failed to update");
    }
  };

  return (
    <View className="flex flex-col gap-10">
      {/* Title */}
      <View className="bg-[#05243E] rounded-md py-2 px-4 flex flex-row items-center gap-2">
        <Image source={anser}/>
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>

      {/* Description */}
      <View className="bg-[#05243E] rounded-md py-2 px-4 flex flex-row gap-2 h-[150px]">
        <Image source={vect}/>
        <View className="w-[265px] gap-2">
          <Text className="text-white text-xl font-bold">Description</Text>
          <Text className="text-white">{description}</Text>
        </View>
      </View>

      {/* Calendar + Deadline */}
      <View className="flex flex-row justify-between items-center gap-2">
        <CalendarInput onChangeDate={setDate} selectedDate={date} />
        <View className="bg-[#05243E] flex flex-row items-center gap-1 w-1/2 p-2 rounded-md">
          <Text className="text-white font-poppins-bold">Deadline:</Text>
          <Text className="text-white font-poppins">{time}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex flex-row justify-between items-center gap-2">
        <View className="w-1/2 border border-blue-600 p-2 rounded-md">
          <Text onPress={props.onPress} className="text-center font-poppins-bold">Cancel</Text>
        </View>
        
        <TouchableOpacity
          onPress={HandleSubmit}
          disabled={disabled}
          className={`rounded-md p-2 items-center justify-center w-1/2 ${
            disabled ? 'bg-gray-400' : 'bg-blue-600'
          }`}
        >
          <Text className="text-white font-poppins-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
