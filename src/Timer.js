import { useEffect, useState } from "react";


const Timer = ({date, time}) => {

   const [test1, setTest1] = useState(0);
   const [test2, setTest2] = useState(0);

   setInterval(() => {
      setTest1(new Date().getTime())
   }, 1000);

   const dinnerTime = new Date(`${date}T${time}`).getTime()
   // let timer;
   // let now = new Date().getTime()
   // timer = dinnerTime - now;
   useEffect(()=>{
      setTest2(dinnerTime - test1)
   },[test1])

    return ( 
      <div className="timer-box">
         <p>Uczta za:</p>
         <p>godziny:minuty:sekundy</p>
         <p>{(Math.floor(test2/3600000))} { Math.floor(((test2 % 3600000) / 60000))} { (((test2 % 3600000) % 60000)/ 1000).toFixed(0)} sds</p>
      </div>
     );
}
 
export default Timer;