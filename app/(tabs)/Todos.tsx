import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useGetTodosByStatusQuery } from "@/components/Redux/auth/api.slice";
import { TodoStatus } from "@/components/Redux/types/enum";
import { TodoResponse } from "@/components/Redux/types/integration.type";
import TodosCard from "@/components/home/Todo-card";

const tabs: { label: string; status: TodoStatus }[] = [
  { label: "To do", status: TodoStatus.OFF_TRACK },
  { label: "In progress", status: TodoStatus.ON_TRACK },
  { label: "Completed", status: TodoStatus.DONE },
];

export default function TodosScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.ON_TRACK);
  const { data, isLoading, isError, refetch } = useGetTodosByStatusQuery({ status });
  const todos = data?.payload?.data ?? [];

  const openTodo = (todo: TodoResponse) => router.push({
    pathname: "/todos/TodoDetail",
    params: {
      id: String(todo.id),
      title: todo.title,
      summary: todo.summary,
      description: todo.description,
      time: todo.time,
      status: todo.status,
    },
  });

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR WORKSPACE</Text>
          <Text style={styles.title}>All tasks</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => router.push("/todos/AddTodos")}>
          <MaterialCommunityIcons name="plus" size={19} color="#fff" />
          <Text style={styles.addLabel}>New task</Text>
        </Pressable>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable key={tab.status} onPress={() => setStatus(tab.status)} style={[styles.tab, status === tab.status && styles.activeTab]}>
            <Text style={[styles.tabLabel, status === tab.status && styles.activeTabLabel]}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {isLoading ? <ActivityIndicator color="#7152e8" style={styles.state} /> : null}
        {isError ? (
          <View style={styles.state}>
            <Text style={styles.emptyTitle}>Couldn’t load your tasks</Text>
            <Pressable onPress={() => refetch()}><Text style={styles.retry}>Try again</Text></Pressable>
          </View>
        ) : null}
        {!isLoading && !isError && todos.length === 0 ? <Text style={styles.empty}>No {tabs.find((tab) => tab.status === status)?.label.toLowerCase()} tasks yet.</Text> : null}
        {todos.map((todo, index) => (
          <TodosCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            summary={todo.summary}
            time={todo.time}
            status={todo.status}
            index={index}
            click={() => openTodo(todo)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f7f8fc", paddingHorizontal: 18, paddingTop: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  eyebrow: { fontSize: 10, fontWeight: "700", color: "#9297ad", letterSpacing: 1.1 },
  title: { marginTop: 4, fontSize: 27, lineHeight: 34, fontWeight: "700", color: "#25213d" },
  addButton: { backgroundColor: "#7152e8", borderRadius: 11, paddingVertical: 10, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 4 },
  addLabel: { color: "white", fontSize: 12, fontWeight: "600" },
  tabs: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e8e9f0", marginBottom: 12 },
  tab: { flex: 1, alignItems: "center", paddingVertical: 12, borderBottomWidth: 2, borderBottomColor: "transparent" },
  activeTab: { borderBottomColor: "#7152e8" },
  tabLabel: { fontSize: 12, color: "#858ba2" },
  activeTabLabel: { color: "#4b3c89", fontWeight: "700" },
  list: { gap: 10, paddingTop: 4, paddingBottom: 24 },
  state: { alignItems: "center", justifyContent: "center", paddingVertical: 36 },
  empty: { textAlign: "center", color: "#9297ad", paddingVertical: 32, fontSize: 13 },
  emptyTitle: { color: "#25213d", fontSize: 14, fontWeight: "600" },
  retry: { marginTop: 8, color: "#7152e8", fontWeight: "600" },
});
