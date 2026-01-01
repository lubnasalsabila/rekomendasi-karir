import { Routes, Route } from "react-router-dom";
import LoadingPortal from "./pages/CareerDiagnosis/LoadingPortal";
import QuestionPage from "./pages/CareerDiagnosis/QuestionPage";
import FormPage from "./pages/CareerDiagnosis/FormPage";
import { FrontButton } from "./pages/FrontButton";
import ResultPage from "./pages/CareerDiagnosis/Result";
import QuizPage from "./pages/FoodPath/QuizPage";
import ResultFoodPath from "./pages/FoodPath/ResultFoodPath";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontButton />} />

      <Route path="/portal" element={<LoadingPortal />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/result/:id" element={<ResultPage />} />

      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result-food-path" element={<ResultFoodPath />} />
    </Routes>
  );
}

export default App;
