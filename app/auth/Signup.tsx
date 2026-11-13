import SignUpForm from "@/components/forms/SignupForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Pressable style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace("/auth/Login")}>
            <MaterialCommunityIcons name="arrow-left" size={21} color="#393452" />
          </Pressable>
          <View style={styles.brandRow}><View style={styles.logo}><MaterialCommunityIcons name="check" size={20} color="white" /></View><Text style={styles.brand}>taskboard<Text style={styles.brandDot}>.</Text></Text></View>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>A little progress each day starts here.</Text>
          <View style={styles.formCard}><SignUpForm /></View>
          <View style={styles.footer}><Text style={styles.footerText}>Already have an account?</Text><Pressable onPress={() => router.replace("/auth/Login")}><Text style={styles.link}>Sign in</Text></Pressable></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fc" }, flex: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 8, paddingBottom: 28 },
  backButton: { width: 42, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 14, borderWidth: 1, borderColor: "#ececf2" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 24, marginBottom: 22 }, logo: { width: 34, height: 34, borderRadius: 11, backgroundColor: "#7858e9", alignItems: "center", justifyContent: "center" }, brand: { color: "#2c2748", fontSize: 20, fontWeight: "700", letterSpacing: -0.6 }, brandDot: { color: "#8d71f1" },
  title: { color: "#25213d", fontSize: 27, fontWeight: "700", letterSpacing: -0.8 }, subtitle: { color: "#858ba2", fontSize: 13, marginTop: 6, marginBottom: 18 }, formCard: { backgroundColor: "white", borderRadius: 20, padding: 18, borderWidth: 1, borderColor: "#e9eaf1", shadowColor: "#292347", shadowOpacity: 0.04, shadowRadius: 14, shadowOffset: { width: 0, height: 5 }, elevation: 2 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 20 }, footerText: { color: "#858ba2", fontSize: 13 }, link: { color: "#7152e8", fontSize: 13, fontWeight: "700" },
});
