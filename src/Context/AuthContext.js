import { onAuthStateChanged } from "firebase/auth";
import  { createContext, useState,useEffect, useContext } from "react";
import { auth } from "../FIREBASE/firebase";


export const AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{

    const [currenuser, setcurrenuser] = useState({ });
    
   
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setcurrenuser(user);
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currenuser }}>
      {children}
    </AuthContext.Provider>
  );
};
