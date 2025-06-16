# 🧠 Quizify App

**Quizify** is a clean and simple quiz app built using **React Native** and **TypeScript**. It presents one question at a time, automatically navigating to the next after a few seconds. Once the quiz is complete, it shows a results screen with a smooth **Lottie animation**.

---

## ✨ Features

- ⏱️ **Auto-advance every 5 seconds** to the next question  
- ✅ User selects an answer before timeout  
- 📊 Final score shown at the end  
- 🎞️ **Lottie animation** on result screen  
- 🚫 No routing — UI is rendered with **conditional logic**  
- 🔧 Built entirely with **TypeScript** and functional components  

---

## 🧪 How It Works

- On app launch, the first question is shown.
- A **5-second countdown** starts automatically.
- If time runs out or user selects an answer, it moves to the next question.
- After all questions, the app shows the **Results screen** with animation and score.

---

## 📸 Screenshots

| ![Question Screen](https://github.com/user-attachments/assets/fb1491e8-1e2f-4a98-a9f2-81cf22bd56ee) | ![Result Screen](https://github.com/user-attachments/assets/2d875001-35c7-4285-a6a9-aa0534edda2d) | ![Lottie Animation]([https://github.com/user-attachments/assets/lottie-sample.png](https://github.com/user-attachments/assets/5395b920-ebf2-476c-8de1-dd9c9fe5f9bd)) |
|:--:|:--:|:--:|
| Question View | Result View | Lottie Animation |

---

## 🔧 Tech Stack

- **React Native** (no navigation library)
- **TypeScript**
- [Lottie for React Native](https://github.com/lottie-react-native/lottie-react-native)
- **useState**, **useEffect**, and **conditional rendering** for screen flow
