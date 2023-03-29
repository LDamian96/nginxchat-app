import { types } from "./uiReducer"



export const setError =(err)=>{
    return {
        type: types.uiSeterror,
        payload: err
    }

}

export const removeError =(err)=>{
    return {
        type: types.uiRemove,
        
    }

}
