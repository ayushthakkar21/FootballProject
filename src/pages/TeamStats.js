import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed and configured
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeamStatsPage = () => {
  const [teams, setTeams] = useState([]); // List of teams from the API
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team
  const [teamStats, setTeamStats] = useState(null); // Store fetched team stats
  const [loading, setLoading] = useState(false); // To show loading status
  const [error, setError] = useState(null); // To show error message

  // Fetch the list of teams when the component is mounted
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:9000/view-all-teams');
        setTeams(response.data);
      } catch (err) {
        setError('Error fetching teams');
        toast.error('Error fetching teams');
      }
    };

    fetchTeams();
  }, []);

  // Fetch team stats from the server
  const fetchTeamStats = async () => {
    if (!selectedTeam) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9000/team-stats/${selectedTeam}`);
      if (response.data) {
        setTeamStats(response.data); // Set stats data
      } else {
        toast.error('Team not found!');
        setTeamStats(null);
      }
    } catch (err) {
      setError('Error fetching team data');
      toast.error('Error fetching team data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primaryColor min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-6">Team Stats</h2>

        {/* Team Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="team-name" className="block text-sm font-medium text-gray-700">Select Team</label>
          <select
            id="team-name"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">-- Select a Team --</option>
            {teams.map((team) => (
              <option key={team.Team} value={team.Team}>
                {team.Team}
              </option>
            ))}
          </select>
        </div>

        {/* Fetch Button */}
        <div className="flex justify-center">
          <button
            onClick={fetchTeamStats}
            className="delete-btn p-4 mt-4 cursor-pointer"
            disabled={loading || !selectedTeam}
          >
            {loading ? 'Loading...' : 'Get Stats'}
          </button>
        </div>

        {/* Display Team Stats */}
        {teamStats && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-center mb-4">{selectedTeam}</h3>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Games Played:</span>
              <span>{teamStats['Games Played']}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Wins:</span>
              <span>{teamStats.Win}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Draws:</span>
              <span>{teamStats.Draw}</span>
            </div>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="mt-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default TeamStatsPage;
