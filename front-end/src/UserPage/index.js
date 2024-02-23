import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import "./index.css";
import {AuthContext} from "../Auth/auth-context";
import { UserContext } from "../Auth/user";
import { PostContext } from "../Auth/post";
import post from "./Images/post.jpg";


const Index = () => {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const dataPost = useContext(PostContext);
  const [data,setData]=useState({
    username:"",
    fullname:"",
    email:"",
    phone:"",
    birthday:"",
    gender:"",
    country:"",
  });
  const [datapost,setPost] = useState("");
  let follow="";
  const [isFollow,setIsFollow] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d/"+user.id);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
        console.log("Hello");
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();

    const sendRequestPost = async ()=>{      
      try {
         const response = await fetch("http://localhost:9000/post/07f59b0f-31db-4e34-b998-c494a2af9520/"+user.id);
        
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setPost(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestPost();



 const sendRequestFollow = async ()=>{      
      try {
         const response = await fetch('http://localhost:9000/user/5d6da3cd-3723-457a-8760-3c7d40032438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user:user.id,
            auth_id: auth.id
          })
        });
        
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setPost(responseData);
        if(responseData.isFollowed) {
          setIsFollow(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestFollow();
    
  }, []);


  
  let form = "";
  let value = "";
    value = "Edit";
    form = (
      <div className="info">
        <div className="box">
          <div className="text">
            <h3>Full name</h3>
            <p>{data.fullname}</p>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <h3>Email address</h3>
            <p>{data.email}</p>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <h3>Phone</h3>
            <p>{data.phone}</p>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <h3>Birthday</h3>
            <p>{data.birthday}</p>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <h3>Gender</h3>
            <p>{data.gender?"Man":"Woman"}</p>
          </div>
        </div>
        <div className="box">
          <div className="text">
            <h3>Country/Region</h3>
            <p>{data.country}</p>
          </div>
        </div>
      </div>
    );
 

  const reportHandler = async () => {
    console.log(user.id,auth.id);
      try {
         const response = await fetch('http://localhost:9000/user/26828687-b3e0-431b-9226-55fb3a857bef', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user:user.id,
            id_follower: auth.id
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
         const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d/"+user.id);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
        console.log("Hello");
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();

    const sendRequestPost = async ()=>{      
      try {
         const response = await fetch("http://localhost:9000/post/07f59b0f-31db-4e34-b998-c494a2af9520/"+user.id);
        
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setPost(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestPost();
      } catch (err) {
        console.log(err);
      }

      const sendRequestFollow = async ()=>{      
      try {
         const response = await fetch('http://localhost:9000/user/5d6da3cd-3723-457a-8760-3c7d40032438', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user:user.id,
            auth_id: auth.id
          })
        });
        
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setPost(responseData);
        if(responseData.isFollowed) {
          setIsFollow(true);
        }
        else
        setIsFollow(false);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestFollow();
 
  };


  if(isFollow===true)
    follow="UnFollow";
    else
    follow="Follow";


  let posts = "";
  var count = Object.keys(datapost).length;
  if (count === 0) {
    posts = (
      <section id="post">
      <div className="title">
        <h2 className="titleText">
          <span>P</span>ost
        </h2>
        <p>No places found.</p>
      </div>
      </section>
    );
  }
  else{
  posts=(
    <section id="post">
      <div className="title">
        <h2 className="titleText">
          <span>P</span>ost
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      <div className="content">
        {Object.keys(datapost).map(yourpost=>(<div className="box">
          <div className="imgBx">
            <NavLink to="/detailpost" exact>
            <img src={datapost[yourpost].image} onClick={e => dataPost.getid(datapost[yourpost]._id)}/>
            </NavLink>
          </div>
          <div className="text">
            <h3>{datapost[yourpost].content}</h3>
          </div>
        </div>))}
        </div>
    </section>
  );
  }
  

   let account_info = (
    <section id="user">
      <h2 className="titleText">
        <span>{data.fullname}</span>
      </h2>
      <div className="content">
        <div className="user_info">
          {form}
        </div>
        <div className="btn">
          <input type="submit" value={follow} style={{background:"#e73e49"}} onClick={reportHandler}/>
        </div>
      </div>
    </section>
  );

  return (
    <React.Fragment>
      {account_info}
      {posts}
    </React.Fragment>
  );
};

export default Index;
