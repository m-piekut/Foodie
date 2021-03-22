import { db } from "../../firebase";
import firebase from 'firebase'
const DeleteFriend = ({from, profileId}) => {

    const deleteFriend = ()=>{
        db.collection('users').doc(profileId).collection('friends').doc(from).delete().then(()=>{
            alert('usunięto znajomego')
            db.collection('users').doc(profileId).update({
                friends: firebase.firestore.FieldValue.increment(-1)
            })
        })
    }

    return ( 
        <button className="friends__delete" onClick={()=>deleteFriend()}><i className="fas fa-times"></i></button>
     );

}
 
export default DeleteFriend;