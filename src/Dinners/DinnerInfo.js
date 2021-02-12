import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {auth, db} from '../firebase'

const DinnerInfo = () => {

    const {id} = useParams();
    const [dinner, setDinner]  = useState([])
    const [invited, setInvited]  = useState([])
    const [dinnerMaker, setDinnerMaker]  = useState([])
    const [currentUser, setCurrentUser] =useState(null);

    const addInvited = ()=>{
        const test = db.collection('diners').doc(id).collection("invited").add({
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            username: currentUser
        })
    }

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
        if (user) {
            setCurrentUser(user.displayName)
            } else {
        setCurrentUser(null)
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
    console.log(invited)
docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        setDinner(doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}).catch((error) => {
    console.log("Error getting document:", error);
});
    
},[])



    return ( 
    (dinner && <div className="dinner-info">
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
                    <p className="dinner-info__user-name">{invitedUser.username}</p>
                </div>
            ))}
        </div>}
        {
            !currentUser ? <p>Aby dołączyć do uczty musisz się zalogować</p> :
        <button onClick={()=> addInvited()}>Dołącz</button>
        }
    </div>) );
}
 
export default DinnerInfo;