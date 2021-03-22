import { Button, Modal } from "@material-ui/core"
import { useEffect, useState } from "react"
import {db, auth} from './firebase'
const MakeDinner = () => {
    const currentTime = new Date();
    const [type, setType] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [openForm, setOpenForm] = useState(false)
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user.displayName)
            } else {
                setCurrentUser(null)
            }
          });
          db.collection('users').doc(auth.X).onSnapshot((doc)=>{
            setAvatar(doc.data().avatar)
        })
          
    },[])



    const handleSubmit = (e)=>{
        e.preventDefault()
        const dinner = {type, city, name, address, date, time};
        console.log(dinner)
        
        if(city.length < 36 && name.length < 36 && address.length <36  ){db.collection('diners').add({
            city: city,
            address: address,
            name: name,
            date: date,
            time: time,
            
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            db.collection('diners').doc(docRef.id).collection("dinnerMaker").add({
                avatar: avatar,
                username: currentUser
            })

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setOpenForm(false)}else{
            alert('maksymalna ilość znaków to 35')
        }
    }
    return ( 
        <div className="make-dinner">

            <Modal
            open={openForm}
            onClose={()=> setOpenForm(false)}
            >

            <form className="new-dinner" onSubmit={(e)=>handleSubmit(e)}>
            <h3>Stwórz ucztę</h3>
                <div className="new-dinner__input new-dinner__input--date" >
                <label htmlFor="date">Data uczty</label>
                <input id="date" type="date" 
                required
                placeholder="data"
                value={date} 
                onChange={(e)=> setDate(e.target.value)}
                
                />

                </div>
                <div className="new-dinner__input new-dinner__input--time">
                <label htmlFor="time">Godzina uczty</label>
                <input id="time" type="time"
                required
                placeholder="godzina"
                onChange={(e)=> setTime(e.target.value)}
                />
                </div>

                <input className="new-dinner__input new-dinner__input--city"
                type="text" placeholder="Miasto" 
                required
                value={city} 
                maxLength="35"
                onChange={(e)=> setCity(e.target.value)}/>

                <input className="new-dinner__input new-dinner__input--name"
                required
                type="text"
                placeholder="Nazwa miejsca"
                maxLength="35"
                onChange={(e)=> setName(e.target.value)}/>

                <input className="new-dinner__input new-dinner__input--address"
                required
                type="text" 
                placeholder="Adres uczty"
                maxLength="35"
                onChange={(e)=> setAddress(e.target.value)}/>

                <button className="primary-btn">Wyslij</button>
            </form>
            </Modal>
            <button className="primary-btn new-dinner__addButton" onClick={()=> setOpenForm(true)}>Dodaj ucztę</button>
        </div>
    );
}
 
export default MakeDinner;