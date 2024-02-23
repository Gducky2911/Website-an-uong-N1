import React, { useState, useEffect, useContext } from "react";
import { NavLink,withRouter } from "react-router-dom";
import {SearchContext} from "../Auth/search";

import "./index.css";
import NavLinks from "./nav-link"; 

export default withRouter(function Index({ location }) {
  const searchData = useContext(SearchContext);
  const [currentPath, setCurrentPath] = useState(location.pathname); 
  const [showDefault, setShowDefault] = useState("");
  const { pathname } = location;
  let banner = "";
  if (pathname==="/index") {
    banner = (
      <section className="banner" id="banner">
        <div className="content">
          <h2>Always Choose Good</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud.
          </p>
          <NavLink to="/menu" exact className="btn">
            Our Menu
          </NavLink>
        </div>
      </section>
    );
  }

  useEffect(() => {
    setCurrentPath(pathname);
    if (pathname==="/index") 
      setShowDefault("");
    if (pathname!=="/index")
      setShowDefault("sticky");
    if(pathname==="/")
      setShowDefault("invisible");
  }, [window.location.pathname]);

  window.addEventListener("scroll", function () {
    if(pathname!=="/index")
      setShowDefault("sticky");
    else
      {if (window.scrollY > 0) 
        setShowDefault("sticky");
      else 
        setShowDefault("");    }
  });

  const homeController = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [search,setSearch]=useState({name:""})

  return (
      <div id="header">
        <header className={showDefault}>
          <NavLink to="/index" exact className="logo" onClick={homeController}>
            VFood<span>.</span>
          </NavLink>
          <div className="box">
            <form className="search_box">
              <select className="select_city">
                <option>Ho Chi Minh</option>
                <option>Ha Noi</option>
              </select>
              <input type="text" placeholder="Search VFood" onChange={e => setSearch({name: e.target.value })}/>
               <NavLink to="/search" exact>
              <input type="submit" value="Search" onClick={e=>searchData.getid(search.name)}/>
              </NavLink>
            </form>
          </div>
          <ul className="navigation">
            <li>
              <NavLink
                to="/index"
                exact
                className="menu-link"
                onClick={homeController}
              >
                Home
              </NavLink>
            </li>
             <NavLinks/>
          </ul>
        </header>
        {banner}
      </div>
  );
});
