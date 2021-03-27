import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from "./firebase";



const Timer = ({date, time, id}) => {
   const history = useHistory()
   const [currentTime, setCurrentTime] = useState(0);
   const [test2, setTest2] = useState(0);

   setInterval(() => {
      setCurrentTime(new Date().getTime())
   }, 1000);

   let dinnerTime = new Date(`${date}T${time}`).getTime()
   useEffect(()=>{
      setTest2(dinnerTime - currentTime)
      return () => {
         setTest2('')
       }
   },[currentTime, dinnerTime])
   

   useEffect(()=>{
      if(test2 < 0){
         db.collection('diners').doc(id).delete().then(()=>{
            history.push('/dinners')
         })
      }
   },[test2, id, history])


    return ( 
      <div className="timer-box">
         <p className="timer-box__header">Uczta za:</p>
         <p className="timer-box__info">{(Math.floor(test2/3600000))} godziny { Math.floor(((test2 % 3600000) / 60000))} minuty { (((test2 % 3600000) % 60000)/ 1000).toFixed(0)} sekundy</p>
      </div>
     );
}
 
export default Timer;