import FormButton from '@/components/forms/FormButton';
import { useAddTodosMutation } from '@/components/Redux/auth/api.slice';
import GLinearGradient from '@/components/ui/GGradient';
import { Calendar } from '@ui-kitten/components';
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";

export default function TodosTime(){
    const router = useRouter();
    const params = useGlobalSearchParams();
    const { title,summary, description } = params as { title: string, summary:string, description: string };
    const [date, setDate] = useState(new Date());
    const [AddTodo,{isLoading}] = useAddTodosMutation();

    const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
    });

    const handleSubmit = async () => {
        if (!title || !description || !date || !summary) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        const time = formattedDate
        const DTO = { title,summary, description, time }
        try {
            const res = await AddTodo(DTO).unwrap();
            Alert.alert("Success", "Todo added successfully");
            console.log("✅ Response:", res);
            router.push("../(tabs)/Todos"); 
        } catch (error: any) {
            console.log("Error object:", error);
            console.log("Error stringified:", JSON.stringify(error, null, 2));

            Alert.alert("Error", error?.data?.message || "Failed to add todo");
        }
    }

    return (
        <GLinearGradient>
      <View className="flex flex-col py-10 px-4">
        <TouchableOpacity className="py-5" onPress={() => router.back()}>
            <Image source={back} className="w-10 h-10" />
        </TouchableOpacity>
        <View className='flex flex-col gap-6'>
             <Text className="text-xl font-bold text-white">Choose todo deadline</Text>
             <Calendar date={date} onSelect={nextDate => setDate(nextDate)} className='bg-white'/>
             <FormButton name='Submit' onPress={handleSubmit} disabled={isLoading}/>
         </View>
      </View>
      </GLinearGradient>
    )
}
