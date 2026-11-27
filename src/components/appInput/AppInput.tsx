import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type AppInputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string | undefined;
  inputStyles?: ViewStyle;
} & TextInputProps;

const AppInput = ({
  placeholder = "Enter Text...",
  onChangeText,
  value,
  inputStyles,
  ...props
}: AppInputProps) => {
  return (
    <View style={[inputStyles, styles.inputContainer]}>
      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor="#91a097"
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
      />
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 14,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#e8ece6",
    backgroundColor: "#f3f5f0",
    marginVertical: 7,
  },
  textInput: {
    color: "#202d27",
    fontSize: 15,
    minHeight: 48,
  },
});
