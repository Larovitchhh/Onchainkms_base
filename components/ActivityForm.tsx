"use client"

import { useState } from "react"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"
import { calculateXP } from "../lib/xpCalculator"

export default function ActivityForm(){

 const [type,setType] = useState("run")
 const [distance,setDistance] = useState(0)
 const [duration,setDuration] = useState(0)
 const [elevation,setElevation] = useState(0)

 const xp = calculateXP(
  type as any,
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

 const sports = [
  {id:"run",label:"Run",icon:"🏃"},
  {id:"swim",label:"Swim",icon:"🏊"},
  {id:"mtb",label:"MTB",icon:"🚵"},
  {id:"road",label:"Road",icon:"🚴"}
 ]

 return(

 <div style={{
  height:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  background:"#050505",
  color:"white",
  fontFamily:"system-ui"
 }}>

 <div style={{
  width:900,
  display:"flex",
  gap:60,
  alignItems:"flex-start"
 }}>

 {/* LEFT SIDE */}

 <div style={{flex:1}}>

 {/* SPORT BUTTONS */}

 <div style={{
  display:"grid",
  gridTemplateColumns:"1fr 1fr",
  gap:12,
  marginBottom:20
 }}>

 {sports.map(s => (

  <button
   key={s.id}
   onClick={()=>setType(s.id)}
   style={{
    padding:12,
    borderRadius:10,
    border:type===s.id?"1px solid #3b82f6":"1px solid #1f2937",
    background:type===s.id?"#0b1220":"#0b0b0b",
    color:"white",
    display:"flex",
    alignItems:"center",
    gap:8,
    justifyContent:"center",
    cursor:"pointer"
   }}
  >

   <span style={{fontSize:18}}>{s.icon}</span>
   {s.label}

  </button>

 ))}

 </div>


 <input
  placeholder="Distance (km)"
  type="number"
  onChange={(e)=>setDistance(Number(e.target.value))}
  style={{
   width:"100%",
   padding:12,
   marginBottom:12,
   borderRadius:10,
   border:"1px solid #1f2937",
   background:"#0b0b0b",
   color:"white"
  }}
 />

 <input
  placeholder="Duration (minutes)"
  type="number"
  onChange={(e)=>setDuration(Number(e.target.value))}
  style={{
   width:"100%",
   padding:12,
   marginBottom:12,
   borderRadius:10,
   border:"1px solid #1f2937",
   background:"#0b0b0b",
   color:"white"
  }}
 />

 <input
  placeholder="Elevation (meters)"
  type="number"
  onChange={(e)=>setElevation(Number(e.target.value))}
  style={{
   width:"100%",
   padding:12,
   borderRadius:10,
   border:"1px solid #1f2937",
   background:"#0b0b0b",
   color:"white"
  }}
 />

 </div>


 {/* RIGHT SIDE */}

 <div style={{
  width:260,
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:20
 }}>

 <div style={{
  fontSize:64,
  fontWeight:900
 }}>
  {xp}
 </div>

 <div style={{
  marginTop:-15,
  color:"#3b82f6",
  fontWeight:700
 }}>
  XP
 </div>

 <div style={{width:"100%"}}>
  <MintButton activity={activity} xp={xp} />
 </div>

 <div style={{width:"100%"}}>
  <MintStacksButton activity={activity} xp={xp} />
 </div>

 </div>

 </div>

 </div>

 )
}
