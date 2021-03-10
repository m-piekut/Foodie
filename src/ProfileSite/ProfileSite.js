

import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import {auth, db} from '../firebase'
import StandardProfile from "./StandardProfile";
import YourProfile from "./YourProfile";
const ProfileSite = () => {
    const {id} = useParams()
    const [userProfile, setUserProfile] = useState([])
    const [isItYourProfile, setIsItYourProfile] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userImages, setUserImages] = useState(null)
    const [loading, setLoading] = useState(true)
    

   
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUser(user.displayName)
                if( id === auth.X){
                    setIsItYourProfile(true)
                    console.log(isItYourProfile)
                }else{
                    setIsItYourProfile(false)
                    console.log('czekaj')
                }
                } else {
            setCurrentUser(null)

                }
            });
      db.collection("users").doc(id)
    .onSnapshot((doc) => {
      setUserProfile(doc.data())
    });
    db.collection('users').doc(id).collection('images').onSnapshot(snapshot=>{
        setUserImages(snapshot.docs.map(doc => ({
         id : doc.id,
         image: doc.data()
 
         })))
        });
        setLoading(false)
        return()=>{
            
        }

     },[id] );
    
    


    return ( 
        

            (userProfile &&  (
                isItYourProfile ?  <YourProfile userProfile={userProfile}  userImages={userImages}/> : <StandardProfile userProfile={userProfile} userImages={userImages} userId={id}/>
            )
                
            )
       
    )
        }
export default withRouter(ProfileSite);