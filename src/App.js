import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import PlayerDraftComparer from './components/PlayerDraftComparator';
import RivalryChecker from './components/RivalryChecker';
import MainLayout from './layouts/MainLayout';
import PlayerSplit from "./components/PlayerSplit";

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap main routes with the MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PlayerSplit />} />
          <Route path="draft" element={<PlayerDraftComparer />} />
          <Route path="rivalry" element={<RivalryChecker />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
