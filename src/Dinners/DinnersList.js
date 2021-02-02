import { Link } from "react-router-dom";
import Join from "../Components/Join";
import useFetch from "../Components/useFetch";
import MakeDinner from "../MakeDinner";

const DinnersList = () => {
    const {data : dinners, isPending, error} = useFetch('http://localhost:8000/dinners/')
    return ( 
        (dinners &&<div className="dinner-list">
            <h3 className="dinner-list__header">Lista uczt:</h3>
            {
                dinners.map(dinner => (
                    <Link to={`/dinners/${dinner.id}`}>
                    <div className="dinner-list__box" key={dinner.id}>
                        <div className="dinner-list__up">
                            <div className="dinner-list__left">
                                <h4 className="dinner-list__city">{dinner.city}</h4>
                                <p className="dinner-list__date">{dinner.date} {dinner.time}</p>
                            </div>
                            {dinner['invited-users'] && <div className="dinner-list__avatars">
                                {dinner['invited-users'].map(user =>(
                                    <img className="avatar" src={user.avatar} alt="" key={user.id}></img>
                                ))}
                            </div>}
                        </div>

                        
                        <div className="dinner-list__down">
                        <div className="dinner-list__left">
                            <p className="dinner-list__place">{dinner.name}</p>
                            <p className="dinner-list__address">{dinner.address}</p>
                        </div>
                            <Join></Join>
                        </div>

                    </div>
                    </Link>
                ))
            }
            {/* <MakeDinner></MakeDinner> */}
        </div>)
    );
}

export default DinnersList;