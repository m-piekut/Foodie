import useFetch from "../Components/useFetch";
import {Link, Router} from 'react-router-dom'
const ProfileList = () => {
    const {data : users, isPending, error} = useFetch('http://localhost:8000/users')



    return ( 
        (users && <div className="test">
            {users.map((user)=>(
                <div className="user-preview" key={user.id} >
                    <Link to={`/users/${user.id}`}>
                    <h2>{user.name}</h2>
                    </Link>
                </div>
            ))}
        </div>)
     );
}
export default ProfileList;