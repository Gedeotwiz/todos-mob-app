import ForgotForm from "@/components/forms/ForgotForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace("/auth/Login")}>
            <MaterialCommunityIcons name="arrow-left" size={21} color="#393452" />
          </Pressable>
          <View style={styles.iconCircle}><MaterialCommunityIcons name="lock-reset" size={34} color="#7152e8" /></View>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>Enter the email address linked to your account. We’ll send you a code to reset your password.</Text>
          <View style={styles.formCard}>
            <ForgotForm
              onPress={(email) => router.push({ pathname: "/auth/VerfyOtp", params: { email } })}
              onClick={() => router.push("/auth/Login")}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fc" }, flex: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 28 },
  backButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 14, borderWidth: 1, borderColor: "#ececf2" },
  iconCircle: { width: 68, height: 68, borderRadius: 22, backgroundColor: "#eeeaff", alignItems: "center", justifyContent: "center", marginTop: 42, marginBottom: 20 },
  title: { color: "#25213d", fontSize: 28, fontWeight: "700", letterSpacing: -0.8 }, subtitle: { color: "#858ba2", fontSize: 14, lineHeight: 21, marginTop: 8, marginBottom: 22 },
  formCard: { backgroundColor: "white", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#e9eaf1", shadowColor: "#292347", shadowOpacity: 0.04, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
});
