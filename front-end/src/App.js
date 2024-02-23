import React, { useState, useEffect,  useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.css";

import { AuthContext } from "./Auth/auth-context";
import {CategoryContext} from "./Auth/categories";
import {PostContext} from "./Auth/post";
import {DetailPostContext} from "./Auth/detailpost"
import {UserContext} from "./Auth/user"
import {SearchContext} from "./Auth/search";

import SearchPage from "./SearchPage/index.js";
import UserPage from "./UserPage/index.js";
import LandingPage from "./LandingPage/index.js";
import HomePage from "./HomePage/index.js";
import SignPage from "./SignPage/index.js";
import NewPost from "./NewPost/index.js";
import MenuPage from "./MenuPage/index.js";
import AccountPage from "./AccountPage/index.js";
import Header from "./Header/index.js";
import CategoryPost from "./CategoryPost/index.js";
import PostPage from "./PostPage/index.js";
import DetailPostPage from "./DetailPost/index.js";
import Admin from "./AdminPage/index.js";

export default withRouter(function App({ location }) {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [id,setID]=useState("");

  const getid=useCallback(props => {
    setID(props)
  },[]);
  
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const [id2,setID2]=useState("");

  const getid2=useCallback(props => {
    setID2(props)
  },[]);

  const [id3,setID3]=useState("");

  const getid3=useCallback(props => {
    setID3(props)
  },[]);

  const [id4,setID4]=useState("");

  const getid4=useCallback(props => {
    setID4(props)
  },[]);

  const [id5,setID5]=useState("");

  const getid5=useCallback(props => {
    setID5(props)
  },[]);

  const [id6,setID6]=useState("");

  const getid6=useCallback(props => {
    setID6(props)
  },[]);


  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [window.location.pathname]);

  let routes;
  if(isLoggedIn){
    routes=(
    <React.Fragment>
              <Route path="/search" exact>
        <SearchPage/>
      </Route>
       <Route path="/user" exact>
        <UserPage />
      </Route>
      <Route path="/" exact>
        <LandingPage />
      </Route>
       <Route path="/post" exact>
        <PostPage />
      </Route>
       <Route path="/detailpost" exact>
        <DetailPostPage />
      </Route>
      <Route path="/categorypost" exact>
        <CategoryPost />
      </Route>
      <Route path="/newpost" exact>
        <NewPost />
      </Route>
      <Route path="/menu" exact>
        <MenuPage />
      </Route>
      <Route path="/account" exact>
        <AccountPage />
      </Route>
      <Route path="/index" exact>
        <HomePage />
      </Route>
      <Redirect to="/index" />
    </React.Fragment>);
  }
  else{
    routes=( <React.Fragment>
        <Route path="/search" exact>
        <SearchPage/>
      </Route>
       <Route path="/user" exact>
        <UserPage/>
      </Route>
      <Route path="/admin" exact>
        <Admin />
      </Route>
      <Route path="/" exact>
        <LandingPage />
      </Route>
       <Route path="/post" exact>
        <PostPage />
      </Route>
      <Route path="/detailpost" exact>
        <DetailPostPage />
      </Route>
      <Route path="/categorypost" exact>
        <CategoryPost />
      </Route>
      <Route path="/sign" exact>
        <SignPage />
      </Route>
      <Route path="/menu" exact>
        <MenuPage />
      </Route>
      <Route path="/index" exact>
        <HomePage />
      </Route>
      </React.Fragment>);
  }

  let body=(<AuthContext.Provider
      value={{ id:id,isLoggedIn: isLoggedIn, login: login, logout: logout,getid:getid }}
    >
    <CategoryContext.Provider  value={{ id:id2,getid:getid2 }}>
    <PostContext.Provider value={{ id:id3,getid:getid3 }}>
      <DetailPostContext.Provider value={{ id:id4,getid:getid4 }}>
        <UserContext.Provider value={{ id:id5,getid:getid5 }}>
          <SearchContext.Provider value={{ id:id6, getid:getid6 }}>
      <Header/>
      <div>                
        <Switch>
          {routes}
        </Switch> 
      </div>
      </SearchContext.Provider>
      </UserContext.Provider>
      </DetailPostContext.Provider>
      </PostContext.Provider>
      </CategoryContext.Provider>
    </AuthContext.Provider>);

  if(window.location.pathname==="/admin")
    body=(<Switch>
          {routes}
        </Switch> );

  return (
    <Switch>    
      {body}
    </Switch>

  );
});
