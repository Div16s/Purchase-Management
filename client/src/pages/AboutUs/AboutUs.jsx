import React, { useState } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);


  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const toggleActive1 = () => {
    setIsActive1(!isActive1);
  };

  const toggleActive2 = () => {
    setIsActive2(!isActive2);
  };

  const toggleActive3 = () => {
    setIsActive3(!isActive3);
  };

  return (
    <div className="home1 mt-20">
      <h2 className="text-6xl text-center text-blue-gray-900 font-header font-bold mt-10 mb-0">MENTOR</h2>
      <div className="flex flex-row">
            <div id="card">
              <div id="blur">
                <div id="color"></div>
              </div>
              <div id="profile">
                <img
                  src="Puneet_Goyal_sir.png"
                  alt="Puneet Goyal"
                />
                <div className="card-details-container">
                  <h1>Puneet Goyal</h1>
          
                  <p>Faculty, CSE</p>
                </div>

                <div className={`info ${isActive ? "active" : ""}`}>

                  <i className="fa fa-info fa-1x block" onClick={toggleActive}></i>
                  <i
                    className="fa fa-angle-down fa-2x block"
                    onClick={toggleActive}
                  ></i>

                  <p>

                  Serving as Associate Professor @{" "}
                    <a href="https://www.iitrpr.ac.in/" target="_blank">
                      IIT Ropar
                    </a>
                    .
                  </p>
                  <p>Find me on:</p>
                  <a
                    className="link"
                    href="https://twitter.com"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="http://dribbble.com"
                    target="_blank"
                  >
                    <i className="fa fa-dribbble fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="https://codepen.io"
                    target="_blank"
                  >
                    <i className="fa fa-codepen fa-2x social"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

      <h2 className="text-6xl text-center text-blue-gray-900 font-header font-bold mt-10 mb-0">TEAM</h2>
      <div className="flex flex-col justify-center bg-cover bg-center">
        <div>
          <div className="flex flex-row">
            <div id="card">
              <div id="blur">
                <div id="color"></div>
              </div>
              <div id="profile">
                <img
                  src="Doodhnath.jpeg"
                  alt="Doodh Nath"
                />
                <div className="card-details-container">
                  <h1>Doodh Nath Tiwari</h1>
                  <p>+91 6203087513</p>
                  <p>Front-end Web Developer</p>
                </div>

                <div className={`info ${isActive ? "active" : ""}`}>

                  <i className="fa fa-info fa-1x block" onClick={toggleActive}></i>
                  <i
                    className="fa fa-angle-down fa-2x block"
                    onClick={toggleActive}
                  ></i>

                  <p>

                    I'm a  enthusiastic web developer and
                    Currently Pursuing my B Tech @{" "}
                    <a href="https://www.iitrpr.ac.in/" target="_blank">
                      IIT Ropar
                    </a>
                    .
                  </p>
                  <p>Find me on:</p>
                  <a
                    className="link"
                    href="https://twitter.com/doodhnath1/"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="http://dribbble.com/doodhnath1/"
                    target="_blank"
                  >
                    <i className="fa fa-dribbble fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="https://codepen.io/doodhnath1"
                    target="_blank"
                  >
                    <i className="fa fa-codepen fa-2x social"></i>
                  </a>
                </div>
              </div>
            </div>

            <div id="card">
              <div id="blur">
                <div id="color"></div>
              </div>
              <div id="profile">
                <img
                  src="Divyankar.jpeg"
                  alt="User"
                />
                <div className="flex flex-col items-center justify-center card-details-container">
                  <h1 className="font-semibold">Divyankar Shah</h1>
                  <p className="font-semibold">+91 9569691304</p>
                  <p className="font-semibold">Full-Stack Developer</p>
                </div>
                <div className={`info ${isActive1 ? "active" : ""}`}>
                  <i className="-mb-2 fa fa-info fa-1x block" onClick={toggleActive1}></i>
                  <i
                    className="-mb-2 fa fa-angle-down fa-2x block"
                    onClick={toggleActive1}
                  ></i>
                  <p className="-mb-4">
                    In short, I spend my earthly time striving to create some darned
                    awesome UI designs, and also develop a few. Student @{" "}
                    <a href="https://www.iitrpr.ac.in/" target="_blank">IIT Ropar
                    </a>
                    .
                  </p>
                  <p className="-mb-4">Find me on:</p>
                  <a
                    className="link"
                    href="https://twitter.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="http://dribbble.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-dribbble fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="https://codepen.io/Masquetina"
                    target="_blank"
                  >
                    <i className="fa fa-codepen fa-2x social"></i>
                  </a>
                </div>
              </div>
            </div>


          </div>




          <div className="flex flex-row">
            <div id="card">
              <div id="blur">
                <div id="color"></div>
              </div>
              < div id="profile">
                <img
                  src="Niroopma.jpg"
                  alt="User"
                />
                <div className="card-details-container">
                  <h1>Niroopma Verma</h1>
                  <p> +91 7705834401</p>
                  <p>Front-end Web Developer</p>
                </div>
                <div className={`info ${isActive2 ? "active" : ""}`}>
                  <i className="fa fa-info fa-1x block" onClick={toggleActive2}></i>
                  <i
                    className="fa fa-angle-down fa-2x block"
                    onClick={toggleActive2}
                  ></i>
                  <p>
                    In short, I spend my earthly time striving to create some darned
                    awesome UI designs, and also develop a few. Student @{" "}
                    <a href="https://www.iitrpr.ac.in/" target="_blank">IIT Ropar
                    </a>
                    .
                  </p>
                  <p>Find me on:</p>
                  <a
                    className="link"
                    href="https://twitter.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="http://dribbble.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-dribbble fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="https://codepen.io/Masquetina"
                    target="_blank"
                  >
                    <i className="fa fa-codepen fa-2x social"></i>
                  </a>
                </div>
              </div>
            </div>

            <div id="card">
              <div id="blur">
                <div id="color"></div>
              </div>
              <div id="profile">
                <img
                  src="Shashank.png"
                  alt="User"
                />
                <div className="card-details-container">
                  <h1>Shashank Kumar</h1>
                  <p> +91 7764833505</p>
                  <p>Front-end Web Developer</p>
                </div>
                <div className={`info ${isActive3 ? "active" : ""}`}>
                  <i className="fa fa-info fa-1x block" onClick={toggleActive3}></i>
                  <i
                    className="fa fa-angle-down fa-2x block"
                    onClick={toggleActive3}
                  ></i>
                  <p>
                    In short, I spend my earthly time striving to create some darned
                    awesome UI designs, and also develop a few. Student @{" "}
                    <a href="https://www.iitrpr.ac.in/" target="_blank">IIT Ropar
                    </a>
                    .
                  </p>
                  <p>Find me on:</p>
                  <a
                    className="link"
                    href="https://twitter.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="http://dribbble.com/Masquetina/"
                    target="_blank"
                  >
                    <i className="fa fa-dribbble fa-2x social"></i>
                  </a>
                  <a
                    className="link"
                    href="https://codepen.io/Masquetina"
                    target="_blank"
                  >
                    <i className="fa fa-codepen fa-2x social"></i>
                  </a>
                </div>
              </div>
            </div>


          </div>



        </div>
      </div>
    </div>
  );
};

export default AboutUs;
