import { Routes, Route } from "react-router-dom";
import LoadingPortal from "./pages/LoadingPortal";
import QuestionPage from "./pages/QuestionPage";
import FormPage from "./pages/FormPage";
import { FrontButton } from "./pages/FrontButton";
import ResultPage from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontButton />} />
      <Route path="/portal" element={<LoadingPortal />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/result/:id" element={<ResultPage />} />
    </Routes>
  );
}

export default App;
