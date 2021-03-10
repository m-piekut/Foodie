import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import DeleteFriend from "./DeleteFriend";
import Invites from "./Invites";

const Friends = ({isItYourProfile}) => {
    const {id} = useParams();
    const [friends, setFriends] = useState(null)
    

    useEffect(()=>{
        db.collection('users').doc(id).collection('friends').onSnapshot(snapshot =>{
            setFriends(snapshot.docs.map(doc =>({
                id: doc.id,
                friend: doc.data()
            })))      
        })
       return(()=>{
           
       })
    },[id])



    return ( 
        <div className="friends">
            {friends && <div className="friends__wrapper">
            <h3 className="friends_title">Obserwujący</h3>
                {friends.map(({id, friend})=>(
                    <div key={id} className="friends__listItem">
                        <img className="friends__avatar avatar" src={friend.avatar} alt=""/>
                        <div className="friends__right">
                            <p><Link to={`/users/${friend.from}`}>{friend.username} </Link></p>
                            {isItYourProfile && <DeleteFriend/> }
                        </div>
                    </div>
                ))}
            </div>}
        </div>
     );
}
 
export default Friends; 