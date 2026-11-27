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
          <Text style={styles.eyebrow}>THE MARKET</Text>
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
    marginBottom: 20,
    marginTop: 4,
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
    color: "#507362",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
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
