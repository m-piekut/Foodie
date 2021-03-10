import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import AddToFriends from "./Friends/AddToFriends"
import Friends from "./Friends/Friends"


const StandardProfile = ({userProfile, userImages, userId}) => {


    const[showFriends,setShowFriends] = useState(false)
    const[alreadyInvite, setAlreadyInvite] = useState(null)
    const[alreadyFriend, setAlreadyFriend] = useState(null)
    const [test, setTest] = useState(null)

    useEffect(()=>{
        db.collection('users').doc(userId).collection('invites').doc(auth.X).onSnapshot((doc)=>{
            setAlreadyInvite(doc.data())
        })
        db.collection('users').doc(userId).collection('friends').doc(auth.X).onSnapshot((doc)=>{
            setAlreadyFriend(doc.data())
        })
       
        return
    },[])


    return (  
        <div className="user-profile">
            {/* <p className="user-profile-quote">{userProfile.quote}</p> */}
            <div className="user-info">
                <img className="user-info__image" src={userProfile.avatar} alt=""/>
                <div className="user-info__personal">
                    <div className="user-info__personal-upper">
                    <p className="user-info__username">{userProfile.username}</p>
                    <div className="user-info__emotes">
                        <div className="user-info__emotes-item">
                            <i className="far fa-grin-tongue "></i>
                            <p>{userProfile.likes}</p>
                        </div>
                        <div className="user-info__emotes-item user-info__emotes-item--middle">
                            <i className="fas fa-utensils"></i>
                            <p>{userProfile.dinners}</p>
                        </div>
                        <div className="user-info__emotes-item user-info__emotes-item" onClick={()=>setShowFriends(!showFriends)}>
                        <i className="fas fa-user-friends"></i>
                            <p >2</p>
                        </div>
                    </div>
                    {showFriends && <Friends/>
                    }
                    </div>
                    <p className="user-info__personal-description">{userProfile.description}</p>
                </div>
                           {/* <i className="fas fa-utensils"></i> */}
                {!alreadyInvite && !alreadyFriend ? <AddToFriends userProfile={userProfile}/>: "juz zaprosiłes/obserwujesz"}
            </div>
            {userImages &&<div className="user-profile__images-box">
                {userImages.map(({id, image})=>(
                   <div className="user-profile__image" key={id}>
                   <img src={image.image} alt="" />
                   {/* <div className="user-profile__img" style={ { backgroundImage: `url("${image.image}")`}}> </div> */}
               </div>
                ))}
            </div>}
        </div>

     );
}
 
export default StandardProfile;