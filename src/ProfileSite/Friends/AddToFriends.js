import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { auth, db } from "../../firebase";

const AddToFriends = () => {

    const profileId = useParams()
    const [yourInfo, setYourInfo] = useState(null)
    const { loggedUserId} = useSelector(state => state.takeData)
    useEffect(()=>{
        db.collection('users').doc(loggedUserId).onSnapshot(doc =>{
            setYourInfo(doc.data())
        })
        return()=>{
        }
    },[])


   

    const addFriend = ()=>{
        db.collection("users").doc(`${profileId.id}`).collection('invites').doc(loggedUserId).set({
            from: loggedUserId,
            username: yourInfo.username,
            avatar: yourInfo.avatar
        })
        console.log(1);
    }


    return ( 
        <button className="add-photos" onClick={()=>addFriend()}><i className="fas fa-user-plus add-photos__icon"></i></button>
     );
}
 
export default AddToFriends;
