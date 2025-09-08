import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useGetTodosQuery } from "../Redux/auth/api.slice";
import { TodoResponse } from "../Redux/types/integration.type";
import TodosCard from "./Todo-card";

interface IProps {
  onPress: () => void;
}

export default function HomeTodos(props: IProps) {
  const { data } = useGetTodosQuery({} as any);
  
  const rawTodos = data?.payload?.data ?? []
  const todos = [...rawTodos].slice(-2)

  const router = useRouter()

  return (
    <View>
      <View className="flex flex-row justify-between items-center px-4 pb-3">
        <Text className="font-poppins-medium text-white">New Todos</Text>
        <Text className="font-poppins-medium text-blue-600" onPress={props.onPress}>
          All Todos
        </Text>
      </View>

      <View className=" px-4 h-full pb-36">
        <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={{ gap: 8, paddingVertical: 5 }}>
          {todos.reverse().map((todo: TodoResponse, index: number) => {
            return (
              <TodosCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                summary={todo.summary}
                time={todo.time}
                status={todo.status}
                index={index}
                click={() =>
                  router.push({
                    pathname: "/todos/TodoDetail",
                    params: {
                      id: String(todo.id),
                      title: todo.title,
                      summary: todo.summary,
                      description: todo.description,
                      time: todo.time,
                      status:todo.status
                    },
                  })
                }
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}