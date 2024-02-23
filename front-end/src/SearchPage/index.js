import React,{useState, useEffect,useContext} from "react";
import { PostContext } from "../Auth/post";
import {SearchContext } from "../Auth/search";
import { NavLink } from "react-router-dom";
import pasta from "./Images/menu3.png";
import "./index.css";

const Index = () => {
    const [data,setData] = useState("");
    const search=useContext(SearchContext);

    const dataPost = useContext(PostContext);

   useEffect(() => {
    const responseHandler = async ()=>{
     try {
        const response = await fetch('http://localhost:9000/place/aee1266f-b0e0-4c55-ba53-c1589c8565dd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:search.id
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
        console.log(responseData, search.id);
      } catch (err) {
        console.log(err);
      }
    }
    responseHandler();
  }, []);

    return(
    <React.Fragment>
      <section id="searchpage">
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
            <img src={data[place].image} onClick={e => dataPost.getid(data[place]._id)}/>
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