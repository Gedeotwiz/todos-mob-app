import { Card } from "@ui-kitten/components";
import { ScrollView, Text, View } from "react-native";
import { useGetTodosQuery } from "../rtk/auth/api.slice";

export default function TodosCard() {
  const { data } = useGetTodosQuery();

  return (
    <View className="flex-1">
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ gap: 8, paddingVertical: 5 }}
      >
        {data?.payload?.data?.map((todo: { id: string; title: string; description: string }, index: number) => (
          <Card key={todo.id || index}>
            <View className="flex flex-row justify-between items-end">
              <View className="flex flex-col gap-2">
                <Text className="font-bold text-lg">{todo.title}</Text>
                <Text>{todo.description}</Text>
              </View>
              <View>
                <Text className="text-blue-600">Edit</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
