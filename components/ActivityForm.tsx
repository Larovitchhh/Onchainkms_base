"use client"

import { useState } from "react"
import MintButton from "./MintButton"

export default function ActivityForm(){

 const [distance,setDistance] = useState(0)
 const [duration,setDuration] = useState(0)
 const [elevation,setElevation] = useState(0)

 const xp = distance * 10

 const activity = {
  distance,
  duration,
  elevation
 }

 return(

  <div style={{marginTop:30}}>

   <input
    placeholder="Distance (km)"
    type="number"
    onChange={(e)=>setDistance(Number(e.target.value))}
   />

   <br/>

   <input
    placeholder="Duration (min)"
    type="number"
    onChange={(e)=>setDuration(Number(e.target.value))}
   />

   <br/>

   <input
    placeholder="Elevation (m)"
    type="number"
    onChange={(e)=>setElevation(Number(e.target.value))}
   />

   <br/><br/>

   <MintButton
    activity={activity}
    xp={xp}
   />

  </div>

 )

}
