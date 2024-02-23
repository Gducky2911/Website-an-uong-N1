import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Auth/auth-context";

const Index = () => {
    const auth = useContext(AuthContext);

    const authSumbitHandler=event => {
    event.preventDefault();
    auth.login();
    }

    const authSumbitHandlerOut = event => {
        auth.logout();
    }
    
    return(
        <React.Fragment>
            {auth.isLoggedIn && (
            <li>
              <NavLink to="/newpost" exact className="menu-link">
                New Post
              </NavLink>
            </li>)}
            {auth.isLoggedIn && (
            <li>
              <NavLink to="/account" exact className="menu-link">
                Account
              </NavLink>
            </li>)}
            {auth.isLoggedIn && (
            <li>
              <NavLink to="/index" exact className="menu-link" onClick={()=>authSumbitHandlerOut()}>
                Sign out
              </NavLink>
            </li>)
            }
            {!auth.isLoggedIn &&(
            <li>
              <NavLink to="/sign" exact className="menu-link">
                Sign in
              </NavLink>
            </li>)}
            </React.Fragment>
    );
}
            
export default Index;