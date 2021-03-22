


import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import {auth, db} from '../firebase'
import Loader from "../Loader";
import Site404 from "../Site404";
import StandardProfile from "./StandardProfile";
import YourProfile from "./YourProfile";
const ProfileSite = () => {
    const {id} = useParams()
    const [userProfile, setUserProfile] = useState('')
    const [isItYourProfile, setIsItYourProfile] = useState();
    const [userImages, setUserImages] = useState(null)
    const [loading, setLoading] = useState(true)
    

   
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if( id === auth.X){
                    setIsItYourProfile(true)
                }else{
                    setIsItYourProfile(false)
                    console.log('czekaj')
                }
                } 
            });
      db.collection("users").doc(id)
    .onSnapshot((doc) => {
      setUserProfile(doc.data())
      setLoading(false)
    });
    db.collection('users').doc(id).collection('images').onSnapshot(snapshot=>{
        setUserImages(snapshot.docs.map(doc => ({
         id : doc.id,
         image: doc.data()
         })))
        });
        return()=>{
            setIsItYourProfile(null)
            setUserProfile(null)
        }

     },[id] );
    
    


    return ( 
        

            (!loading ?
                (userProfile ?  (
                isItYourProfile ?  <YourProfile userProfile={userProfile}  userImages={userImages}/> : <StandardProfile userProfile={userProfile} userImages={userImages} userId={id}/>
            ): <Site404/>
                
            ): <Loader/>
            )
       
    )
        }
export default withRouter(ProfileSite);