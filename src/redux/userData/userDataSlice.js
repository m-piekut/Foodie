import { createSlice } from "@reduxjs/toolkit";
import { auth} from "../../firebase";



export const userDataSlice = createSlice({
    name : "loginUp",
    initialState: {
        loggedUserId: '',
        loggedUserUsername: '',
        loggedUserPhotos: 2,
    },
    reducers: {
        loginUp: state =>{
            state.loggedUserId = auth.X
            state.loggedUserUsername = auth.currentUser.displayName
           
        },
        loginOut: state =>{
            state.loggedUserId = ''
            state.loggedUserUsername = ''
        },
        getPhotos: (state, action)=>{
            state.loggedUserPhotos = action.payload
        }



}})

export const {loginUp, loginOut, getPhotos} = userDataSlice.actions
export default userDataSlice.reducer