import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import firebase from 'firebase'
const LeaveDinner = ({id}) => {
    const dinnerId = useParams()
    
    const leave = () => {
        db.collection('diners').doc(dinnerId.id).collection("invited").doc(id).delete().then(()=>{
            console.log('usunieto');;
        }).catch((error)=>{
            console.log(error)
        })
        db.collection('users').doc(auth.X).collection('dinners').doc(dinnerId.id).delete()
        db.collection('users').doc(auth.X).update({
            dinners: firebase.firestore.FieldValue.increment(-1)
        })
    }



    return ( 
        <button className="leaveButton" onClick={()=>leave()}>Opuść</button>
     );
}
 
export default LeaveDinner;