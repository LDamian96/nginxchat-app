import React, { useContext, useState } from "react";
import Add from "../IMAGENES/add.png";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, googleprovider, storage } from "../FIREBASE/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";





export const Register = () => {
 
const [err, seterr] = useState(false)
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
 
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    

    try {
      //Create user
     
      const res = await createUserWithEmailAndPassword(auth, email, password,)
      console.log(res)

      //Create a unique image name
    
      const storageRef = ref(storage, displayName);
      console.log(res)
      await uploadBytesResumable(storageRef, file).then(() => {
        
        getDownloadURL(storageRef).then(async (downloadURL) => {
          
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid),  {
              
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            seterr(true);
          
          }
        });
      });
      console.log(res)
    } catch (err) {
      seterr(true);
     
    }
  

  };
 

  
  return (
    <div className='xx'>
        <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>LDamian</span>
            <span className='title'>Register</span> 
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='name' />
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" id='file' style={{
                    display:"none"
                }}/>
                <label htmlFor='file'>
                    <img src={Add} />
                    <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
                {err && <span>luisdamianmachacadrake</span>}
              
            </form>
         
            <p>you do have an account? <Link to="/login">login</Link></p>
          
        </div>

    </div>
    </div>
  )
}
