"use client"

import { useState } from "react"
import { calculateXP } from "../lib/xpCalculator"
import MintButton from "./MintButton"

export default function ActivityForm(){

 const [activity,setActivity] = useState({
  sport:"running",
  distance:0,
  elevation:0,
  duration:0
 })

 const xp = calculateXP(activity.sport, activity.distance)

 return(

  <div style={{marginTop:"30px"}}>

   <h3>Register activity</h3>

   <select
    onChange={(e)=>setActivity({...activity,sport:e.target.value})}
   >
    <option value="swimming">Natación</option>
    <option value="running">Running</option>
    <option value="mtb">MTB</option>
    <option value="road">Bici carretera</option>
   </select>

   <br/><br/>

   <input
    type="number"
    placeholder="Distancia km"
    onChange={(e)=>setActivity({...activity,distance:Number(e.target.value)})}
   />

   <br/><br/>

   <input
    type="number"
    placeholder="Desnivel metros"
    onChange={(e)=>setActivity({...activity,elevation:Number(e.target.value)})}
   />

   <br/><br/>

   <input
    type="number"
    placeholder="Duración minutos"
    onChange={(e)=>setActivity({...activity,duration:Number(e.target.value)})}
   />

   <br/><br/>

   <b>XP: {xp}</b>

   <br/><br/>

   <MintButton
    activity={activity}
    xp={xp}
   />

  </div>

 )

}
