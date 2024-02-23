import React,{useState,useEffect, useContext} from "react";
import { AuthContext } from "../Auth/auth-context";
import "./index.css";
import { useHistory } from "react-router-dom";
import Popup from "../Popup/popup.js";

const Index = () => {
  const history = useHistory();
 const [data,setData] = useState("");
   const [dataCate,setDataCate]=useState("");
   const auth = useContext(AuthContext);
  const [create,setCreate]= useState({
    title:"",
    place:"",
    content:"",
    userPost:"", 
    rating:""
  });

   useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch("http://localhost:9000/place/699f071e-f8c7-40a3-8bfa-0ace8bac87e4");

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

    const sendRequest2 = async () => {
      try {
        const response = await fetch("http://localhost:9000/category/fc82d78d-ee17-4b3e-8233-e2e074b629ec");

      const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        await setDataCate(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest2();
  }, []);

  let body="";

  const createHandler = async ()=>{
    console.log(create,auth.id);
     try {
        const response = await fetch('http://localhost:9000/post/5469597b-3042-4088-a657-599bf3d9b1ba', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title:create.title,
            place:create.place,
            content:create.content,
            userPost:auth.id, 
            rating:create.rating
          })
        });
  history.push("/index");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err);
      }
  };


  
  const [createPlace, setCreatePlace]=useState({name:"",categories:""});
  const createPlaceHandler = async () => {
    console.log("Hehe");
     try {
        const response = await fetch('http://localhost:9000/place/91d3992a-fb5f-403b-9274-128732a700d7', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name:createPlace.name,
            categories:createPlace.categories
          })
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log("Hehe");
      } catch (err) {
        console.log(err);
      }
  };

  const [form,setForm] = useState(0);
  let place;
  if(form===1){
  place =(<div class="inputBx">
            <select onChange={e => setCreate({...place,place:e.target.value})}>
              {Object.keys(data).map(place=>(<option value={data[place]._id}>{data[place].name}</option>))}
            </select>
          </div>);
  }
  else if(form===2){
    place=(
    <div class="inputBx">
    <input type="text" name="" placeholder="Name" onChange={e => setCreatePlace({...createPlace, name: e.target.value })}/>
     <div class="inputBx">
            <select onChange={e => setCreatePlace({...createPlace,categories:e.target.value})}>
              {Object.keys(dataCate).map(cate=>(<option value={dataCate[cate]._id}>{dataCate[cate].name}</option>))}
            </select>
          </div>
       <input type="submit" value="Create" onClick={createPlaceHandler}/>
       <input type="cancel" value="Cancel" onClick={e=>setForm(0)}/>
      </div>);
  }
   else if(form===0){
     place=(<div class="inputBx">
    <input type="submit" value="Create" onClick={e=>setForm(2)}/>
    <input type="cancel" value="Choose" onClick={e=>setForm(1)}/>
  </div>);
  }

  
  body=(<section id="contact">
        <div class="title">
          <h2 class="titleText">
            <span>N</span>ew Post
          </h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div class="contactForm">
          <h3>Post Form</h3>
          <div class="inputBx">
            <input type="text" name="" placeholder="Title" onChange={e => setCreate({...create, title: e.target.value })}/>
          </div>
          <div class="inputBx">
            <input type="text" name="" placeholder="Rating" onChange={e => setCreate({...create, rating: e.target.value })}/>
          </div>
          <div class="inputBx">
            <textarea placeholder="Content" onChange={e => setCreate({...create, content: e.target.value })}></textarea>
          </div>
           <p>Place</p>
            {place}
          <div class="inputBx">
            <input type="submit" value="Send" onClick={createHandler}/>
          </div>
        </div>
        
      </section>);
  return (
    <React.Fragment>
      {body}
    </React.Fragment>
  );
};

export default Index;
