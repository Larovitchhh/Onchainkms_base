"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

type ActivityType = "swim" | "run" | "mtb" | "road"

export default function ActivityForm(){

 const [type,setType] = useState<ActivityType>("run")
 const [distance,setDistance] = useState(0)
 const [duration,setDuration] = useState(0)
 const [elevation,setElevation] = useState(0)

 const xp = calculateXP(
  type,
  distance,
  duration,
  elevation
 )

 const activity = {
  type,
  distance,
  duration,
  elevation
 }

 return(

  <div style={{marginTop:30}}>

   <select
    value={type}
    onChange={(e)=>setType(e.target.value as ActivityType)}
   >

    <option value="swim">Swimming</option>
    <option value="run">Running</option>
    <option value="mtb">MTB</option>
    <option value="road">Road Bike</option>

   </select>

   <br/><br/>

   <input
    placeholder="Distance (km)"
    type="number"
    value={distance}
    onChange={(e)=>setDistance(Number(e.target.value))}
   />

   <br/>

   <input
    placeholder="Duration (minutes)"
    type="number"
    value={duration}
    onChange={(e)=>setDuration(Number(e.target.value))}
   />

   <br/>

   <input
    placeholder="Elevation (meters)"
    type="number"
    value={elevation}
    onChange={(e)=>setElevation(Number(e.target.value))}
   />

   <br/><br/>

   <div>
    XP Earned: <b>{xp}</b>
   </div>

   <br/>

   <MintButton activity={activity} xp={xp} />

   <MintStacksButton activity={activity} xp={xp} />

  </div>

 )
}
