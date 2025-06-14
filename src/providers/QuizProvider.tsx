import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Question } from "../types";
import questions from "../data/questions";
import AsyncStorage from "@react-native-async-storage/async-storage";

type QuizContext = {
  currentQuestionIndex: number;
  setSelectedOption: Dispatch<SetStateAction<number | undefined>>;
  currentQuestion: Question["question"];
  onNext: () => void;
  selectedOption: number | undefined;
  totalQuestion: number;
  isFinished: boolean;
  score: number;
  bestScore: number;
  time: number;
  //   reset: () => void;
};

const QuizContext = createContext<QuizContext>({} as QuizContext);

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>();

  const currentQuestion = questions[currentQuestionIndex];
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const isFinished = currentQuestionIndex >= questions.length;
  const [time, setTime] = useState(6);

  useEffect(() => {
    let clear: NodeJS.Timeout;
    clear = setInterval(() => setTime((t) => t - 1), 1000);
    if (time === 0) {
      onNext();
    } else if (isFinished) {
      clearInterval(clear);
    }
    return () => clearInterval(clear);
  }, [time]);
  useEffect(() => {
    saveBestScore();
  }, []);
  useEffect(() => {
    if (isFinished === true && score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [isFinished]);

  const saveBestScore = async (setNew?: number) => {
    let newScore: number | undefined = setNew;
    if (setNew) {
      await AsyncStorage.setItem("bestscore", setNew.toString());
    } else {
      const storedScore = await AsyncStorage.getItem("bestscore");
      newScore = storedScore !== null ? Number.parseInt(storedScore) : 0;
    }
    setBestScore(newScore ?? 0);
  };

  const onNext = () => {
    setTime(6);
    if (isFinished) {
      setScore(0);
      setCurrentQuestionIndex(0);
      console.log("Dfdsfsfsfd");

      return;
    }

    if (selectedOption === currentQuestion.answer) {
      setScore((i) => i + 1);
    }

    setCurrentQuestionIndex((i) => i + 1);

    setSelectedOption(undefined);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        currentQuestionIndex,
        setSelectedOption,
        onNext,
        selectedOption,
        totalQuestion: questions.length,
        isFinished,
        score,
        bestScore,
        time,
        // reset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
