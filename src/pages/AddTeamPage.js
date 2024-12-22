import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTeamPage = () => {
  // Define state for each form field
  const [teamData, setTeamData] = useState({
    Team: "",
    gamesPlayed: "",
    win: "",
    draw: "",
    loss: "",
    goalsFor: "",
    goalsAgainst: "",
    points: "",
    year: ""
  });

  // Handle change in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend using axios
    await axios.post("http://localhost:9000/add-team", teamData);

      // Show success toast notification
      toast.success("Team data added successfully!");
      // Clear the form fields after successful submission
      setTeamData({
        Team: "",
        gamesPlayed: "",
        win: "",
        draw: "",
        loss: "",
        goalsFor: "",
        goalsAgainst: "",
        points: "",
        year: ""
      });
    } catch (error) {
      toast.error("Failed to add team data.");
    }
  };

  return (
    <>
      <div className="bg-primaryColor">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-12">
              <div className="section-title section-black-title wow fadeInUp delay-0-2s">
                <h2 className="text-center">ADD TEAM</h2>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-12">
              <div className="add-team-area wow fadeInUp delay-0-4s">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-6">
                    {/* Team Name */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="team">Team Name:</label><br />
                        <input
                          className="form-control"
                          placeholder="Enter Team Name"
                          type="text"
                          name="Team"
                          value={teamData.Team}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Games Played */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="gamesPlayed">Games Played:</label><br />
                        <input
                          className="form-control"
                          placeholder="Enter Games Played"
                          type="number"
                          name="gamesPlayed"
                          value={teamData.gamesPlayed}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Wins */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="win">Wins:</label><br />
                        <input
                          className="form-control"
                          placeholder="Enter Wins"
                          type="number"
                          name="win"
                          value={teamData.win}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Draws */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="draw"> Draws:</label><br />
                        <input
                          className="form-control"
                          type="number"
                          name="draw"
                            placeholder="Enter Draws"
                          value={teamData.draw}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Losses */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="loss">Losses:</label><br />
                        <input
                          className="form-control"
                          type="number"
                          name="loss"
                            placeholder="Enter Losses"
                          value={teamData.loss}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Goals For */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="goalsFor">Goals For:</label><br />
                        <input
                          className="form-control"
                          type="number"
                          name="goalsFor"
                            placeholder="Enter Goals For"
                          value={teamData.goalsFor}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Goals Against */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="goalsAgainst">Goals Against:</label><br />
                        <input
                          className="form-control"
                          type="number"
                          name="goalsAgainst"
                            placeholder="Enter Goals Against"
                          value={teamData.goalsAgainst}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Points */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="points">Points:</label><br />
                        <input
                          className="form-control"
                          type="number"
                          name="points"
                            placeholder="Enter points"
                          value={teamData.points}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Year */}
                    <div className="col-span-12 md:col-span-6">
                      <div className="form-group">
                        <label htmlFor="year">Year:</label><br />
                        <input
                          className="form-control"
                          type="text"
                          name="year"
                            placeholder="Enter Year"
                          value={teamData.year}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="view-teams-btn mt-7">
                    Add Team
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default AddTeamPage;
