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

 const cardStyle = {
  maxWidth:420,
  margin:"40px auto",
  padding:30,
  borderRadius:20,
  background:"#0f1117",
  border:"1px solid #1f2937",
  boxShadow:"0 10px 40px rgba(0,0,0,0.6)",
  fontFamily:"system-ui",
  color:"white"
 }

 const inputStyle = {
  width:"100%",
  padding:"14px",
  marginTop:"8px",
  marginBottom:"16px",
  borderRadius:"10px",
  border:"1px solid #2d3748",
  background:"#050505",
  color:"white",
  fontSize:"16px"
 }

 const labelStyle = {
  fontSize:"12px",
  color:"#94a3b8",
  letterSpacing:"1px",
  textTransform:"uppercase"
 }

 return(

  <div style={cardStyle}>

   <h2 style={{
    fontSize:28,
    fontWeight:800,
    marginBottom:4,
    textAlign:"center"
   }}>
    ONCHAIN<span style={{color:"#3b82f6"}}>KMS</span>
   </h2>

   <p style={{
    textAlign:"center",
    fontSize:10,
    letterSpacing:3,
    color:"#6b7280",
    marginBottom:30
   }}>
    PROOF OF PHYSICAL WORK
   </p>


   <div style={labelStyle}>Sport</div>

   <select
    value={type}
    onChange={(e)=>setType(e.target.value)}
    style={inputStyle}
   >

    <option value="swim">Swimming</option>
    <option value="run">Running</option>
    <option value="mtb">MTB</option>
    <option value="road">Road Bike</option>

   </select>


   <div style={labelStyle}>Distance (km)</div>

   <input
    type="number"
    placeholder="0"
    onChange={(e)=>setDistance(Number(e.target.value))}
    style={inputStyle}
   />


   <div style={labelStyle}>Duration (minutes)</div>

   <input
    type="number"
    placeholder="0"
    onChange={(e)=>setDuration(Number(e.target.value))}
    style={inputStyle}
   />


   <div style={labelStyle}>Elevation (meters)</div>

   <input
    type="number"
    placeholder="0"
    onChange={(e)=>setElevation(Number(e.target.value))}
    style={inputStyle}
   />


   <div style={{
    marginTop:20,
    marginBottom:30,
    textAlign:"center",
    padding:20,
    borderRadius:12,
    background:"#020617",
    border:"1px solid #1f2937"
   }}>

    <div style={{
     fontSize:12,
     letterSpacing:3,
     color:"#60a5fa",
     marginBottom:6
    }}>
     ESTIMATED YIELD
    </div>

    <div style={{
     fontSize:42,
     fontWeight:900
    }}>
     {xp} <span style={{color:"#3b82f6",fontSize:18}}>XP</span>
    </div>

   </div>


   <MintButton activity={activity} xp={xp} />

   <div style={{height:10}}/>

   <MintStacksButton activity={activity} xp={xp} />


  </div>

 )
}
