import { getAuth, signInWithPopup } from "firebase/auth"
import { auth, authentication, facebookprovider } from "../FIREBASE/firebase"
import { types } from "../TYPES/types"


export const login = (uid,displayname) =>{
    return{
        type:types.login,
        payload:{
            uid,displayname
        }
    }
}

