import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";

type Card = {
  title: string;
};
const Card = ({ title, children }: PropsWithChildren<Card>) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  title: { fontSize: 25, fontWeight: "bold", marginBottom: 10 },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 10,
    elevation: 5,
  },
});
