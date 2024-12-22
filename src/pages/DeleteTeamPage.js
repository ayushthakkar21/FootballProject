import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../component/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteTeamPage = () => {
  const [teams, setTeams] = useState([]); // All teams from API
  const [filteredTeams, setFilteredTeams] = useState([]); // Filtered list based on search input
  const [selectedTeam, setSelectedTeam] = useState(null); // Store selected team for deletion
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Stores the user's search input
  const [currentPage, setCurrentPage] = useState(1);
  const [teamsPerPage] = useState(10); // Show 10 teams per page
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal visibility

  // Fetch all teams on initial load
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:9000/view-all-teams');
      setTeams(response.data);
      setFilteredTeams(response.data); // Set the filtered teams to all teams initially
      setLoading(false);
    } catch (err) {
      setError('Error fetching teams');
      setLoading(false);
      toast.error('Error fetching teams');
    }
  };

  // Handle team selection from the list
  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setSearchTerm(team.Team);
    setIsModalOpen(true); // Open the modal when a team is selected for deletion
  };

  // Handle input change and filter the team list
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = teams.filter((team) =>
      team.Team.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTeams(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Handle team deletion
  const handleDelete = async () => {
    if (!selectedTeam) return;

    try {
      await axios.delete(`http://localhost:9000/delete-team/${selectedTeam._id}`);
      setTeams((prevTeams) =>
        prevTeams.filter((team) => team._id !== selectedTeam._id)
      );
      toast.success('Team deleted successfully');
      setIsModalOpen(false); // Close the modal after successful deletion
    } catch (err) {
      setError(`Failed to delete team: ${err.message}`);
      toast.error(`Failed to delete team: ${err.message}`);
    }
  };

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-primaryColor">
      <div className="container mx-auto py-8">
        <div className="section-title section-black-title wow fadeInUp delay-0-2s">
          <h2 className="text-center">DELETE TEAM</h2>
        </div>

        {/* Search Input */}
        <div className="my-4">
          <label className="team">Search and Select a Team:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="Search for a team..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Team Table */}
        <table className="w-full bg-white border border-gray-300 mt-6">
          <thead>
            <tr>
              <th className="px-4 py-2">Team</th>
              <th className="px-4 py-2">Games Played</th>
              <th className="px-4 py-2">Win</th>
              <th className="px-4 py-2">Draw</th>
              <th className="px-4 py-2">Loss</th>
              <th className="px-4 py-2">Goals For</th>
              <th className="px-4 py-2">Goals Against</th>
              <th className="px-4 py-2">Points</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentTeams.map((team) => (
              <tr key={team._id}>
                <td className="px-4 py-2">{team.Team}</td>
                <td className="px-4 py-2">{team['Games Played']}</td>
                <td className="px-4 py-2">{team.Win}</td>
                <td className="px-4 py-2">{team.Draw}</td>
                <td className="px-4 py-2">{team.Loss}</td>
                <td className="px-4 py-2">{team['Goals For']}</td>
                <td className="px-4 py-2">{team['Goals Against']}</td>
                <td className="px-4 py-2">{team.Points}</td>
                <td className="px-4 py-2">{team.Year}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleTeamSelect(team)}
                    className="px-4 py-2 delete-btn rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(filteredTeams.length / teamsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border rounded ${currentPage === i + 1 ? 'page text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-center font-bold text-xl mb-6">Are you sure you want to delete this team?</h3>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
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

export default DeleteTeamPage;
