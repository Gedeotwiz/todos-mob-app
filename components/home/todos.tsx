import { ScrollView, Text, View } from "react-native";
import { useGetTodosQuery } from "../rtk/auth/api.slice";
import { TodoResponse } from "../rtk/types/integration.type";
import TodosCard from "./todo-card";

interface IProps {
  onPress: () => void;
  click:()=>void
}

export default function HomeTodos(props: IProps) {
  const { data } = useGetTodosQuery({} as any);
  
  const rawTodos = data?.payload?.data ?? []
  const todos = [...rawTodos].slice(-2)

  return (
    <View>
      <View className="flex flex-row justify-between items-center px-4 pb-3">
        <Text className="font-semibold">New Todos</Text>
        <Text className="font-semibold text-blue-600" onPress={props.onPress}>
          All Todos
        </Text>
      </View>

      <View className="bg-gray-200 rounded-lg px-4 h-full pb-36">
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ gap: 8, paddingVertical: 5 }}>
          {todos.reverse().map((todo: TodoResponse, index: number) => {
            return (
              <TodosCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                summary={todo.summary}
                index={index}
                click={props.click}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}