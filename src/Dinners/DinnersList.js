import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Join from "../Components/Join";
import useFetch from "../Components/useFetch";
import MakeDinner from "../MakeDinner";
import {db, auth} from '../firebase'
import Dinner from "./Dinner";


const DinnersList = () => {
  const searchIcon = document.querySelector('.dinner-list__search-icon')
  const searchBar = document.querySelector('.dinner-list__search-bar')
  const search = document.querySelector('.dinner-list__search')
  const showBar = ()=>{
      searchIcon.classList.toggle('rotate')
      searchIcon.classList.toggle('rotateBack')
      searchBar.classList.toggle('show-search-bar')
      search.classList.toggle('show-search')
      setSearchValue('')
  }

    const [dinners, setDinners] = useState([])
    const [avatars, setAvatars] = useState([])
    const [currentUser, setCurrentUser] = useState(null);
    const [searchValue, setSearchValue] = useState('')


useEffect(() => {
   db.collection('diners').onSnapshot(snapshot=>{
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
            <div type="text" className="dinner-list__search">
              <input className="dinner-list__search-bar" id="testing" placeholder="Miasto"  type="text" value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
             <button  className="dinner-list__search-icon rotateBack" onClick={()=>showBar()}><label for="testing"><i className="fas fa-search"></i></label></button>
            </div>
            {currentUser ? <MakeDinner/>: <p>Aby utworzyć ucztę musisz się zalogować</p>}
            {
                dinners.map(({id, dinner}) => (
                    <Dinner searchValue = {searchValue} city={dinner.city} date={dinner.date} time={dinner.time} address={dinner.address} name={dinner.name} key={id} dinnerId = {id}></Dinner>
                    ))
                  }
                  
                
        </div>)
    );
}

export default DinnersList;