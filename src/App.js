import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import HomePage from './pages/HomePage';
import AddTeamPage from './pages/AddTeamPage';
import UpdateTeamPage from './pages/UpdateTeamPage';
import DeleteTeamPage from './pages/DeleteTeamPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './component/Footer';
import Loading from './component/Loading';
import TeamStats from './pages/TeamStats';
import ViewTeamsPage from './pages/ViewTeamsPage';
import AverageGoalsByYearPage from './pages/AverageGoalsByYearPage';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation(); // Track the current route

  useEffect(() => {
    // Simulate a loading delay whenever the route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loading after 1.8 seconds
    }, 1800); // 1.8 seconds loading time
    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [location]); // Dependency on location to detect route changes

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-team" element={<AddTeamPage />} />
            <Route path="/update-team" element={<UpdateTeamPage />} />
            <Route path="/team-stats" element={<TeamStats />} />
            <Route path="/delete-team" element={<DeleteTeamPage />} />
            <Route path="/view-teams" element={<ViewTeamsPage />} />
            <Route path="/average-goals" element={<AverageGoalsByYearPage />} /> 
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />  
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
