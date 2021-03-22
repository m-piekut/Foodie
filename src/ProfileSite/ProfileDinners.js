import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const ProfileDinners = () => {

    const {id} = useParams();
    const [dinners, setDinners] = useState(null)
    

    useEffect(()=>{
        db.collection('users').doc(id).collection('dinners').onSnapshot(snapshot =>{
            setDinners(snapshot.docs.map(doc =>({
                id: doc.id,
                dinner: doc.data()
            })))      
        })
       return(()=>{
           
       })
    },[id])




    return ( 
        <div className="profileDinners">
        <h3 className="profileDinners__title">Twoje Uczty</h3>
        {dinners && <div className="profileDinners__wrapper">
            {dinners && dinners.map(({id, dinner})=>(
                <Link key={id} to={`/dinners/${id}`}><div  className="profileDinners__listItem">
                    <div className="profileDinners__upper">
                        <p className="dinnerProfile__date">{dinner.date}</p>
                        <p className="dinnerProfile__time">{dinner.time}</p>
                    </div>
                    <div className="profileDinners__down">
                        <p className="dinnerProfile__date">{dinner.city}</p>
                        <p className="dinnerProfile__time">{dinner.name}</p>
                    </div>
                    
                </div></Link>
            ))}
        </div>}
    </div>
     );
}
 
export default ProfileDinners;