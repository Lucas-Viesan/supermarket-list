import "./App.css";
import { HomeScreen, ListScreen } from "./Screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/List" element={<ListScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
