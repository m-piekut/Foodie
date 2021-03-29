import { db } from "../../firebase";
import firebase from 'firebase'
import { useSelector } from "react-redux";
const InviteAnswer = ({from, yourId, avatar, username}) => {
   
    const { loggedAvatar, loggedUserUsername} = useSelector(state => state.takeData)


    const acceptInvite= ()=>{
        db.collection('users').doc(yourId).collection('friends').doc(from).set({
            from : from,
            avatar: avatar,
            username: username

        })
        .then(
            // dołaczanie twojego profilu do znajomego
            db.collection('users').doc(from).collection('friends').doc(yourId).set({
                from: yourId,
                avatar: loggedAvatar,
                username: loggedUserUsername
            }).then(
                db.collection('users').doc(from).update({
                    friends: firebase.firestore.FieldValue.increment(1)
                })
            )
        )
        .then(
            db.collection('users').doc(yourId).collection('invites').doc(from).delete().then(()=>{
                alert('Przyjęto zaproszenie')
            }).catch((error)=>{
                console.log(error)
            })
        )
        db.collection('users').doc(yourId).update({
            friends: firebase.firestore.FieldValue.increment(1)
        })
        
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