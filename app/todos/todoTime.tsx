import FormButton from '@/components/forms/formButton';
import { useAddTodosMutation } from '@/components/rtk/auth/api.slice';
import { Calendar } from '@ui-kitten/components';
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";

export default function TodosTime(){
    const router = useRouter();
    const params = useGlobalSearchParams();
    const { title, description } = params as { title: string, description: string };
    const [date, setDate] = useState(new Date());
    const [AddTodo,{isLoading}] = useAddTodosMutation();

    const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
    });


    const handleSubmit = async () => {
        if (!title || !description || !date) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        const time = formattedDate
        const DTO = { title, description, time }
        try {
            const res = await AddTodo(DTO).unwrap();
            Alert.alert("Success", "Todo added successfully");
            console.log("✅ Response:", res);
            router.push("./allTodos"); 
        } catch (error: any) {
            console.log("Error object:", error);
            console.log("Error stringified:", JSON.stringify(error, null, 2));

            Alert.alert("Error", error?.data?.message || "Failed to add todo");
        }
    }

    return (
      <View className="flex flex-col py-10 px-4">
        <TouchableOpacity className="py-5" onPress={() => router.back()}>
            <Image source={back} className="w-10 h-10" />
        </TouchableOpacity>
        <View className='flex flex-col gap-6'>
             <Text className="text-xl font-bold">Choose todo deadline</Text>
             <Calendar date={date} onSelect={nextDate => setDate(nextDate)} />
             <FormButton name='Submit' onPress={handleSubmit} disabled={isLoading}/>
         </View>
      </View>
    )
}
