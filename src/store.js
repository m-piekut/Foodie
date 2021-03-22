import { configureStore } from "@reduxjs/toolkit";
import loginUpReducer from './redux/userData/userDataSlice'
export default configureStore({
    
    reducer : {
        takeData : loginUpReducer
    }
})