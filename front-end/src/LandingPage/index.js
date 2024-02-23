import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./index.css";
import ramen from "./Images/ramen.png";
import facebook from "./Images/facebook.png";
import twitter from "./Images/twitter.png";
import instagram from "./Images/instagram.png";
import { render } from "react-dom";

const Index = () => {
  const [showDefault, setShowDefault] = useState(true);
  const [showToggle, setShowToggle] = useState("toggle");
  const [showBanner, setShowBanner] = useState("banner");

  const toggleController = () => {
    setShowDefault(!showDefault);
  };

  useEffect(() => {
    if (showDefault) {
      setShowToggle("toggle");
      setShowBanner("banner");
    } else {
      setShowToggle("toggle active");
      setShowBanner("banner active");
    }
  });

  return (
    <React.Fragment>
      <section className={showBanner} id="landing">
        <div className="header">
          <NavLink to="/index" exact className="logo">
            VFood<span>.</span>
          </NavLink>
          <div className={showToggle} onClick={toggleController}></div>
        </div>
        <div className="content">
          <div className="contentBx">
            <h2>
              Locations on
              <br />
              your hand
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <NavLink to="/index" exact className="content-link">
              Homepage
            </NavLink>
          </div>
          <div className="imgBx">
            <img src={ramen} />
          </div>
        </div>
        <ul className="sci">
          <li>
            <a href="#">
              <img src={facebook} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={twitter} />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={instagram} />
            </a>
          </li>
        </ul>
        <ul className="menu">
          <li>
            <NavLink to="/index" exact className="menu-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign" exact className="menu-link">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" exact className="menu-link">
              Menu
            </NavLink>
          </li>
        </ul>
      </section>
    </React.Fragment>
  );
};

export default Index;
