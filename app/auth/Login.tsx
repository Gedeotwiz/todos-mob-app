import LoginForm from "@/components/forms/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DecodedToken { exp: number }

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          await AsyncStorage.removeItem("token");
          Alert.alert("Session expired", "Please log in again.");
        }
      } catch (error) {
        console.error("Token check failed", error);
        await AsyncStorage.removeItem("token");
      }
    };
    void checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace("/onboarding")}>
            <MaterialCommunityIcons name="arrow-left" size={21} color="#393452" />
          </Pressable>
          <View style={styles.brandRow}><View style={styles.logo}><MaterialCommunityIcons name="check" size={20} color="white" /></View><Text style={styles.brand}>taskboard<Text style={styles.brandDot}>.</Text></Text></View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to pick up where you left off.</Text>
          <View style={styles.formCard}><LoginForm onPress={() => router.push("/auth/ForgotPassword")} onLogin={() => router.replace("/(tabs)")} /></View>
          <View style={styles.footer}><Text style={styles.footerText}>Don’t have an account?</Text><Pressable onPress={() => router.replace("/auth/Signup")}><Text style={styles.link}>Create one</Text></Pressable></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fc" }, flex: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 28 },
  backButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 14, borderWidth: 1, borderColor: "#ececf2" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 30, marginBottom: 28 }, logo: { width: 34, height: 34, borderRadius: 11, backgroundColor: "#7858e9", alignItems: "center", justifyContent: "center" }, brand: { color: "#2c2748", fontSize: 20, fontWeight: "700", letterSpacing: -0.6 }, brandDot: { color: "#8d71f1" },
  title: { color: "#25213d", fontSize: 29, fontWeight: "700", letterSpacing: -0.8 }, subtitle: { color: "#858ba2", fontSize: 14, marginTop: 6, marginBottom: 22 }, formCard: { backgroundColor: "white", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#e9eaf1", shadowColor: "#292347", shadowOpacity: 0.04, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 23 }, footerText: { color: "#858ba2", fontSize: 13 }, link: { color: "#7152e8", fontSize: 13, fontWeight: "700" },
});
