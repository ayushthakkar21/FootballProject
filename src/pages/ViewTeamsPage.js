import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewTeamsPage = () => {
  const [teams, setTeams] = useState([]); // State to store teams data
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State for error messages
  const [minWins, setMinWins] = useState(0); // State to track input for minimum wins

  // Fetch teams from the server based on the wins filter
  const fetchTeams = async () => {
    setLoading(true); // Show loading spinner
    setError(null); // Reset error state
    try {
      const response = await axios.get(`http://localhost:9000/view-teams`);
      setTeams(response.data); // Update state with fetched data
    } catch (err) {
      setError('Error fetching teams: ' + err.message); // Handle any errors
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Use effect to fetch data when the component mounts or when minWins changes
  useEffect(() => {
    fetchTeams();
  }, [minWins]);

  // Handle changes to the "minWins" input field
  const handleInputChange = (e) => {
    setMinWins(e.target.value); // Update minWins state when input changes
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator when fetching data
  if (error) return <div style={{ color: 'red' }}>{error}</div>; // Show error if there's an issue

  return (
    <div className="container">
      <h1>View Teams</h1>

      {/* Input for minimum wins */}
      <div>
        <label htmlFor="minWins">Minimum Wins:</label>
        <input
          id="minWins"
          type="number"
          value={minWins}
          onChange={handleInputChange}
          placeholder="Enter minimum wins"
        />
        <button onClick={fetchTeams}>Fetch Teams</button>
      </div>

      {/* Display message if no teams are found */}
      {teams.length === 0 ? (
        <p>No teams found for the given wins filter.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Team</th>
              <th>Games Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Points</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.Team}</td>
                <td>{team['Games Played']}</td>
                <td>{team.Win}</td>
                <td>{team.Draw}</td>
                <td>{team.Loss}</td>
                <td>{team['Goals For']}</td>
                <td>{team['Goals Against']}</td>
                <td>{team.Points}</td>
                <td>{team.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTeamsPage;
