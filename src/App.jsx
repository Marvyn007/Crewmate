import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import CreateCrewmate from './pages/CreateCrewmate.jsx';
import CrewmateDetails from './pages/CrewmateDetails.jsx';
import UpdateCrewmate from './pages/UpdateCrewmate.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/edit/:id" element={<UpdateCrewmate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;