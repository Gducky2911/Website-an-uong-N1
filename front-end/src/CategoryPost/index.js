import React,{useState, useEffect,useContext} from "react";
import { CategoryContext } from "../Auth/categories";
import { PostContext } from "../Auth/post";
import { NavLink } from "react-router-dom";
import beef from "./Images/menu3.png";
import "./index.css";

const Index = () => {
    const [data,setData] = useState("");

    const dataCate = useContext(CategoryContext);
   const dataPost = useContext(PostContext);
   
   useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/place/6f0421d5-4357-49f8-8b24-14f79bea7f33/"+dataCate.id);

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

    return(
        <React.Fragment>
      <section id="categorypost">
        <div class="title">
          <h2 class="titleText">
            <span>C</span>ategory Post
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div class="content">
         <div className="content">
        {Object.keys(data).map(place=>(<div className="box">
          <div className="imgBx">
            <NavLink to="/post" exact>
            <img src={data[place].image}  onClick={e => dataPost.getid(data[place]._id)}/>
            </NavLink>
          </div>
          <div className="text">
            <h3>{data[place].name}</h3>
          </div>
        </div>))}
        </div>
        </div>
      </section>
    </React.Fragment>)
};

export default Index;