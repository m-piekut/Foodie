import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {db} from '../firebase'
const Dinner = ({searchValue, name, address, date,time, city, dinnerId}) => {

    const [dinnerMaker, setDinnerMaker] = useState([])
    const [invited, setInvited]  = useState([])
    let dinnerTime = new Date(`${date}T${time}`).getTime()
    let currentTime = new Date().getTime()
    useEffect(()=>{
        if(dinnerTime < currentTime){
            db.collection('diners').doc(dinnerId).delete()
        }

    },[dinnerId, dinnerTime, currentTime])



    useEffect(()=>{
        var docRef = db.collection("diners").doc(dinnerId).collection("invited");
        var docRefToDinnerMaker = db.collection('diners').doc(dinnerId).collection("dinnerMaker")
        docRefToDinnerMaker.onSnapshot(snapshot =>{
            setDinnerMaker(snapshot.docs.map(doc=> ({
                avatars: doc.data(),
                id: doc.id})))
        })
        docRef.onSnapshot(snapshot =>{
            setInvited(snapshot.docs.map(doc=> ({
               avatars: doc.data(),
                id: doc.id})))
        })
        return()=>{
            setDinnerMaker(null)
            setInvited(null)
        }
    },[dinnerId])

    



    return (
        (city.toLowerCase().search(searchValue.toLowerCase()) !==-1 )?
         <Link to={`/dinners/${dinnerId}`}>
          <div className="dinner-list__box" key={dinnerId}>
                        <div className="dinner-list__up">
                            <div className="dinner-list__left">
                                <h4 className="dinner-list__city">{city}</h4>
                                <p className="dinner-list__date">{date} {time}</p>
                            </div>
                            {invited && <div className="dinner-list__avatars">
                               
                                {
                                    dinnerMaker.map(({avatars, id})=>(
                                        <img key={id} className="avatar" src={avatars.avatar} alt="dinner-maker-avatar"/>
                                    ))
                                }
                                {
                                    invited.map(({avatars, id})=>(
                                        <img key={id} className="avatar" src={avatars.avatar} alt="dinner-guest-avatar"/>
                                    ))
                                }
                            </div>}
                        </div>

                        
                        <div className="dinner-list__down">
                        <div className="dinner-list__left">
                            <p className="dinner-list__place">{name}</p>
                            <p className="dinner-list__address">{address}</p>
                        </div>
                        </div>

                    </div>
        </Link>: false
      );
}
 
export default Dinner;