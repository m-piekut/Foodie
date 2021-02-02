import { useParams } from "react-router-dom";
import useFetch from "../Components/useFetch";

const DinnerInfo = () => {

    const {id} = useParams();
    const {data : dinner, isPending, error} = useFetch('http://localhost:8000/dinners/'+ id)


    return ( 
    (dinner && <div className="dinner-info">
        <div className="dinner-info__mainInfo">
            <h2 className="dinner-info__city">{dinner.city}</h2>
            <p className="dinner-info__date">{dinner.date} {dinner.time}</p>
            <p className="dinner-info__name">{dinner.name}</p>
            <p className="dinner-info__address">{dinner.address}</p>
            <p className="dinner-info__about">{dinner.about}</p>
        </div>

        <h4 className="dinner-info__header">Uczestnicy:</h4>
        {dinner['invited-users'] && <div className="dinner-info__box">
            {dinner['invited-users'].map(user =>(
                <div className="dinner-info__user-box" key={user.id}>
                    <img src={user.avatar} alt="" className="dinner-info__avatar avatar"/>
                    <p className="dinner-info__user-name">{user['user-name']}</p>
                </div>
            ))}
        </div>}
    </div>) );
}
 
export default DinnerInfo;