
import { useParams } from "react-router-dom";
import useFetch from "../Components/useFetch";

const ProfileSite = () => {
    const {id} = useParams()
    const {data : user, isPending, error} = useFetch('http://localhost:8000/users/' + id)
    
    return ( 
        (user && <div className="user-profile">
            <p className="user-profile-quote">{user.quote}</p>
            <div className="user-info">
                <img className="user-info__image" src="https://warsztatauto.files.wordpress.com/2015/06/avatar.gif" alt=""/>
                <div className="user-info__personal">
                    <div className="user-info__personal-upper">
                    <p>{user.name}</p>
                    <div className="user-info__emotes">
                        <div className="user-info__emotes-item">
                            <i className="far fa-grin-tongue "></i>
                            <p>{user.likes}</p>
                        </div>
                        <div className="user-info__emotes-item">
                            <i className="fas fa-utensils"></i>
                            <p>{user.dinners}</p>
                        </div>
                    </div>
                    </div>
                    <p className="user-info__personal-description">{user.description}</p>
                </div>
                            <i className="fas fa-utensils"></i>
            </div>
            <div className="user-profile__images-box">
                {user.images.map((image)=>(
                    <img src={image.source} alt=""  key={image.id}/>
                ))}
            </div>
        </div>)
     );
    }
 
export default ProfileSite;