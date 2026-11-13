import AddTodoForm from "@/components/forms/AddTodoForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewTodo() {
  const router = useRouter();
  const handleNext = (todoData: { title: string; summary: string; description: string }) => {
    router.push({ pathname: "/todos/TodoTime", params: todoData });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace("/(tabs)")}>
            <MaterialCommunityIcons name="arrow-left" size={21} color="#393452" />
          </Pressable>
          <Text style={styles.eyebrow}>MAKE A PLAN</Text>
          <Text style={styles.title}>Add a new task</Text>
          <Text style={styles.subtitle}>Write down what you want to get done. You can set a due date next.</Text>
          <View style={styles.formCard}><AddTodoForm onPress={handleNext} /></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fc" }, flex: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 28 },
  backButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 14, borderWidth: 1, borderColor: "#ececf2", marginBottom: 30 },
  eyebrow: { color: "#8a7ac7", fontSize: 10, fontWeight: "700", letterSpacing: 1.3, marginBottom: 7 }, title: { color: "#25213d", fontSize: 28, fontWeight: "700", letterSpacing: -0.8 },
  subtitle: { color: "#858ba2", fontSize: 13, lineHeight: 20, marginTop: 7, marginBottom: 20 },
  formCard: { backgroundColor: "white", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#e9eaf1", shadowColor: "#292347", shadowOpacity: 0.04, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
});
