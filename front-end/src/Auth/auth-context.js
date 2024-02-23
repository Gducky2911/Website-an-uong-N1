import { createContext } from "react";

export const AuthContext = createContext({
  id:'',
  isLoggedIn: false, 
  login: () => {},
  logout: () => {},
  getid:()=>{},
});
