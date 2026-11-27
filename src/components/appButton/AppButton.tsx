import { StyleSheet, Text, TouchableOpacity } from "react-native";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  activeOpacity?: number;
};

const AppButton = ({
  title,
  onPress,
  activeOpacity,
  ...props
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      {...props}
      onPress={onPress}
      activeOpacity={activeOpacity ?? 0.8}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#183b30",
    borderRadius: 13,
    minHeight: 50,
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
