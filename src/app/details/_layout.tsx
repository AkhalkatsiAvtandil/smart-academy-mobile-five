import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const DetailsLayout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Details",
        headerStyle: {
          backgroundColor: "#ede1de",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ marginRight: 10, color: "#000000" }}>უკან</Text>
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default DetailsLayout;
