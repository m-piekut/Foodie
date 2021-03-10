import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../../firebase";

const AddToFriends = () => {

    const profileId = useParams()
    const [yourId, setYourId] = useState('')
    const [yourInfo, setYourInfo] = useState('')
    const [test, setTest]= useState(null)
    useEffect(()=>{
        setYourId(auth.X)
        db.collection('users').doc(auth.X).onSnapshot(doc =>{
            setYourInfo(doc.data())
        })
        return()=>{
            console.log('odłaczono addTO friends')
        }
    },[])


   

    const addFriend = ()=>{
        db.collection("users").doc(`${profileId.id}`).collection('invites').doc(yourId).set({
            from: yourId,
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
