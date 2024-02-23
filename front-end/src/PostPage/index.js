import React,{useState, useEffect,useContext} from "react";
import { PostContext } from "../Auth/post";
import { DetailPostContext } from "../Auth/detailpost";
import { NavLink } from "react-router-dom";
import pasta from "./Images/menu2.png";
import "./index.css";

const Index = () => {
    const [data,setData] = useState("");

    const dataPost = useContext(PostContext);
  const dataDetailPost = useContext(DetailPostContext);

   useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/post/6f65f910-b4c7-4276-9410-dbb46b1f7ad6/"+dataPost.id);

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
      <section id="postpage">
        <div class="title">
          <h2 class="titleText">
            All <span>P</span>osts
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div class="content">
         <div className="content">
        {Object.keys(data).map(post=>(<div className="box">
          <div className="imgBx">
             <NavLink to="/detailpost" exact>
            <img src={data[post].image} onClick={e => dataDetailPost.getid(data[post]._id)}/></NavLink>
          </div>
          <div className="text">
            <h3>{data[post].title}</h3>
          </div>
        </div>))}
        </div>
        </div>
      </section>
    </React.Fragment>)
};

export default Index;