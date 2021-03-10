import { db } from "../../firebase";

const InviteAnswer = ({from, yourId, avatar, username}) => {
   
    const acceptInvite= ()=>{
        db.collection('users').doc(yourId).collection('friends').doc(from).set({
            from : from,
            avatar: avatar,
            username: username

        }).then(
            db.collection('users').doc(yourId).collection('invites').doc(from).delete().then(()=>{
                alert('Przyjęto zaproszenie')
            }).catch((error)=>{
                console.log(error)
            })
        )
        
        
    }
    const declineInvite = ()=>{
      db.collection('users').doc(yourId).collection('invites').doc(from).delete().then(()=>{
          alert('nie przyjęto zaproszenia')
      }).catch((error)=>{
          console.log(error)
      })
    }





    return ( 
        <div className="friends__buttons">
            <button onClick ={acceptInvite}><i className="fas fa-check"></i></button>
            <button onClick={declineInvite}><i className="fas fa-times"></i></button>
        </div>
     )
}
 
export default InviteAnswer;