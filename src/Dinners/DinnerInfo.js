import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {auth, db} from '../firebase'
import LeaveDinner from "../LeveDinner";
import Timer from "../Timer";

const DinnerInfo = () => {

    const {id} = useParams();
    const [dinner, setDinner]  = useState([])
    const [invited, setInvited]  = useState([])
    const [dinnerMaker, setDinnerMaker]  = useState([])
    const [currentUser, setCurrentUser] =useState(null);
    const [currentUserId, setCurrentUserId] =useState(null);
    const [alreadyJoined, setAlreadyJoined] = useState(false)
    const [avatar, setAvatar] = useState(false)

    const addInvited = ()=>{
            db.collection('diners').doc(id).collection("invited").add({
            avatar: avatar,
            username: currentUser,
            id: currentUserId
            
        })
        
    }

    


    useEffect(()=>{
        auth.onAuthStateChanged(user => {
        if (user) {
            setCurrentUser(user.displayName)
            setCurrentUserId(user.X.X)
            db.collection('users').doc(user.X.X).onSnapshot((doc)=>{
                setAvatar(doc.data().avatar)
            })
            
            } else {
        setCurrentUser(null)
        setCurrentUserId(null)
            }
        });
    var docRef = db.collection("diners").doc(id);
    var docRefToDinnerMaker = db.collection('diners').doc(id).collection("dinnerMaker")
        docRefToDinnerMaker.onSnapshot(snapshot =>{
            setDinnerMaker(snapshot.docs.map(doc=> ({
                maker: doc.data(),
                id: doc.id})))
        })
    docRef.collection("invited").onSnapshot(snapshot =>{
        setInvited(snapshot.docs.map(doc =>({ 
            id: doc.id,
            invitedUser: doc.data()})))
    })
    // console.log(invited)
docRef.get().then((doc) => {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        setDinner(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}).catch((error) => {
    console.log("Error getting document:", error);
});
    
},[])
useEffect(()=>{
    invited.map((item)=>{
        if(item.invitedUser.username === currentUser){
            setAlreadyJoined(true)
        }
        
    })
},[invited])


    return ( 
    (dinner && <div className="dinner-info">
        <Timer date={dinner.date} time={dinner.time}/>
        <div className="dinner-info__mainInfo">
            <h2 className="dinner-info__city">{dinner.city}</h2>
            <p className="dinner-info__date">{dinner.date} {dinner.time}</p>
            <p className="dinner-info__name">{dinner.name}</p>
            <p className="dinner-info__address">{dinner.address}</p>
            <p className="dinner-info__about">{dinner.about}</p>
        </div>

        <h4 className="dinner-info__header">Uczestnicy:</h4>
        {invited && <div className="dinner-info__box">
            
            {dinnerMaker.map(({maker, id}) =>(
                <div className="dinner-info__user-box" key={id}>
                    <img src={maker.avatar} alt="" className="dinner-info__avatar avatar"/>
                    <p className="dinner-info__user-name">{maker.username}</p>
                    
                </div>
            ))}
            {invited.map(({id, invitedUser}) =>(
                <div className="dinner-info__user-box" key={id}>
                    <img src={invitedUser.avatar} alt="" className="dinner-info__avatar avatar"/>
                   
                        <p className="dinner-info__user-name"> <Link to={`/users/${invitedUser.id}`}>{invitedUser.username} </Link></p>
                       
                    {(currentUser === invitedUser.username ? <LeaveDinner  id={id}  /> : false)}
                </div>
            ))}
        </div>}
        {
            !currentUser ? <p>Aby dołączyć do uczty musisz się zalogować</p> :
                (alreadyJoined ? <p>Już dołączyłeś do tej uczty</p> :
                <button className="primary-btn" onClick={()=> addInvited()}>Dołącz</button>)

        
        }
    </div>) );
}

export default DinnerInfo;