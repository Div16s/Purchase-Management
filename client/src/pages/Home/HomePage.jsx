import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Typewriter from "../Typewriter";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const HomePage = () => {
  // Scroll function to move to the target section
  const scrollToSection = () => {
    const section = document.getElementById("target-section");
    window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
  };

  return (
    <div className="home">

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <img
          src="iitrpr.jpg"
          alt="Homepage"
          className="homepage-image w-3000 h-1000 -mt-8"
        />
        <div className="flex flex-col items-center justify-center mt-32" style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          fontSize: "40px",
          fontWeight: "bold",
        }}>
          <img src="iitrpr_logo.png" className="h-36" />
          Indian Institute of Technology, Ropar
          <IoIosArrowDropdownCircle className="mt-10 animate-bounce cursor-pointer" onClick={scrollToSection} />
        </div>
      </div>

      <div className="home-main flex-col text-center" id="target-section">
        <p className="text-6xl  text-black mt-8 mb-10">
          Welcome to{" "}
          <div className="brown-rang">
            <Typewriter />
          </div>
        </p>
        <p className="text-3xl text-black  ml-7 mr-7 mt-2 mb-5">
          At IIT Ropar, we believe in efficient and transparent procurement
          processes to meet the needs of our academic community. Our Purchase
          Management System streamlines the purchasing workflow, ensuring smooth
          transactions and optimal resource allocation.
        </p>

        <br />
        <br /><br />
        <p className=" font-bold text-left heading-main-body  mt-13">Features Of Our Purchase Management System</p>
        <br />
        <br /><br /><br />
        <div className="features-main-body">
          <div className="feature">
            <div className="sub-heading-main-body">User-Friendly Interface</div>
            <p>Our intuitive interface makes it easy for faculty, staff, and administrators to initiate, track, and manage purchase requests.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Centralized Procurement</div>
            <p>Consolidate all purchasing activities in one platform, enhancing coordination and reducing administrative overhead.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Transparent Approval Workflow</div>
            <p>Clear approval workflows ensure accountability and compliance with institutional policies and regulations.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Vendor Management</div>
            <p>Maintain a comprehensive database of trusted vendors, simplifying the procurement process and fostering partnerships.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Budget Tracking</div>
            <p>Track expenditures in real-time to effectively manage budgets and prevent overspending.</p>
          </div>
          <div className="feature">
            <div className="sub-heading-main-body">Efficient Communication</div>
            <p>Facilitate seamless communication between requesters, approvers, and vendors, minimizing delays and errors.</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;
