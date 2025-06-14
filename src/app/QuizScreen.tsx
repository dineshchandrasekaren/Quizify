import { View, Text, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import QuestionCard from "../components/QuestionCard";

import Card from "../components/Card";
import { useQuizContext } from "../providers/QuizProvider";

const QuizScreen = () => {
  const {
    isFinished,
    currentQuestionIndex,
    totalQuestion,
    onNext,
    currentQuestion,
    score,
    bestScore,
  } = useQuizContext();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ebe4f5",
            padding: 20,
          }}
        >
          {!isFinished ? (
            <Text
              style={{ color: "#a262f5", fontSize: 18, fontWeight: "bold" }}
            >
              Question {currentQuestionIndex + 1}/{totalQuestion}
            </Text>
          ) : (
            <Text
              style={{ color: "#a262f5", fontSize: 18, fontWeight: "bold" }}
            >
              Completed
            </Text>
          )}
          {!isFinished ? (
            <QuestionCard question={currentQuestion} />
          ) : (
            <Card title="Result">
              <Text>Your Score: {score}</Text>
              <Text>HighScore: {bestScore}</Text>
            </Card>
          )}

          <CustomButton
            name={isFinished ? "Restart" : "Next"}
            onPress={onNext}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default QuizScreen;
