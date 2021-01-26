import useFetch from "../Components/useFetch";

const DinnersList = () => {
    const {data : dinners, isPending, error} = useFetch('http://localhost:8000/dinners/')
    return ( 
        (dinners &&<div className="dinner-list">
            <h3 className="dinner-list__header">Lista uczt:</h3>
            {
                dinners.map(dinner => (
                    <div className="dinner-list__box" key={dinner.id}>
                        <div className="dinner-list__left">
                            <h4 className="dinner-list__city">{dinner.city}</h4>
                            <p className="dinner-list__address">{dinner['dinner-name']} - {dinner.address}</p>
                            <p className="dinner-list__date">{dinner.date} {dinner.time}</p>
                        </div>
                        <div className="dinner-list__right">
                            <div className="dinner-list__avatars">
                                {dinner['invited-users'].map(user =>(
                                    <img src={user.avatar} alt="" key={user.id}></img>
                                ))}
                            </div>
                            <div className="dinner-list__btns">
                                <button className="dinner-list__btn orangeBtn">więcej</button>
                                <button className="dinner-list__btn orangeBtn">zaloguj</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>)
     );
}
 
export default DinnersList;