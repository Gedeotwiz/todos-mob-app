import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TodosCard from "../home/todo-card";
import { useGetTodosByStatusQuery } from "../rtk/auth/api.slice";
import { TodoStatus } from "../rtk/types/enum";
import { TodoResponse } from "../rtk/types/integration.type";
import GLinearGradient from "../ui/GGradient";

export default function OnTrackTodos() {
  const { data } = useGetTodosByStatusQuery({ status: TodoStatus.ON_TRACK });
  const rawTodos = data?.payload?.data ?? [];
  const todos = [...rawTodos];
  const router = useRouter();

  return (
    <GLinearGradient>
    <View className="flex-1 bg-transparent">
      {todos.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-white">
            Todo not found!
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 5 }}
          style={{ backgroundColor: "transparent" }} 
        >
          {todos.reverse().map((todo: TodoResponse, index: number) => (
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
          ))}
        </ScrollView>
      )}
    </View>
    </GLinearGradient>
  );
}
