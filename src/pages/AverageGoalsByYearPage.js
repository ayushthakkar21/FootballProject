import React, { useState } from 'react';
import axios from 'axios';  // Import Axios
import Loading from '../component/Loading';

const AverageGoalsByYearPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [year, setYear] = useState('');
  const [averageGoals, setAverageGoals] = useState(0);

  // Function to fetch teams for a given year
  const fetchTeamsByYear = async () => {
    if (!year) return; // Don't proceed if year is not provided

    setLoading(true);
    setError(null);
    setTeams([]); // Reset teams before fetching new data

    try {
      // Fetching teams by year from the backend using axios
      const response = await axios.get(`http://localhost:9000/teams-by-year?year=${year}`);
      
      if (response.data.length === 0) {
        setError('No teams found for the given year.');
      } else {
        setTeams(response.data);

        // Calculate average "Goals For" from the filtered data
        const totalGoals = response.data.reduce((sum, team) => sum + team['Goals For'], 0);
        setAverageGoals(totalGoals / (response.data.length || 1));  // Avoid division by 0
      }
    } catch (err) {
      setError(`Error fetching teams: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for year
  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  // Prevent page from reloading on pressing enter
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTeamsByYear();
  };

  if (loading) return <Loading />;
  if (error) return <div style={{ color: 'red' }} className="text-center">{error}</div>;

  return (
    <div className="bg-primaryColor">
      <div className="container mx-auto py-8">
        <div className="section-title section-black-title wow fadeInUp delay-0-2s">
          <h2 className="text-center">View Teams by Year (Average "Goals For")</h2>
        </div>

        {/* Input for Year */}
        <div className="mb-4 text-center">
          <label htmlFor="year" className="block text-lg font-semibold mb-2">
            Enter Year:
          </label>
          <form onSubmit={handleSubmit}>
            <input
              id="year"
              type="number"
              value={year}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Enter Year"
              min="1900"
              max="2024"
            />
            <button
              type="button"  // Prevents focus change when clicked
              className="ml-2 p-2 delete-btn"
              onClick={fetchTeamsByYear}  // Triggers the fetch when clicked
            >
              Search
            </button>
          </form>
        </div>

        {/* Display Average Goals For */}
        {averageGoals > 0 && (
          <div className="text-center mb-4">
            <h4>Average Goals For in {year}: {averageGoals.toFixed(2)}</h4>
          </div>
        )}

        {/* Table to display teams */}
        {teams.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border-b text-left">Team Name</th>
                  <th className="px-4 py-2 border-b text-left">Games Played</th>
                  <th className="px-4 py-2 border-b text-left">Wins</th>
                  <th className="px-4 py-2 border-b text-left">Draws</th>
                  <th className="px-4 py-2 border-b text-left">Losses</th>
                  <th className="px-4 py-2 border-b text-left">Goals For</th>
                  <th className="px-4 py-2 border-b text-left">Goals Against</th>
                  <th className="px-4 py-2 border-b text-left">Points</th>
                  <th className="px-4 py-2 border-b text-left">Year</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id} className="border-b">
                    <td className="px-4 py-2">{team.Team}</td>
                    <td className="px-4 py-2">{team['Games Played']}</td>
                    <td className="px-4 py-2">{team.Win}</td>
                    <td className="px-4 py-2">{team.Draw}</td>
                    <td className="px-4 py-2">{team.Loss}</td>
                    <td className="px-4 py-2">{team['Goals For']}</td>
                    <td className="px-4 py-2">{team['Goals Against']}</td>
                    <td className="px-4 py-2">{team.Points}</td>
                    <td className="px-4 py-2">{team.Year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-4">No teams match the criteria.</div>
        )}
      </div>
    </div>
  );
};

export default AverageGoalsByYearPage;
