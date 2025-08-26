import { Stack } from 'expo-router';
import { Text, View } from 'react-native';



export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
       <View className=" h-full flex flex-col justify-center items-center ">
       <Text>Page not found</Text>
     </View>
    </>
  );
}


