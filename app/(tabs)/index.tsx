import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useGetTodosQuery, useUserLogedInQuery } from "@/components/Redux/auth/api.slice";
import { TodoStatus } from "@/components/Redux/types/enum";
import { TodoResponse } from "@/components/Redux/types/integration.type";

const palette = { ink: "#25213d", purple: "#7152e8", page: "#f7f8fc", muted: "#8a8ea4", line: "#e8e9f0" };
type Filter = "All tasks" | "My tasks" | "Needs attention";

function TaskCard({ todo, onPress }: { todo: TodoResponse; onPress: () => void }) {
  const badge = todo.status === TodoStatus.DONE
    ? { label: "COMPLETED", color: "#dff4e9", ink: "#299a6e" }
    : todo.status === TodoStatus.OFF_TRACK
      ? { label: "NEEDS ATTENTION", color: "#fff0e5", ink: "#d97939" }
      : { label: "IN PROGRESS", color: "#e7edff", ink: "#5878dc" };
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.badge, { backgroundColor: badge.color }]}><Text style={[styles.badgeText, { color: badge.ink }]}>{badge.label}</Text></View>
      <Text style={styles.taskTitle} numberOfLines={2}>{todo.title}</Text>
      {!!todo.summary && <Text style={styles.summary} numberOfLines={2}>{todo.summary}</Text>}
      <View style={styles.cardFooter}>
        <View style={styles.meta}><MaterialCommunityIcons name="calendar-clock-outline" size={15} color={palette.muted} /><Text style={styles.metaText}>{todo.time || "No due date"}</Text></View>
        <MaterialCommunityIcons name="chevron-right" size={21} color="#a5a8b8" />
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All tasks");
  const { data, isLoading, isError, refetch } = useGetTodosQuery({ page: 1, size: 50 });
  const { data: user } = useUserLogedInQuery();
  const todos = useMemo(() => (data?.payload?.data ?? []).filter((todo) => todo.title.toLowerCase().includes(search.trim().toLowerCase())), [data, search]);
  const sections: { title: string; status: TodoStatus; color: string; countColor: string }[] = [
    { title: "To do", status: TodoStatus.OFF_TRACK, color: "#a084e8", countColor: "#eee8ff" },
    { title: "In progress", status: TodoStatus.ON_TRACK, color: "#6481ed", countColor: "#e7edff" },
    { title: "Completed", status: TodoStatus.DONE, color: "#43ad83", countColor: "#e2f4eb" },
  ];
  const filtered = filter === "Needs attention" ? todos.filter((todo) => todo.status === TodoStatus.OFF_TRACK) : todos;
  const inProgress = todos.filter((todo) => todo.status === TodoStatus.ON_TRACK).length;
  const openTodo = (todo: TodoResponse) => router.push({ pathname: "/todos/TodoDetail", params: { id: String(todo.id), title: todo.title, summary: todo.summary, description: todo.description, time: todo.time, status: todo.status } });

  return (
    <View style={styles.screen}>
      <View style={styles.topbar}>
        <View style={styles.brand}><View style={styles.logo}><MaterialCommunityIcons name="check" size={23} color="white" /></View><Text style={styles.brandText}>taskboard<Text style={{ color: "#a995ff" }}>.</Text></Text></View>
        <Pressable style={styles.addButton} onPress={() => router.push("/todos/AddTodos")}><MaterialCommunityIcons name="plus" size={20} color="white" /><Text style={styles.addText}>New task</Text></Pressable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>✳  PRODUCT TEAM   /   SPRINT 12</Text>
        <View style={styles.headingRow}><View style={{ flex: 1 }}><View style={styles.titleRow}><Text style={styles.heading}>My project</Text><View style={styles.activePill}><Text style={styles.activeText}>Active sprint</Text></View></View><Text style={styles.subtitle}>A little progress each day adds up to big results.</Text></View></View>
        <View style={styles.searchBox}><MaterialCommunityIcons name="magnify" size={20} color={palette.muted} /><TextInput value={search} onChangeText={setSearch} placeholder="Search tasks..." placeholderTextColor="#999caf" style={styles.searchInput} returnKeyType="search" /></View>
        <View style={styles.filterRow}>{(["All tasks", "My tasks", "Needs attention"] as Filter[]).map((item, index) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filterChip, filter === item && styles.filterSelected]}><Text style={[styles.filterText, filter === item && styles.filterTextSelected]}>{item}</Text><Text style={[styles.filterCount, index === 2 && { color: "#c27539", backgroundColor: "#fff0e4" }]}>{index === 2 ? todos.filter((todo) => todo.status === TodoStatus.OFF_TRACK).length : index === 1 ? user?.payload?.names ? todos.length : 0 : todos.length}</Text></Pressable>)}</View>
        <View style={styles.progressRow}><Text style={styles.progressText}>{inProgress} tasks in progress</Text><View style={styles.avatars}><Text style={styles.avatar}>JD</Text><Text style={[styles.avatar, { backgroundColor: "#ed8a68" }]}>MC</Text><Text style={[styles.avatar, { backgroundColor: "#40aa8f" }]}>AM</Text></View></View>
        {isLoading ? <ActivityIndicator color={palette.purple} style={{ marginTop: 30 }} /> : isError ? <View style={styles.empty}><Text style={styles.emptyTitle}>Couldn’t load your tasks</Text><Pressable onPress={() => refetch()}><Text style={styles.retry}>Try again</Text></Pressable></View> : sections.map((section) => {
          const tasks = filtered.filter((todo) => todo.status === section.status);
          if (filter === "Needs attention" && section.status !== TodoStatus.OFF_TRACK) return null;
          return <View key={section.title} style={styles.section}><View style={styles.sectionHeader}><View style={[styles.dot, { backgroundColor: section.color }]} /><Text style={styles.sectionTitle}>{section.title}</Text><Text style={[styles.sectionCount, { backgroundColor: section.countColor }]}>{tasks.length}</Text><Pressable style={styles.more}><MaterialCommunityIcons name="dots-horizontal" size={22} color="#a2a5b6" /></Pressable></View>
            {tasks.length ? tasks.map((todo) => <TaskCard key={todo.id} todo={todo} onPress={() => openTodo(todo)} />) : <Text style={styles.noTasks}>Nothing here yet</Text>}
            <Pressable style={styles.addTaskRow} onPress={() => router.push("/todos/AddTodos")}><MaterialCommunityIcons name="plus" size={19} color={palette.muted} /><Text style={styles.addTaskText}>Add a task</Text></Pressable>
          </View>;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.page },
  topbar: { minHeight: 76, backgroundColor: "#2c2748", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 }, logo: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#7958ed", alignItems: "center", justifyContent: "center" }, brandText: { fontSize: 21, color: "white", fontWeight: "700", letterSpacing: -0.7 },
  addButton: { height: 42, paddingHorizontal: 13, borderRadius: 12, backgroundColor: palette.purple, flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center" }, addText: { color: "white", fontSize: 14, fontWeight: "600" },
  scroll: { flex: 1 }, content: { paddingHorizontal: 18, paddingTop: 25, paddingBottom: 32 }, eyebrow: { color: "#9499b0", fontSize: 10, fontWeight: "700", letterSpacing: 1.2, marginBottom: 12 }, headingRow: { flexDirection: "row", alignItems: "center" }, titleRow: { flexDirection: "row", alignItems: "center", gap: 10 }, heading: { color: palette.ink, fontSize: 27, fontWeight: "700", letterSpacing: -0.8 }, activePill: { backgroundColor: "#e4f4ed", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 }, activeText: { color: "#29956e", fontSize: 10, fontWeight: "700" }, subtitle: { color: "#9297ad", fontSize: 12, marginTop: 4 },
  searchBox: { height: 44, marginTop: 18, borderWidth: 1, borderColor: palette.line, borderRadius: 12, backgroundColor: "white", paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 8 }, searchInput: { flex: 1, color: palette.ink, fontSize: 13, paddingVertical: 0 },
  filterRow: { flexDirection: "row", gap: 7, borderBottomWidth: 1, borderColor: palette.line, marginTop: 17 }, filterChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 10, paddingHorizontal: 7, borderBottomWidth: 2, borderBottomColor: "transparent" }, filterSelected: { borderBottomColor: palette.purple }, filterText: { color: "#858ba2", fontSize: 11 }, filterTextSelected: { color: "#413a64", fontWeight: "700" }, filterCount: { overflow: "hidden", borderRadius: 10, backgroundColor: "#eeeaff", color: "#6955c3", paddingHorizontal: 6, paddingVertical: 2, fontSize: 9, fontWeight: "700" },
  progressRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 9, paddingVertical: 13 }, progressText: { color: "#9297ad", fontSize: 11 }, avatars: { flexDirection: "row" }, avatar: { overflow: "hidden", width: 25, height: 25, lineHeight: 25, textAlign: "center", borderRadius: 15, color: "white", fontWeight: "700", fontSize: 8, backgroundColor: "#7859e9", marginLeft: -4, borderWidth: 1, borderColor: palette.page },
  section: { backgroundColor: "#f0f1f7", borderColor: "#e9eaf1", borderWidth: 1, borderRadius: 15, padding: 13, marginBottom: 14 }, sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10, paddingHorizontal: 2 }, dot: { height: 9, width: 9, borderRadius: 5 }, sectionTitle: { fontWeight: "700", color: palette.ink, fontSize: 15 }, sectionCount: { color: "#666b83", paddingHorizontal: 7, paddingVertical: 3, overflow: "hidden", borderRadius: 12, fontSize: 10, fontWeight: "700" }, more: { marginLeft: "auto", paddingHorizontal: 2 },
  card: { backgroundColor: "white", borderRadius: 12, borderWidth: 1, borderColor: "#e9eaf0", padding: 13, marginBottom: 9 }, badge: { alignSelf: "flex-start", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 8 }, badgeText: { fontSize: 9, fontWeight: "700", letterSpacing: 0.3 }, taskTitle: { color: palette.ink, fontSize: 14, fontWeight: "600" }, summary: { color: "#8b90a6", fontSize: 11, marginTop: 4 }, cardFooter: { borderTopWidth: 1, borderColor: "#f0f1f5", marginTop: 10, paddingTop: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, meta: { flexDirection: "row", alignItems: "center", gap: 5 }, metaText: { color: palette.muted, fontSize: 10 },
  addTaskRow: { height: 38, borderWidth: 1, borderColor: "#d9dbe6", borderStyle: "dashed", borderRadius: 9, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 10 }, addTaskText: { color: palette.muted, fontSize: 12 }, noTasks: { color: "#9a9eaf", fontSize: 12, paddingVertical: 12, paddingHorizontal: 4 }, empty: { alignItems: "center", padding: 28 }, emptyTitle: { color: palette.ink, fontSize: 15, fontWeight: "600" }, retry: { color: palette.purple, marginTop: 8, fontWeight: "600" },
});
