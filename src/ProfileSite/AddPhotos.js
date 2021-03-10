import { Button, Modal } from "@material-ui/core";
import { useState } from "react";
import { db, storage } from "../firebase";

const AddPhotos = ({id}) => {

    const [openPhotoForm, setOpenPhotoForm] =useState(false);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const handleChange = (e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
            console.log(image)
        }
    }
    const addPhoto = (e)=>{
        e.preventDefault()

        const uploadTask = storage.ref(`${id}/Images/${image.name}`).put(image)
        uploadTask.on(
            "stage_changed",
            (snapshot) => {
                //progress func...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) *100
                );
                setProgress(progress)
                if(progress == 100){
                    setTimeout(() => {
                        setOpenPhotoForm(false)
                        
                    }, 500);
                }
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message)
            },
            ()=> {
                //complete function

                storage
                .ref(`${id}/Images`)
                .child(`${image.name}`)
                .getDownloadURL()
                .then(url => {
                    db.collection('users').doc(id).collection('images').add({
                        image: url,
                        name: image.name
                    });
                    setProgress(0);
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className="add-photo-form">

            <button className="add-photos" onClick={()=>setOpenPhotoForm(true)}><i className="fas fa-image add-photos__icon"></i>Dodaj zdjęcie</button>


            <Modal
            open={openPhotoForm}
            onClose={()=> setOpenPhotoForm(false)}
            >
            <form className="new-dinner" onSubmit={addPhoto}>
            <h3>Twóje zdjęcie</h3>
                {/* <input type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)}/> */}
                <p className="user-profile__form-procentage">{progress}%</p>
                {/* <progress className="user-profile__form-progress" value={[70]} max="100"/> */}
                <progress className="user-profile__form-progress" value={[progress]} max="100"/>
                <input required className="user-profile__form-input" type="file" onChange={handleChange}/>
                
                <button  className="primary-btn">Wyslij</button>
            </form>
        </Modal>




        </div>
     );
}
 
export default AddPhotos;