import ContinueButton from "@/components/__ui__/continueButon";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";


export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex flex-col justify-center items-center gap-8 h-full">
      <Text className="font-bold text-3xl">Welcome to the App 👋</Text>
      <ContinueButton name="Continue" onPress={() => router.replace("./(tabs)")}/>
    </View>
  );
}
