
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import Site404 from "../Site404";
import AddToFriends from "./Friends/AddToFriends"
import Friends from "./Friends/Friends"
import ProfileDinners from "./ProfileDinners";


const StandardProfile = ({userProfile, userImages, userId}) => {


    const[showFriends,setShowFriends] = useState(false)
    const[showDinners,setShowDinners] = useState(false)
    const[alreadyInvite, setAlreadyInvite] = useState(true)
    const[alreadyFriend, setAlreadyFriend] = useState(true)

    useEffect(()=>{
        if (auth.X) {db.collection('users').doc(userId).collection('invites').doc(auth.X).onSnapshot((doc)=>{
            setAlreadyInvite(doc.data())
        })
        db.collection('users').doc(userId).collection('friends').doc(auth.X).onSnapshot((doc)=>{
            setAlreadyFriend(doc.data())
        })} else{
            setAlreadyFriend(false)
            setAlreadyInvite(false)
        }
       
        return function cleanup(){

        }
    },[alreadyInvite, alreadyFriend])


    return (  
        (userProfile ? (<div className="user-profile">
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
                        <div className="user-info__emotes-item user-info__emotes-item--middle"
                        onClick={()=>{setShowDinners(!showDinners); 
                            setShowFriends(false)}}>
                            <i className="fas fa-utensils"></i>
                            <p>{userProfile.dinners}</p>
                        </div>
                        <div className="user-info__emotes-item user-info__emotes-item" 
                        onClick={()=>{setShowFriends(!showFriends); 
                        setShowDinners(false)}}>
                        <i className="fas fa-user-friends"></i>
                            <p >{userProfile.friends}</p>
                        </div>
                    </div>
                    {showFriends && <Friends/>}
                    {showDinners && <ProfileDinners/>}
                    </div>
                    <p className="user-info__personal-description">{userProfile.description}</p>
                </div>
                           {/* <i className="fas fa-utensils"></i> */}
                {auth.X ? ( !alreadyInvite && !alreadyFriend ? <AddToFriends userProfile={userProfile}/>: "juz zaprosiłes/obserwujesz") : false}
            </div>
            {userImages &&<div className="user-profile__images-box">
                {userImages.map(({id, image})=>(
                   <div className="user-profile__image" key={id}>
                   <img src={image.image} alt="" />
                   {/* <div className="user-profile__img" style={ { backgroundImage: `url("${image.image}")`}}> </div> */}
               </div>
                ))}
            </div>}
        </div>) : <Site404/>)

     );
}
 
export default StandardProfile;