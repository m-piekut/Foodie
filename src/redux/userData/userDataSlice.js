import { createSlice } from "@reduxjs/toolkit";
import { auth} from "../../firebase";



export const userDataSlice = createSlice({
    name : "loginUp",
    initialState: {
        loggedUserId: '',
        loggedUserUsername: '',
        loggedAvatar: '',
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
        getAvatar: (state, action)=>{
            state.loggedAvatar = action.payload
        }



}})

export const {loginUp, loginOut, getAvatar} = userDataSlice.actions
export default userDataSlice.reducer