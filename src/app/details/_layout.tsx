import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DetailsLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Details",
        headerStyle: {
          backgroundColor: "#f6f7f3",
        },
        headerShadowVisible: false,
        headerTintColor: "#183b30",
        headerTitleStyle: {
          color: "#183b30",
          fontSize: 18,
          fontWeight: "800",
        },
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>უკან</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default DetailsLayout;

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#e7eee8",
    borderRadius: 20,
    justifyContent: "center",
    marginLeft: 8,
    minHeight: 36,
    paddingHorizontal: 14,
  },
  backText: {
    color: "#183b30",
    fontSize: 14,
    fontWeight: "800",
  },
});
