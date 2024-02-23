import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import "./index.css";
import { AuthContext } from "../Auth/auth-context";
import { PostContext } from "../Auth/post";
import post from "./Images/post.jpg";


const Index = () => {
  const [showForm, setShowForm] = useState(true);
  const [showCancel, setShowCancel] = useState("cancel");
  const auth = useContext(AuthContext);
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

  useEffect(() => {
    console.log("id",auth.id)
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d/"+auth.id);

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

    const sendRequestPost = async ()=>{      
      try {
         const response = await fetch("http://localhost:9000/post/07f59b0f-31db-4e34-b998-c494a2af9520/"+auth.id);
        
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
  }, []);


  
  let form = "";
  let value = "";
  if (showForm) {
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
  } else {
    value = "Save";
    form = (
      <div className="edit">
        <form>
          <div className="item">
            <h3>Full name</h3>
            <input type="text" id="fullname" placeholder="Full Name" value={data.fullname} onChange={e => setData({...data, fullname: e.target.value })}/>
          </div>
          <div className="item">
            <h3>Email address</h3>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={e => setData({...data, email: e.target.value })}
            />
          </div>
          <div className="item">
            <h3>Phone</h3>
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={e => setData({...data, phone: e.target.value })}
            />
          </div>
          <div className="item">
            <h3>Birthday</h3>
            <input
              type="text"
              id="birthday"
              placeholder="Birthday"
              value={data.birthday}
              onChange={e => setData({...data, birthday: e.target.value })}
            />
          </div>
          <div className="item">
            <h3>Gender</h3>
            <input type="text" id="gender" placeholder="Gender" value={data.gender}
            onChange={e => setData({...data, gender: e.target.value})}/>
          </div>
          <div className="item">
            <h3>Country/Region</h3>
            <input
              type="text"
              id="country"
              placeholder="Country/Region"
              value={data.country}
              onChange={e => setData({...data, country: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }

  useEffect(() => {
    if (showForm) {
      setShowCancel("cancel active");
    } else {
      setShowCancel("cancel");
    }
  });


  const formController = () => {
    setShowForm(!showForm);
    if(showForm===false) {
    const editHandler = async () => {
    try {
        const response = await fetch('http://localhost:9000/user/509b6cf0-3996-4853-8e28-1dcd93ac14f2/'+auth.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username : data.username,
            fullname : data.fullname,
            email:data.email,
            phone : document.getElementById("phone").value,
            birthday : document.getElementById("birthday").value,
            gender: document.getElementById("gender").value,
            country: document.getElementById("country").value
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
      }
  };
    editHandler();
    }
  };

  let account_info = (
    <section id="account">
      <h2 className="titleText">
        <span>A</span>ccount
      </h2>
      <div className="content">
        <div className="account_info">
          <h3 className="name">{data.username}</h3>
          {form}
        </div>
        <div className="btn">
          <input type="submit" value={value} onClick={formController} />
          <input type={showCancel} value="Cancel" onClick={formController} />
        </div>
      </div>
    </section>
  );


  let posts = "";
  var count = Object.keys(datapost).length;
  if (count === 0) {
    posts = (
      <section id="post">
      <div className="title">
        <h2 className="titleText">
          Your <span>P</span>ost
        </h2>
        <p>No places found. Maybe create one?</p>
        <div className="btn">
          <NavLink to="/newpost" exact>
              <input type="submit" value="Create One"/>
           </NavLink>
        </div>
      </div>
      </section>
    );
  }
  else{
  posts=(
    <section id="post">
      <div className="title">
        <h2 className="titleText">
          Your <span>P</span>ost
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      <div className="content">
        {Object.keys(datapost).map(yourpost=>(<div className="box">
          <div className="imgBx">
            <NavLink to="/detailpost" exact>
            <img src={post} onClick={e => dataPost.getid(datapost[yourpost]._id)}/>
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

  return (
    <React.Fragment>
      {account_info}
      {posts}
    </React.Fragment>
  );
};

export default Index;
