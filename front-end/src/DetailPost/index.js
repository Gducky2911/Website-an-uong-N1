import React,{useState, useEffect,useContext} from "react";
import { DetailPostContext } from "../Auth/detailpost";
import { AuthContext } from "../Auth/auth-context";
import {UserContext} from "../Auth/user";

import salad from "./Images/menu.png";
import "./index.css";
import Popup from "../Popup/popup.js";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Index = () => {
    const history = useHistory();
    const [data,setData] = useState("");
    const [dataUser,setDataUser] = useState("");
    const dataPost = useContext(DetailPostContext);
const auth = useContext(AuthContext);
const user=useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
 const [isLogin, setIsLogin] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
   useEffect(() => {
     if(auth.isLoggedIn===true)
      setIsLogin(true);
    console.log(dataPost.id);
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/post/4911b499-bc8a-42a9-8cf0-34b1dd7f3c71/"+dataPost.id, 
        {method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
         try {
        const response2 = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d/"+responseData.userPost) 

         const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setDataUser(responseData2);
      } catch (err) {
        console.log(err);
      }
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  }, []);

  const likeHandler = async () =>{
    if(auth.isLoggedIn===true){
      console.log(dataUser._id,dataPost.id);
       const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/post/094a0019-5f18-4c53-b8fc-a8142a21e622", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_user:dataUser._id,
            id_post:dataPost.id
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if(responseData.Sucessful){
          const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/post/4911b499-bc8a-42a9-8cf0-34b1dd7f3c71/"+dataPost.id, 
        {method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

      const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setData(responseData);
         try {
        const response2 = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d/"+responseData.userPost) 

         const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setDataUser(responseData2);
      } catch (err) {
        console.log(err);
      }
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
    }
    else
      setIsOpen(true)
  };

  const editHandler = async () => {};


const reportHandler = async () => {
   try {
         const response = await fetch("http://localhost:9000/post/1bd7c479-2022-4440-a760-5f959f98ff05/"+dataPost.id, {
          method: 'POST'
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if(responseData.Sucessful)
        {
          history.push("/index");
        }
      } catch (err) {
        console.log(err);
      }
};


  const deleteHandler = async () => {
       const sendRequest = async () => {
      try {
         const response = await fetch("http://localhost:9000/post/ca4ed1b4-e4d0-4c15-8728-1c1172a650b5/"+dataPost.id, {
          method: 'POST'
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if(responseData.Sucessful)
        {
          history.push("/index");
        }
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest();
  };


  let edit="";
    if(isLogin===true)
    edit=(<div className="btn">
              <input type="submit" value="Report" style={{background:  "#e73e49"}} onClick={reportHandler}/>
        </div>);
  if(isLogin===true && auth.id===dataUser._id)
    edit=(            <div className="btn">
              <input type="submit" value="Edit" onClick={editHandler}/>
              <input type="submit" value="Delete" style={{background:  "#e73e49"}} onClick={deleteHandler}/>
        </div>);


    return(
    <React.Fragment>
      <section id="detailpostpage">
        <div class="title">
          <h2 class="titleText">
           <span>{data.title}</span>
            {edit}
          </h2> 
          <NavLink to="/user" exact>        
            <h3 onClick={e => user.getid(dataUser._id)}>{dataUser.fullname} - {dataUser.follower} follow</h3>
            </NavLink>

        </div>
        <div class="row">
            <div class="co150">
                <p>{data.content}</p>
            </div>
            <div class="co150">
                <div class="imgBx">
                    <img src={data.image}/>
                </div>
            </div>
            
        </div>
        <div className="btn">
          <input type="submit" value={data.like} style={{background:  "#151415"}} />
        </div>
       <div className="btn">
          <input type="submit" value="Like" onClick={likeHandler}/>
        </div>
        {isOpen && <Popup
      content={<>
        <b>Like is invalid</b>
        <p>Please login to do this action</p>
      </>}
      handleClose={togglePopup}
    />}
      </section>
    </React.Fragment>)
};

export default Index;