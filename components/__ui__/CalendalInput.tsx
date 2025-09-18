import React, { useState } from "react";
import { View, Platform, TouchableOpacity, Text, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import vecto from "../../assets/icon/Vecto.png";

interface IProps {
  onChangeDate: (date: Date) => void;
  selectedDate: Date;
}

export default function CalendarInput({ onChangeDate, selectedDate }: IProps) {
  const [show, setShow] = useState(false);

  const onChange = (event: any, date?: Date) => {
    setShow(Platform.OS === "ios"); 
    if (date) onChangeDate(date);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity 
        onPress={() => setShow(true)} 
        className="flex flex-row justify-start items-center gap-2 bg-[#05243E] p-2 rounded-md w-full"
      >
        <Image source={vecto}/>
        <Text className="text-white text-xl font-bold"
          style={{
            textShadowColor: '#2563eb',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        >
          Date
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={selectedDate}
          mode="date"       
          display="default"   
          onChange={onChange}
        />
      )}
    </View>
  );
}
