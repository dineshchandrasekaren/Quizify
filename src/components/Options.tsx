import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Options = { isSelected: boolean; onPress: () => void; option: string };

const Options = ({ onPress, isSelected = false, option }: Options) => {
  return (
    <Text
      style={[
        styles.option,
        { backgroundColor: isSelected ? "#c59ef7" : "white" },
      ]}
      onPress={onPress}
    >
      {option}
    </Text>
  );
};

export default Options;

const styles = StyleSheet.create({
  option: {
    borderColor: "#999",
    borderWidth: 1,
    padding: 14,
    borderRadius: 30,
    marginBottom: 10,

    fontSize: 16,
  },
});
