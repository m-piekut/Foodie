import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Join from "../Components/Join";
import useFetch from "../Components/useFetch";
import MakeDinner from "../MakeDinner";
import {db, auth} from '../firebase'
import Dinner from "./Dinner";
const DinnersList = () => {

    const [dinners, setDinners] = useState([])
    const [avatars, setAvatars] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
   const test =  db.collection('diners').onSnapshot(snapshot=>{
       setDinners(snapshot.docs.map(doc => ({
        id : doc.id,
        dinner: doc.data()

        })))
   });
   auth.onAuthStateChanged(user => {
    if (user) {
      setCurrentUser(user.displayName)
    } else {
      setCurrentUser(null)
    }
  });
}, []);

    return ( 
        (dinners &&<div className="dinner-list">
            <h3 className="dinner-list__header">Lista uczt:</h3>
            {
                dinners.map(({id, dinner}) => (
                   
                    <Dinner city={dinner.city} date={dinner.date} time={dinner.time} address={dinner.address} name={dinner.name} key={id} dinnerId = {id}></Dinner>
                    

                    

        ))
            }
            {currentUser ? <MakeDinner/>: false}
            
        </div>)
    );
}

export default DinnersList;