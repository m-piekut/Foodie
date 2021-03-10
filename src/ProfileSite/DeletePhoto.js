import { useParams } from "react-router-dom";
import { db, storage } from "../firebase";

const DeletePhoto = ({imageId, imageName}) => {
    const {id} = useParams();



    const photoRef = storage.ref(`${id}/Images/`).child(`${imageName}`);
    const handelDelete = ()=> {
        photoRef.delete().then(()=>{
            console.log('usunięto zdjęcie z bazy')
        }).catch((error)=>{
            alert(error)
        })
        db.collection('users').doc(id).collection("images").doc(imageId).delete().then(()=>{
            console.log('usunięto link do zdjęcia');
        }).catch((error)=>{
            console.log(error);
        })
    }



    return ( 
        <button className="user-profile__deletePhoto" onClick={handelDelete}><i className="far fa-trash-alt"></i></button>
     );
}
 
export default DeletePhoto;