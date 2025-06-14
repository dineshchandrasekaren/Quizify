import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import Options from "./Options";
import { Question } from "../types";
import { useQuizContext } from "../providers/QuizProvider";

const QuestionCard = ({ question }: Question) => {
  const { setSelectedOption, selectedOption } = useQuizContext();
  return (
    <Card title={question.question}>
      {question.options.map((option, index) => (
        <Options
          key={option}
          option={option}
          onPress={() => {
            setSelectedOption(index);
          }}
          isSelected={selectedOption === index}
        />
      ))}
    </Card>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({});
