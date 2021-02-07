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

    const [openForm, setOpenForm] = useState(false)
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
              setCurrentUser(user.displayName)
            } else {
              setCurrentUser(null)
            }
          });
          
    },[])



    const handleSubmit = (e)=>{
        e.preventDefault()
        const dinner = {type, city, name, address, date, time};
        console.log(dinner)
        
        db.collection('diners').add({
            city: city,
            address: address,
            name: name,
            date: date,
            time: time,
            
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            db.collection('diners').doc(docRef.id).collection("dinnerMaker").add({
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                username: currentUser
            })

        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setOpenForm(false)
    }
    return ( 
        <div className="make-dinner">

            <Modal
            open={openForm}
            onClose={()=> setOpenForm(false)}
            >

            <form className="new-dinner" onSubmit={(e)=>handleSubmit(e)}>
            <h3>Stwórz ucztę</h3>
                {/* <div className="new-dinner__location-box">
                <input type="radio" name="location" id="yours" value="yours"  onClick={()=> setType("yours")}/>
                <label htmlFor="yours">Twoje miejsce</label>
                <input type="radio" name="location" id="local" value="local"  onClick={()=> setType("local")} />
                <label htmlFor="local">Lokal</label>
                </div> */}
                <input className="new-dinner__input new-dinner__input--city"
                type="text" placeholder="Miasto" 
                required
                value={city} 
                onChange={(e)=> setCity(e.target.value)}/>

                <input className="new-dinner__input new-dinner__input--name"
                required
                type="text"
                placeholder="Nazwa miejsca"
                onChange={(e)=> setName(e.target.value)}/>

                <input className="new-dinner__input new-dinner__input--address"
                required
                type="text" 
                placeholder="Adres uczty"
                onChange={(e)=> setAddress(e.target.value)}/>
                <div className="new-dinner__input new-dinner__input--date" >
                <label htmlFor="date">Data uczty</label>
                <input id="date" type="date" 
                required
                laceholder="data"
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

                <button className="primary-btn">Wyslij</button>
            </form>
            </Modal>
            <Button onClick={()=> setOpenForm(true)}>Dodaj ucztę</Button>
        </div>
    );
}
 
export default MakeDinner;