import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TodosCard from "../home/todo-card";
import { useGetTodosByStatusQuery } from "../rtk/auth/api.slice";
import { TodoStatus } from "../rtk/types/enum";
import { TodoResponse } from "../rtk/types/integration.type";

export default function DoneTodos() {
  const { data } = useGetTodosByStatusQuery({ status: TodoStatus.DONE });
  const rawTodos = data?.payload?.data ?? [];
  const todos = [...rawTodos];
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {todos.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-semibold text-gray-500">
            Todo not found!
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ gap: 8, paddingVertical: 5 }}
        >
          {todos
            .reverse()
            .map((todo: TodoResponse, index: number) => (
              <TodosCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                summary={todo.summary}
                time={todo.time}
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
                    },
                  })
                }
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
}
