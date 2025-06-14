import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import React from "react";

interface CustomButton extends PressableProps {
  name: string;
}

const CustomButton = ({ name, ...pressableProps }: CustomButton) => {
  return (
    <Pressable style={styles.buttonContainer} {...pressableProps}>
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#a262f5",
    width: "100%",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
