import React, { useEffect, useState } from 'react';
import img1 from '../images/1.jpg';
import img2 from '../images/2.webp';
import img4 from '../images/4.png';
import img5 from '../images/5.webp';
import { Link } from 'react-router-dom';
import 'animate.css'; // Import Animate.css for animations

const HomePage = () => {
  const [headerAnimation, setHeaderAnimation] = useState('');
  const [imageAnimation, setImageAnimation] = useState('');
  const [buttonAnimation, setButtonAnimation] = useState('');

  useEffect(() => {
    // Trigger the animations after the component has mounted
    setHeaderAnimation('animate__animated animate__fadeInLeft');
    setImageAnimation('animate__animated animate__fadeInLeft animate__delay-1s');
    setButtonAnimation('animate__animated animate__fadeInLeft animate__delay-2s');
  }, []);

  return (
    <div className="bg-primaryColor">
      <div className="container mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            {/* Header Section */}
            <div className="text-center">
              <h2 className={`text-center text-[70px] font-medium uppercase text-mainColor md:text-[120px] lg:text-[170px] xl:text-[230px] ${headerAnimation}`}>
                Football
              </h2>
            </div>
          </div>
        </div>
        {/* Main Content Section */}
        <div className="grid grid-cols-12 max-lg:overflow-hidden lg:gap-6">
          {/* Left Section */}
          <div className="col-span-12 pt-8 lg:col-span-3">
            <div className="football-content max-xl:p-0 max-md:p-0">
              <ul className="football-info-inner">
                <li className={imageAnimation}>
                  <img className="img-fluid" src={img4} alt="Football logo" />
                </li>
                <li className={imageAnimation}>
                  <img className="img-fluid" src={img2} alt="Football logo" />
                </li>
                <li className={imageAnimation}>
                  <img className="img-fluid" src={img5} alt="Football logo" />
                </li>
              </ul>
            </div>
          </div>

          {/* Center Section */}
          <div className="col-span-12 lg:col-span-6">
            <div className={`football-image lg:-mt-[100px] ${imageAnimation}`}>
              <img src={img1} alt="Football" />
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-12 lg:col-span-3">
            <p className="pb-4 text-sm lg:text-base">
              Here are the top football teams from around the world:
            </p>
            <Link
              to="/view-teams"
              className={`view-teams-btn ${buttonAnimation}`}
            >
              View Teams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
