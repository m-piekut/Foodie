import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import InviteAnswer from "./InviteAnswer";

const Invites = ({id}) => {
    const yourId = id
    const [invites, setInvites] = useState(null)

   useEffect(()=>{
    db.collection('users').doc(id).collection('invites').onSnapshot(snapshot =>{
        setInvites(snapshot.docs.map(doc =>({
            id: doc.id,
            invite: doc.data()
        })))      
    })
    return()=>{
    }
   },[])



    return (
        <div className="friends">
            <h3 className="friends_title">Zaproszenia</h3>
            {(invites && invites.length !=0) ? (<div className="friends__wrapper">
                {invites.map(({id, invite})=>(
                    <div key={id} className="friends__listItem">
                        <img className="friends__avatar avatar" src={invite.avatar} alt=""/>
                        <div className="friends__right">
                            <p><Link to={`/users/${invite.from}`}>{invite.username} </Link></p>
                            <InviteAnswer   from={invite.from} yourId={yourId} avatar={invite.avatar} username={invite.username}/>
                            
                        </div>
                    </div>
                ))}
            </div>): <p>brak zaproszeń</p>}
        </div> );
}
 
export default Invites;