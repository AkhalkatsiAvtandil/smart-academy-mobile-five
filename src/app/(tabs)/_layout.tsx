import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
        tabBarActiveTintColor: "#1b4938",
        tabBarInactiveTintColor: "#91a097",
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: "#183b30",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "პროდუქტები",
          tabBarLabel: "მარკეტი",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <AntDesign
                name="shop"
                size={20}
                color={focused ? "#1b4938" : "#91a097"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarLabel: "კარტა",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <AntDesign
                name="shopping-cart"
                size={20}
                color={focused ? "#1b4938" : "#91a097"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "პროფილი",
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerActive,
              ]}
            >
              <Feather
                name="user"
                size={19}
                color={focused ? "#1b4938" : "#91a097"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f6f7f3",
  },
  headerTitle: {
    color: "#183b30",
    fontSize: 18,
    fontWeight: "800",
  },
  tabBar: {
    backgroundColor: "#ffffff",
    borderTopColor: "#e5ebe6",
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 10,
    paddingBottom: 7,
    paddingTop: 7,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 15,
    height: 30,
    justifyContent: "center",
    width: 42,
  },
  iconContainerActive: {
    backgroundColor: "#e7eee8",
  },
});
