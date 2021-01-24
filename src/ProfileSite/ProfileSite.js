
import { useParams } from "react-router-dom";
import useFetch from "../Components/useFetch";

const ProfileSite = () => {
    const {id} = useParams()
    const {data : user, isPending, error} = useFetch('http://localhost:8000/users/' + id)
    
    return ( 
        (user && <div className="user-profile">
            <h3>{user.qute}</h3>
            <div className="user-info">
                <img src="https://warsztatauto.files.wordpress.com/2015/06/avatar.gif" alt=""/>
                <div className="user-info__personal">
                    <p>{user.name}</p>
                    <div className="user-info__emotes">
                        <div className="info__emotes-item">
                            <i className="far fa-grin-tongue"></i>
                            {user.likes}
                        </div>
                        <div className="info__emotes-item">
                            <i className="fas fa-utensils"></i>
                            {user.dinners}
                        </div>
                    </div>

                </div>
                            <i className="fas fa-utensils"></i>
            </div>
            <div className="images-box">
                {user.images.map((image)=>(
                    <img src={image.source} alt=""  key={image.id}/>
                ))}
            </div>
        </div>)
     );
    }
 
export default ProfileSite;