
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import DeleteFriend from "./DeleteFriend";


const Friends = ({isItYourProfile}) => {
    const profileId = useParams();
    const [friends, setFriends] = useState(null)
    

    useEffect(()=>{
        db.collection('users').doc(profileId.id).collection('friends').onSnapshot(snapshot =>{
            setFriends(snapshot.docs.map(doc =>({
                id: doc.id,
                friend: doc.data()
            })))     
        })
        return()=>{
            setFriends(null)
        }
    },[profileId])



    return ( 
        <div className="friends">
            {friends && <div className="friends__wrapper">
            <h3 className="friends__title">Znajomi</h3>
                {friends.map(({id, friend})=>(
                    <div key={id} className="friends__listItem">
                        <img className="friends__avatar avatar" src={friend.avatar} alt=""/>
                        <div className="friends__right">
                            <p><Link to={`/users/${friend.from}`}>{friend.username} </Link></p>
                            {isItYourProfile && <DeleteFriend from={friend.from} profileId= {profileId.id}/> }
                        </div>
                    </div>
                ))}
            </div>}
        </div>
     );
}
 
export default Friends; 