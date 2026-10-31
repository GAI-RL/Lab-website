import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Research from "./components/researchpage.jsx";
import JoinUs from "./pages/JoinUs";
import ProjectDetail from "./components/projectDetails.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/researchpage" element={<Research />} />
        <Route path="/research" element={<Research />} />
        <Route path="/join" element={<JoinUs />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

