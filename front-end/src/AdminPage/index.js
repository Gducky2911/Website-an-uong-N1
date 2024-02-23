import React, { useState, useEffect,useContext } from "react";
import Popup from "../Popup/popup.js";

   import "./index.css" ;

import "./Assets/admin/css/bootstrap4.1.1.css";
    import "./Assets/admin/css/bootstrap-select.css" ;
    
   import "./Assets/admin/css/sb-admin-2.css" ;
   import "./Assets/admin/css/sb-admin-2-min.css";
    import "./Assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
    
    import "./Assets/admin/css/admin.css" ;



const Index = () => {
    let body="";
const [isOpen, setIsOpen] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const [user,setUser] = useState({id:""});
const [form,setForm]=useState("user");
const[cate,setCate]=useState("");
const [place, setPlace] = useState("");
const[accept, setAccept]=useState();
const [post,setPost] = useState("");

const authSumbitHandler= async event => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:9000/admin/0508c70f-e907-4d2a-a718-479e6fab5749', {
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
            setIsLogin(true);
            const sendRequest2 = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setUser(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest2();



    const sendRequestCate = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/category/fc82d78d-ee17-4b3e-8233-e2e074b629ec");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setCate(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestCate();




    const sendRequestPlace = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/place/699f071e-f8c7-40a3-8bfa-0ace8bac87e4");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setPlace(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestPlace();




    const sendRequestAccept = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/admin/9498b701-7324-4825-b5b2-895bc471ec78");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setAccept(responseData2);
        console.log(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestAccept();




    const sendRequestPost = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/admin/7d075fed-f74a-4c94-8897-331430d92514");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setPost(responseData2);
        console.log(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestPost();
        }
        else{
          togglePopup();
        }
      } catch (err) {
        console.log(err);
      }
  }


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }



   body=( <section id="signadmin">
         <div className="container">          
         <div className="user signinBx">
            <div className="formBx">
              <form>
                <h2>Sign In</h2>
                <input type="text" name="" placeholder="Username" onChange={event=>setUsername(event.target.value)}/>
                <input type="password" name="" placeholder="Password" onChange={event=>setPassword(event.target.value)} />
                <input type="submit" name="" value="Login" onClick={authSumbitHandler} />
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
          </div>

      </section>);



      const [IDUSER,setIDUSER]= useState({
    id:"",
  });
   const [IDACCEPT,setIDACCEPT]= useState({
    id:"",
  });

  const deleteUserHandler = async () => {  
     try {
        const response = await fetch("http://localhost:9000/admin/d9bf9936-c269-401e-a811-bb2b19b40be6/"+IDUSER.id, {
          method: 'DELETE'
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if(responseData.Sucessful)
        {
           const sendRequest2 = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/user/077137bb-22ec-479c-8be3-62dd5c9e599d");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setUser(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequest2();
        }
        else{
          togglePopup();
        }
      } catch (err) {
        console.log(err);
      }}


const acceptHanler = async ()=>{
    try {
        const response2 = await fetch('http://localhost:9000/admin/38125532-3ba8-4019-a7ea-17d88ea3cb32/'+IDACCEPT.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setPost(responseData2);
         const sendRequestAccept = async () => {
      try {
        const response2 = await fetch("http://localhost:9000/admin/9498b701-7324-4825-b5b2-895bc471ec78");

        const responseData2 = await response2.json();

        if (!response2.ok) {
          throw new Error(responseData2.message);
        }
        await setAccept(responseData2);
        console.log(responseData2);
      } catch (err) {
        console.log(err);
      }
    };
    sendRequestAccept();
        
      } catch (err) {
        console.log(err);
      }
    
}
    

let editbody="";



      let formbody="";
      if(form==="user")
      formbody=(<div class="container-fluid generalClass" id="UserContent">
                    <h1 class="h3 mb-2 text-gray-800">User</h1> 
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Bảng thống kê</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Follower</th>
                                            <th>Phone</th>
                                            <th>Check</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(user).map(useraccount=>(
                                        <tr>
                                            <td>{user[useraccount].username}</td>
                                            <td>{user[useraccount].email}</td>
                                            <td>{user[useraccount].follower}</td>
                                            <td>{user[useraccount].phone}</td>  
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                     <input type="checkbox"onClick={e => setIDUSER({id:user[useraccount]._id})} />
                                                </div>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                                <button class="btn btn-success " name="" onClick={deleteUserHandler}>Xóa</button>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Sửa</button>
                            </div>
                        </div>
                    </div>
                    <h1 class="h3 mb-2 text-gray-800">Chỉnh sửa User</h1> 
                    <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Follower</th>
                                        <th>Phone</th>
                                        <th>City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>    
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-success " name="" onClick="">Hủy bỏ</button>
                            <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Lưu</button>
                        </div>
                    </div>
                </div>
                </div>
      );
      else if(form==="category")
      formbody =(   <div class="container-fluid generalClass" id="CategoryContent">
                    <h1 class="h3 mb-2 text-gray-800">Category</h1>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Bảng thống kê</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Number of Place</th>
                                            <th>Image</th>
                                            <th>Check</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         {Object.keys(cate).map(category=>(<tr>
                                            <th>{cate[category].name}</th>
                                            <th>{cate[category].number}</th>
                                            <th><img src={cate[category].avatar } width="100" height="100"></img></th>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                     <input type="checkbox" />
                                                </div>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,true)">Thêm</button>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,true)">Xóa</button>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Sửa</button>
                            </div>
                        </div>
                    </div>
                    <h1 class="h3 mb-2 text-gray-800">Chỉnh sửa Category</h1> 
                    <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                        <th>Avatar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="file"></input></td> 
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-success " name="" onClick="">Hủy bỏ</button>
                            <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Lưu</button>
                        </div>
                    </div>
                </div>
                </div>)
        else if(form==="place")
        formbody=( <div class="container-fluid generalClass" id="PlaceContent">
                    <h1 class="h3 mb-2 text-gray-800">Place</h1>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Bảng thống kê</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                    <thead>
                                             <tr>
                                            <th>Name</th>
                                            <th>Adress</th>
                                            {/* <th>Categories</th> */}
                                            <th>Image</th>
                                            <th>Rating</th>
                                            <th>Check</th>
                                            </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(place).map(placedata=>(<tr>
                                            <th>{place[placedata].name}</th>
                                             <th>{place[placedata].address.city}</th>
                                             <th><img src={place[placedata].image} width="100" height="100"></img></th>
                                             {/* {Object.keys(place[placedata].categories).map(placecate=>(<th>{place[placedata].categories[placecate].ObjectId}</th>))} */}
                                             <th>{place[placedata].rating}</th>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                     <input type="checkbox" />
                                                </div>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,true)">Thêm</button>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,true)">Xóa</button>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Sửa</button>
                            </div>
                        </div>
                    </div>
                    <h1 class="h3 mb-2 text-gray-800">Chỉnh sửa Place</h1> 
                    <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Adress</th>
                                        <th>Image</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="file"></input></td>
                                        <td><input type="textbox"></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-success " name="" onClick="">Hủy bỏ</button>
                            <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Lưu</button>
                        </div>
                    </div>
                </div>
                </div>);
        else if(form==="accept")
          formbody=( <div class="container-fluid generalClass" id="AcceptContent">
                    <h1 class="h3 mb-2 text-gray-800">Place needs accept</h1>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Bảng thống kê</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>City</th>
                                            <th>Image</th>
                                            <th>Category</th>
                                            <th>Check</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(accept).map(acceptdata=>(
                                        <tr>
                                            <td>{accept[acceptdata].name}</td>
                                            <td>{accept[acceptdata].address.city}</td>
                                            <td>{accept[acceptdata].image}</td>
                                            <td>Món Nhật</td>  
                                            <td>
                                                <div class="custom-control custom-checkbox" >
                                                     <input type="checkbox" onClick={e => setIDACCEPT({id:accept[acceptdata]._id})}/>
                                                </div>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                                <button class="btn btn-success " name="" onClick={acceptHanler}>Accept</button>
                            </div>
                        </div>
                    </div>
                </div>);
          else if(form==="post")
           formbody=(  <div class="container-fluid generalClass" id="ReportedContent">
                    <h1 class="h3 mb-2 text-gray-800">Reported Post</h1>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Bảng thống kê</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Post Date</th>
                                            <th>Reported</th>
                                            <th>Like</th>
                                            <th>Rating</th>
                                            <th>Check</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(post).map(postdata=>(<tr>
                                            <th>{post[postdata][0].title}</th>
                                            <th>{post[postdata][0].postDate}</th>
                                             <th>{post[postdata][0].reported}</th>
                                             <th>{post[postdata][0].like}</th>
                                            <th>{post[postdata][0].rating}</th>
                                            <td>
                                                <div class="custom-control custom-checkbox">
                                                     <input type="checkbox" />
                                                </div>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                                <button class="btn btn-success " name="" onclick="AddOrEdit(0,true)">Delete</button>
                            </div>
                        </div>
                    </div>
                    <h1 class="h3 mb-2 text-gray-800">Chỉnh sửa Post</h1> 
                    <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="SongDataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Post Date</th>
                                        <th>Reported</th>
                                        <th>Like</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                        <td><input type="textbox"></input></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-success " name="" onClick="">Hủy bỏ</button>
                            <button class="btn btn-success " name="" onclick="AddOrEdit(0,false)">Lưu</button>
                        </div>
                    </div>
                </div>
                </div>);             

                
  if(isLogin===true)
    body=(<div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Admin </div>
            </a>
            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span onClick={e=>setForm("user")}>Manage User</span>
                </a>
            </li>
            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span onClick={e=>setForm("category")}>Manage Category</span>
                </a>
            </li>
            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span onClick={e=>setForm("place")}>Manage Place</span>
                </a>
            </li>
            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span onClick={e=>setForm("accept")}>Place need accept</span>
                </a>
            </li>
            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span onClick={e=>setForm("post")}>Reported Post</span>
                </a>
            </li>
        </ul>
        <div id="content-wrapper" class="d-flex flex-column"> 
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="alert alert-info annouce">
                    <strong>Thông báo</strong>
                </div>
                

                                            {formbody}


            
            </div>
        </div>
    </div>);

 
   
    return(
    <React.Fragment>
        {body}
    </React.Fragment>)
};

export default Index;