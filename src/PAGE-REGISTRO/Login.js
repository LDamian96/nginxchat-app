import React, { useContext, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

import { auth, db, facebookprovider, faceprovider, googleprovider } from '../FIREBASE/firebase';
import { login } from '../ACTIONS/auth';
import { AuthContext } from '../Context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import google from "../IMAGENES/google.png"
import face from "../IMAGENES/face.png"
export const Login = () => {
  const {currenuser} =useContext(AuthContext)
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
   
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };


  const startgoogle=async()=>{
   
    

  const res= await signInWithPopup(auth, googleprovider).then(async({user})=>{
      console.log(user);
      const credential =  GoogleAuthProvider.credentialFromResult(user);

     try {
     
      await setDoc(doc(db, "users", res.user.uid),  {
              
        uid:user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
       
      });

      await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");

     } catch (error) {
      console.log(Error)
      setErr(true)
     }
    
     navigate("/");
    })
      
      
  }

  
  const startface=async()=>{
   
    

    const res= await signInWithPopup(auth, faceprovider).then(async({user})=>{
    
      const credential = FacebookAuthProvider.credentialFromResult(user);
   
       try {
  
        
        await setDoc(doc(db, "users", res.user.uid),  {
                
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
         
        });
  
        await setDoc(doc(db, "userChats",user.uid), {});
              navigate("/");
  
       } catch (error) {
        console.log(Error)
        setErr(true)
       }
              navigate("/")
      })
     
        
    }


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">LDamian</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Don't exist account. Check in</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>

        <div className='google3'onClick={startgoogle}>
        <img src={google} className='google'/> 
        <span onClick={ startgoogle} className="google2">
        Sign up with Google      </span>
          </div>    
          <div className='google3 ldm'onClick={startface}>

        <img src={face} className="google luis"/> 
        <span onClick={ startgoogle} className="google2">
        Sign up with Facebook          </span>
          </div>  
        
      </div>
    </div>
  );
};

