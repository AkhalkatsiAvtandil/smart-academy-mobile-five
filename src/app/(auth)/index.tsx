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

const JOHND_PASSWORD = "m38rmF$";

const LoginScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(JOHND_PASSWORD);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username.trim()) {
      setError("Enter your username.");
      return;
    }

    if (username.trim() !== "johnd") {
      setError("Invalid username.");
      return;
    }

    if (password !== JOHND_PASSWORD) {
      setError("Invalid password.");
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: JOHND_PASSWORD,
        }),
      });

      const result = await response.json();
      if (result.token) {
        await AsyncStorage.setItem("token", result.token);
        router.replace({ pathname: "/(tabs)" });
      } else {
        setError("Login failed. Try the username again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
          <AppTitle title="Welcome back" />
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <AppInput
            placeholder="Username"
            onChangeText={(value) => setUsername(value)}
            inputStyles={styles.input}
          />
          <AppInput
            placeholder="Password"
            value={password}
            secureTextEntry={false}
            onChangeText={(value) => setPassword(value)}
            inputStyles={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <AppButton title="Log In" onPress={handleLogin} />
          </View>

          <Link href="/(auth)/register" style={styles.link}>
            Create an account
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  input: {
    marginHorizontal: 16,
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    marginHorizontal: 16,
    marginTop: 4,
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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    marginVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    width: "90%",
    alignSelf: "center",
  },
});
