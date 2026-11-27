import { StyleSheet, Text } from "react-native";

const AppTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    color: "#183b30",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 40,
    textAlign: "center",
    marginTop: 18,
  },
});
