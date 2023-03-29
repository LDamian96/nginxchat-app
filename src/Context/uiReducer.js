import React from 'react'
const initialState={
    loading:false,
    msgError:null
}
export const types={
    uiSeterror:['set error'],
    uiRemove:['remove']
}
export const uiReducer = (state=initialState,action) => {
 switch (action.type) {
    case types.uiSeterror:{
        return{
            ...state,
            msgError:action.payload
        }
    }

    case types.uiRemove:{
        return{
            ...state,
            msgError:null
        }
    }
    default:
     return   state
 }

}
