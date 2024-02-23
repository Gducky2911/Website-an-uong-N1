import React, { useState, useEffect,useContext } from "react";

import { AuthContext } from "../Auth/auth-context";

import "./index.css";
import Popup from "../Popup/popup.js";

import signin from "./Images/img1.png";
import signup from "./Images/img2.png";

const Index = () => {
  const [showDefault, setShowDefault] = useState(true);
  const [showForm, setShowForm] = useState("container");
  const formController = () => {
    setShowDefault(!showDefault);
  };
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (showDefault) {
      setShowForm("container");
    } else {
      setShowForm("container active");
    }
  });

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
   const [username2,setUsername2] = useState('');
  const [password2,setPassword2] = useState('');
  const [fullname,setFullName] = useState('');
  const [email,setEmail] = useState('');
  const [comfirmpassword,setComfirmPassword] = useState('');

  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const authSumbitHandler= async event => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:9000/user/4b3735b2-533d-4963-9e39-8cb61f3d1198', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData)
        if(responseData.Sucessful)
        {
          auth.login();
          auth.getid(responseData.checkuser._id);
        }
        else{
          togglePopup();
        }
      } catch (err) {
        console.log(err);
      }
  }

  const signupHandler= async event => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:9000/user/6e45ab7f-4ccc-451b-8e8a-fca558df5f0c', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username2,
            fullname: fullname,
            email:email,
            password: password2,
            confirmpassword: comfirmpassword
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if(responseData.Sucessful)
        {
          try {
        const response2 = await fetch('http://localhost:9000/user/4b3735b2-533d-4963-9e39-8cb61f3d1198', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username2,
            password: password2
          })
        });

        const responseData2 = await response2.json();
        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        console.log(responseData2)
        if(responseData2.Sucessful)
        {
          auth.login();
          auth.getid(responseData2.checkuser._id);
        }
        else{
          togglePopup();
        }
      } catch (err) {
        console.log(err);
      }
        }
        else{
          togglePopup();
        }
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <React.Fragment>
      <section id="signpage">
        <div className={showForm}>
          <div className="user signinBx">
            <div className="imgBx">
              <img src={signin} />
            </div>
            <div className="formBx">
              <form>
                <h2>Sign In</h2>
                <input type="text" name="" placeholder="Username" onChange={event=>setUsername(event.target.value)}/>
                <input type="password" name="" placeholder="Password" onChange={event=>setPassword(event.target.value)} />
                <input type="submit" name="" value="Login" onClick={authSumbitHandler} />
                <p className="signup">
                  Don't have an account?{" "}
                  <a href="#" onClick={formController}>
                    Sign up.
                  </a>
                </p>
              </form>
            </div>
              {isOpen && <Popup
      content={<>
        <b>Username or password is invalid</b>
        <p>Please retry entering your username and password.</p>
      </>}
      handleClose={togglePopup}
    />}
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form>
                <h2>Create an account</h2>
                <input type="text" name="" placeholder="Username" onChange={event=>setUsername2(event.target.value)}/>
                <input type="fullname" name="" placeholder="Full Name" onChange={event=>setFullName(event.target.value)}/>
                <input type="email" name="" placeholder="Email" onChange={event=>setEmail(event.target.value)}/>
                <input type="password" name="" placeholder="Create Password" onChange={event=>setPassword2(event.target.value)}/>
                <input type="password" name="" placeholder="Confirm Password" onChange={event=>setComfirmPassword(event.target.value)}/>
                <input type="submit" name="" value="Sign up" onClick={signupHandler}/>
                <p className="signup">
                  Already have an account?{" "}
                  <a href="#" onClick={formController}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src={signup} />
            </div>
          </div>
           {isOpen && <Popup
      content={<>
        <b>Input is invalid</b>
        <p>Please retry again.</p>
      </>}
      handleClose={togglePopup}
    />}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Index;
