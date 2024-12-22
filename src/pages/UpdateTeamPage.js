import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../component/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTeamPage = () => {
  const [teams, setTeams] = useState([]); // All teams from API
  const [filteredTeams, setFilteredTeams] = useState([]); // Filtered list based on search input
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [formData, setFormData] = useState({
    Team: '',
    'Games Played': '',
    Win: '',
    Draw: '',
    Loss: '',
    'Goals For': '',
    'Goals Against': '',
    Points: '',
    Year: '',
  });
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
    setFormData({ ...team });
    setIsModalOpen(true); // Open the modal when a team is selected
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission and update the team data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:9000/update-team/${selectedTeam._id}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast.success('Team updated successfully');
      const updatedTeam = response.data;

      // Update local state with the updated team
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === updatedTeam._id ? updatedTeam : team
        )
      );

      setIsModalOpen(false); // Close the modal after successful update
    } catch (err) {
      setError(`Failed to update team: ${err.message}`);
      toast.error(`Failed to update team: ${err.message}`);
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
          <h2 className="text-center">UPDATE TEAM</h2>
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
                    Update
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

        {/* Update Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-center font-bold text-xl mb-6">Update Team</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {Object.keys(formData).map((key) => (
                    key !== '_id' && ( // Exclude _id field from the form
                      <div key={key}>
                        <label className="block text-gray-700 font-bold mb-2">
                          {key.replace(/_/g, ' ')}
                        </label>
                        <input
                          type="text"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          disabled={key === 'Team'} // Disable the 'Team' field
                        />
                      </div>
                    )
                  ))}
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 delete-btn rounded"
                    disabled={!selectedTeam}
                  >
                    Update Team
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => setIsModalOpen(false)} // Close the modal
                  >
                    Cancel
                  </button>
                </div>
              </form>
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

export default UpdateTeamPage;
