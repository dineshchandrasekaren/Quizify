import { StyleSheet } from "react-native";
import Card from "./Card";
import Options from "./Options";
import { Question } from "../types";
import { useQuizContext } from "../providers/QuizProvider";

const QuestionCard = ({ question }: Question) => {
  const { selectedOption, dispatch } = useQuizContext();
  return (
    <Card title={question.question}>
      {question.options.map((option, index) => (
        <Options
          key={option}
          option={option}
          onPress={() => {
            dispatch({
              type: "answer/setSelectedOption",
              payload: { selectedOption: index },
            });
          }}
          isSelected={selectedOption === index}
        />
      ))}
    </Card>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({});
