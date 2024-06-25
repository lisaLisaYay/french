import "./App.css";
import StartPage from "./StartPage";
import { Route, Routes } from "react-router-dom";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="test" element={<TestPage/>}/>
          <Route path="result" element={<ResultPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
