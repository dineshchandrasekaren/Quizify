import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Question } from "../types";
import questions from "../data/questions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimer } from "../hooks/useTimer";

type QuizState = {
  currentIndex: number;
  selectedOption: number | undefined;
  totalQuestion: number;
  score: number;
  bestScore: number;
  isFinished: boolean;
};

type QuizContextType = QuizState & {
  currentQuestion: Question["question"];
  time: number;
  dispatch: React.Dispatch<Action>;
};

type Payload = Record<string, any>;

type Action = {
  type:
    | "answer/setSelectedOption"
    | "score/setScore"
    | "score/setBestScore"
    | "question/nextIndex"
    | "quiz/reset";
  payload: Payload;
};

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "answer/setSelectedOption":
      return {
        ...state,
        selectedOption: action.payload.selectedOption,
      };

    case "score/setScore":
      return {
        ...state,
        score: action.payload.score,
      };

    case "score/setBestScore":
      return {
        ...state,
        bestScore: action.payload.bestScore,
      };

    case "question/nextIndex": {
      const isCorrect =
        state.selectedOption === questions[state.currentIndex].answer;

      const newScore = isCorrect ? state.score + 1 : state.score;
      const newIndex = state.currentIndex + 1;
      const isFinished = newIndex >= state.totalQuestion;

      return {
        ...state,
        currentIndex: newIndex,
        selectedOption: undefined,
        score: newScore,
        isFinished,
      };
    }

    case "quiz/reset":
      return {
        ...state,
        currentIndex: 0,
        score: 0,
        selectedOption: undefined,
        isFinished: false,
      };

    default:
      return state;
  }
}

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const { time, startTimer, clearTimer } = useTimer(5);

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    bestScore: 0,
    score: 0,
    selectedOption: undefined,
    totalQuestion: questions.length,
    isFinished: false,
  });

  const currentQuestion = questions[state.currentIndex];

  useEffect(() => {
    loadBestScore();
  }, []);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [state.currentIndex]);

  useEffect(() => {
    if (time <= 0) {
      clearTimer();
      if (!state.isFinished) {
        dispatch({ type: "question/nextIndex", payload: {} });
      }
    }
  }, [time]);

  useEffect(() => {
    if (state.isFinished && state.score > state.bestScore) {
      saveBestScore(state.score);
    }
  }, [state.isFinished]);

  const loadBestScore = async () => {
    const stored = await AsyncStorage.getItem("bestscore");
    const best = stored ? parseInt(stored) : 0;
    dispatch({
      type: "score/setBestScore",
      payload: { bestScore: best },
    });
  };

  const saveBestScore = async (newScore: number) => {
    await AsyncStorage.setItem("bestscore", newScore.toString());
    dispatch({
      type: "score/setBestScore",
      payload: { bestScore: newScore },
    });
  };

  return (
    <QuizContext.Provider
      value={{
        ...state,
        currentQuestion,
        time,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
