
import DoneTodos from "@/components/todos/DoneTodos";
import OffTrackTodos from "@/components/todos/OffTrackTodos";
import OnTrackTodos from "@/components/todos/OnTrackTodos";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import back from "../../assets/icon/back.png";

const Tab = createMaterialTopTabNavigator();




export default function TodosScreen() {

  const router = useRouter()
  return (
    <View className="flex-1 py-10 px-5">
      <TouchableOpacity className="py-5 flex flex-row justify-between items-center w-2/3 pr-5" onPress={() => router.back()}>
          <Image source={back} className="w-10 h-10" />
          <Text className="text-xl font-poppins-medium">Todos List</Text>
      </TouchableOpacity>
      
    < Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="ON_TRACK" component={OnTrackTodos} />
      <Tab.Screen name="DONE" component={DoneTodos} />
      <Tab.Screen name="OFF_TRACK" component={OffTrackTodos} />
    </Tab.Navigator>
    </View>
  );
}
