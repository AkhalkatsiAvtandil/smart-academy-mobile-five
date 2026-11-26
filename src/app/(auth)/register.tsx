import AppButton from "@/components/appButton/AppButton";
import AppInput from "@/components/appInput/AppInput";
import AppTitle from "@/components/appTitle/AppTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!username.trim() || !password || !email.trim()) {
      setError("Enter username, password, and email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        setError("Registration failed. Please try again.");
        return;
      }

      await AsyncStorage.setItem("registeredUser", username);
      router.replace("/(auth)" as never);
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Could not connect. Please try again.");
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <AppTitle title="Create account" />
          <Text style={styles.subtitle}>Enter your details to register</Text>
          <AppInput
            placeholder="Enter Username..."
            onChangeText={setUsername}
          />
          <AppInput
            placeholder="Enter Password..."
            secureTextEntry
            onChangeText={setPassword}
          />
          <AppInput
            placeholder="Confirm Password..."
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
          <AppInput
            placeholder="Enter Email..."
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.buttonContainer}>
            <AppButton title="Register" onPress={handleRegister} />
          </View>
          <Link href="/(auth)" style={styles.link}>
            Back to login
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingTop: 8,
    paddingBottom: 20,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  error: {
    color: "#b91c1c",
    marginHorizontal: 16,
    marginTop: 4,
  },
});
