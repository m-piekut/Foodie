import { useParams } from "react-router-dom";
import { db } from "./firebase";

const LeaveDinner = ({id}) => {
    const dinnerId = useParams()
    const leave = () => {
        db.collection('diners').doc(dinnerId.id).collection("invited").doc(id).delete().then(()=>{
            console.log('usunieto');;
        }).catch((error)=>{
            console.log(error)
        })
        console.log(dinnerId.id)
    }



    return ( 
        <button className="leaveButton" onClick={()=>leave()}>Opuść</button>
     );
}
 
export default LeaveDinner;