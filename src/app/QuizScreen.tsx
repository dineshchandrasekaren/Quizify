import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import QuestionCard from "../components/QuestionCard";

import Card from "../components/Card";
import { useQuizContext } from "../providers/QuizProvider";
import LottieView from "lottie-react-native";

const QuizScreen = () => {
  const {
    isFinished,
    currentIndex,
    totalQuestion,
    currentQuestion,
    score,
    bestScore,
    time,
    dispatch,
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
              Question {currentIndex + 1}/{totalQuestion}
            </Text>
          ) : (
            <Text
              style={{ color: "#a262f5", fontSize: 18, fontWeight: "bold" }}
            >
              Completed
            </Text>
          )}
          {!isFinished ? (
            <>
              <QuestionCard question={currentQuestion} />
              <Text>{time}</Text>
            </>
          ) : (
            <>
              <LottieView
                style={StyleSheet.absoluteFill}
                source={require("../../assets/party.json")}
                autoPlay
                loop={false}
              />
              <Card title="Result">
                <Text>Your Score: {score}</Text>
                <Text>HighScore: {bestScore}</Text>
              </Card>
            </>
          )}

          <CustomButton
            name={isFinished ? "Restart" : "Next"}
            onPress={() => {
              dispatch(
                isFinished
                  ? { type: "quiz/reset", payload: {} }
                  : { type: "question/nextIndex", payload: {} }
              );
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default QuizScreen;
