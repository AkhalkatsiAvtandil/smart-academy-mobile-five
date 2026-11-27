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
          <Text style={styles.eyebrow}>THE MARKET</Text>
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
    backgroundColor: "#f6f7f3",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  form: {
    backgroundColor: "#ffffff",
    borderColor: "#e8ece6",
    borderRadius: 18,
    borderWidth: 1,
    elevation: 3,
    maxWidth: 420,
    paddingBottom: 24,
    shadowColor: "#183b30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    width: "100%",
    alignSelf: "center",
  },
  eyebrow: {
    color: "#507362",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginTop: 22,
    textAlign: "center",
  },
  subtitle: {
    color: "#748179",
    fontSize: 15,
    marginBottom: 18,
    marginTop: 4,
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  link: {
    color: "#507362",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
    textAlign: "center",
  },
  error: {
    color: "#b91c1c",
    marginHorizontal: 16,
    marginTop: 4,
  },
});
