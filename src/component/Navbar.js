import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navbar() {
  return (
    <nav className="main-nav">
      <div className="container mx-auto">
        <div className="nav-inner p-3">
          <div className="grid grid-cols-12 items-center justify-center">
            {/* Logo Section */}
            <div className="col-span-6 sm:col-span-3 xl:col-span-2">
              <div className="w-[80px]">
                <img src={logo} alt="Football logo" />
              </div>
            </div>
            {/* Navigation Menu */}
            <div className="col-span-6 sm:col-span-9 xl:col-span-10">
              <div className="text-right">
                <div id="mobile-menu" className=" lg:block mobile-menu">
                  <ul>
                    <li>
                      <Link to="/" className="linkstyle">Home</Link>
                    </li>
                    <li>
                      <Link to="/add-team" className="linkstyle">Add Team</Link>
                    </li>
                    <li>
                      <Link to="/update-team" className="linkstyle">Update Team</Link>
                    </li>
                    <li>
                      <Link to="/team-stats" className="linkstyle">Team Stats</Link>
                    </li>
                    <li>
                      <Link to="/delete-team" className="linkstyle">Delete Team</Link>
                    </li>
                    <li>
                      <Link to="/view-teams" className="linkstyle">View Team</Link>
                    </li>
                    <li>
                      <Link to="/average-goals" className="linkstyle">Average Goal</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
