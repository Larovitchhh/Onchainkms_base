"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

export default function ActivityForm(){

 const [type,setType] = useState("run")
 const [distance,setDistance] = useState<number | "">("")
 const [duration,setDuration] = useState<number | "">("")
 const [elevation,setElevation] = useState<number | "">("")

 const xp = calculateXP(
  type as any,
  Number(distance) || 0,
  Number(duration) || 0,
  Number(elevation) || 0
 )

 const activity = {
  type,
  distance: Number(distance) || 0,
  duration: Number(duration) || 0,
  elevation: Number(elevation) || 0
 }

 return(

  <div style={{marginTop:30}}>

   <select
    value={type}
    onChange={(e)=>setType(e.target.value)}
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
    onChange={(e)=>{
     const v = e.target.value
     setDistance(v === "" ? "" : Number(v))
    }}
   />

   <br/>

   <input
    placeholder="Duration (minutes)"
    type="number"
    value={duration}
    onChange={(e)=>{
     const v = e.target.value
     setDuration(v === "" ? "" : Number(v))
    }}
   />

   <br/>

   <input
    placeholder="Elevation (meters)"
    type="number"
    value={elevation}
    onChange={(e)=>{
     const v = e.target.value
     setElevation(v === "" ? "" : Number(v))
    }}
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
