import { Card } from '@ui-kitten/components';
import { ScrollView, Text, View } from "react-native";

export default function TodosCard() {
  return (
    <View className='flex-1'>
    <ScrollView
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{ gap: 8, paddingVertical: 5 }}
    >
      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>

      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>
      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>
      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>
      <Card>
        <View className="flex flex-row justify-between items-end">
          <View className="flex flex-col gap-2">
            <Text className="font-bold text-lg">Title</Text>
            <Text>Description</Text>
          </View>
          <View>
            <Text className="text-blue-600">Edit</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
    </View>
  );
}
