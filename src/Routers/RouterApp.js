import {
    BrowserRouter ,
    Navigate,

    
    
    Route,
    
    
   Routes
    
  } from "react-router-dom"
  import React, { useContext } from 'react'
import { Register } from "../PAGE-REGISTRO/Register"
import { Login } from "../PAGE-REGISTRO/Login"
import { Home } from "../PAGE-REGISTRO/Home"
import { AuthContext } from "../Context/AuthContext"
  
  export const RouterApp = () => {
    const { currenuser } = useContext(AuthContext);
    console.log(currenuser)
    const ProtectedRoute = ({ children }) => {
      if (!currenuser) {
        return <Navigate to="/login" />;
      }
  
      return children
    };
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  