import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './Store';
import Admin from './Admin';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App; 