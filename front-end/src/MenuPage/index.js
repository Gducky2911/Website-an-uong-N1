import React,{useState, useEffect,useContext} from "react";
import { NavLink } from "react-router-dom";
import { CategoryContext } from "../Auth/categories";
import "./index.css";

import salad from "./Images/menu.png";
import soup from "./Images/menu1.png";
import pasta from "./Images/menu2.png";
import beef from "./Images/menu3.png";
import cafe from "./Images/menu4.png";
import cake from "./Images/menu5.png";

const Index = () => {
   const [data,setData] = useState("");

   const dataCate = useContext(CategoryContext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/category/fc82d78d-ee17-4b3e-8233-e2e074b629ec");

      const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, []);

  return (
    <React.Fragment>
      <section id="menupage">
        <div class="title">
          <h2 class="titleText">
            Our <span>M</span>enu
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        
        <div class="content">
         {Object.keys(data).map(cate=>(
          <div class="box">
            <div class="imgBx">
               <NavLink to="/categorypost" exact>
                <img src={data[cate].avatar} onClick={e => dataCate.getid(data[cate]._id)}/>
              </NavLink>
            </div>
            <div class="text">
              <h3>{data[cate].name}</h3>
            </div>
          </div>))}
        </div>
        <div class="title">
           <a href="#" class="btn">
             View All
          </a>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
