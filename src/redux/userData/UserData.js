import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import { loginUp, getAvatar } from "./userDataSlice";

export function UserData(){
    const {userUsername, userId, userPhotos} = useSelector(state => state.takeData)
    const dispatch = useDispatch()
    const [test1, setTest1] = useState(null)
    const photoDownload = ()=>{
        db.collection('users').doc(userId).collection('images').onSnapshot(snapshot=>{
            setTest1(snapshot.docs.map(doc => ({
             id : doc.id,
             image: doc.data()
     
             })))
             
            });
    }
    return(
        <div>
            <button onClick={()=> dispatch(loginUp())}>Data</button>
            <button onClick={()=> photoDownload()}>Pobierz zdjęcia</button>
            <button onClick={()=> dispatch(getPhotos(test1))}>Przypisz zdjęcia do stanu</button>
            
            <button onClick={()=> console.log(userUsername)}>Username</button>
            <button onClick={()=> console.log(userId)}>ID</button>
            <button onClick={()=> console.log(userPhotos)}>Photos</button>
            <button onClick={()=> console.log(auth)}>Photos</button>
            
          


        </div>
    )
}