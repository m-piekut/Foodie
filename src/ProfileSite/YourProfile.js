import { Modal } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {db, storage} from '../firebase'
import AddPhotos from "./AddPhotos";
import DeletePhoto from "./DeletePhoto";
import Friends from "./Friends/Friends";
import Invites from "./Friends/Invites";

const YourProfile = ({userProfile, userImages}) => {

    const {id} = useParams();
    const [quoteForm, setQuoteForm]  = useState(false);
    const [avatarForm, setAvatarForm]  = useState(false);
    const [descriptionForm, setDescriptionForm]  = useState(false);

    const [quote, setQuote] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');

    const [userDbPath, setUserDbPath] = useState(null)
    const[showFriends,setShowFriends] = useState(false)
    
    useEffect(()=>{
        setQuote(userProfile.quote)
        setAvatar(userProfile.avatar)
        setDescription(userProfile.description)
        setUserDbPath(db.collection('users').doc(id))
        
    },[userProfile, id])


    
    const handleQuote = (e)=> {
        e.preventDefault()
        setQuoteForm(false)
        userDbPath.update({
            quote : quote
        })
    }
    
    const handleDescription = (e)=> {
        e.preventDefault()
        setDescriptionForm(false)
        userDbPath.update({
            description : description
        })
    }
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)

   const handleChange = (e)=>{
       if(e.target.files[0]){
           setImage(e.target.files[0])
       }
   }
   const handleUpload = (e)=>{
       e.preventDefault()
        const uploadTask = storage.ref(`${id}/avatar`).put(image)
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
                        setAvatarForm(false)
                        
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
                .ref(`${id}`)
                .child("avatar")
                .getDownloadURL()
                .then(url => {
                    userDbPath.update({
                        avatar : url
                    });
                    setProgress(0);
                    setImage(null);
                })
            }
        )
   }
  
    return ( 
        <div className="user-profile">
            {/* <p className="user-profile-quote" onClick={()=>setQuoteForm(true)}>{userProfile.quote}</p> */}
            <div className="user-info">
                <img className="user-info__image" src={userProfile.avatar} alt="" onClick={()=>setAvatarForm(true)}/>
                <div className="user-info__personal">
                    <div className="user-info__personal-upper">
                    <p className="user-info__username">{userProfile.username}</p>
                    <div className="user-info__emotes">
                        <div className="user-info__emotes-item">
                            <i className="far fa-grin-tongue "></i>
                            <p>{userProfile.likes}</p>
                        </div>
                        <div className="user-info__emotes-item user-info__emotes-item--middle">
                            <i className="fas fa-utensils"></i>
                            <p>{userProfile.dinners}</p>
                        </div>
                        <div className="user-info__emotes-item user-info__emotes-item"  onClick={()=>setShowFriends(!showFriends)}>
                        <i className="fas fa-user-friends"></i>
                            <p>{userProfile.dinners}</p>
                        </div>
                    </div>
                {showFriends && [<Invites  id={id} />,
                    <Friends isItYourProfile={true} /> ]}
                    </div>
                    <p className="user-info__personal-description" onClick={()=>setDescriptionForm(true)}>{userProfile.description}</p>
                </div>
                <AddPhotos id={id}/>
            </div>
            {userImages &&<div className="user-profile__images-box">
                {userImages.map(({id, image})=>(
                    <div className="user-profile__image" key={id}>
                        <img src={image.image} alt="" />
                        <DeletePhoto  imageId={id} imageName={image.name}/>
                        {/* <div className="user-profile__img" style={ { backgroundImage: `url("${image.image}")`}}> </div> */}

                    </div>
                ))}
            </div>}
        
        
        
        
        
        
        
        
        
        
        <Modal
            open={quoteForm}
            onClose={()=> setQuoteForm(false)}
            >
            <form className="new-dinner" onSubmit={(e)=>handleQuote(e)}>
                    <h3>Twój cytat</h3>
                    <input className="user-profile__form-input" type="text" value={quote} onChange={(e)=>setQuote(e.target.value)}/>

                <button className="primary-btn">Wyslij</button>
            </form>
        </Modal>
        <Modal
            open={avatarForm}
            onClose={()=> setAvatarForm(false)}
            >
            <form className="new-dinner">
                <h3>Twóje zdjęcie</h3>
                {/* <input type="text" value={avatar} onChange={(e)=>setAvatar(e.target.value)}/> */}
                <progress className="user-profile__form-progress" value={[progress]} max="100"/>
                <progress className="user-profile__form-progress" value={70} max="100"/>
                <input className="user-profile__form-input" type="file" onChange={handleChange}/>
                
                <button onClick={handleUpload} className="primary-btn">Wyslij</button>
            </form>
        </Modal>
        <Modal
            open={descriptionForm}
            onClose={()=> setDescriptionForm(false)}
            >
            <form className="new-dinner" onSubmit={(e)=>handleDescription(e)}>
                    <h3>Twój opis</h3>
                    <textarea className="user-profile__form-textarea" type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/>

                <button className="primary-btn">Wyslij</button>
            </form>
        </Modal>
        </div>
    );
}
 
export default YourProfile;