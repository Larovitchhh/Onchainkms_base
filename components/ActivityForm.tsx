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

 const container={
  height:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  background:"#050505",
  color:"white",
  fontFamily:"system-ui"
 }

 const card={
  width:1000,
  padding:40,
  borderRadius:20,
  background:"#0f1117",
  border:"1px solid #1f2937",
  boxShadow:"0 20px 60px rgba(0,0,0,0.6)"
 }

 const layout={
  display:"flex",
  gap:40
 }

 const left={
  flex:1
 }

 const right={
  width:260
 }

 const label={
  fontSize:11,
  color:"#94a3b8",
  marginBottom:6
 }

 const input={
  width:"100%",
  padding:"12px",
  borderRadius:8,
  border:"1px solid #2d3748",
  background:"#020617",
  color:"white"
 }

 const grid={
  display:"grid",
  gridTemplateColumns:"1fr 1fr 1fr",
  gap:16,
  marginTop:20
 }

 return(

 <div style={container}>

  <div style={card}>

   {/* LOGO */}

   <div style={{marginBottom:30}}>
    <img
     src="/favicon.png"
     style={{width:60,height:60}}
    />
   </div>


   <div style={layout}>

    {/* LEFT SIDE */}

    <div style={left}>

     <div style={label}>Sport</div>

     <select
      value={type}
      onChange={(e)=>setType(e.target.value)}
      style={input}
     >
      <option value="swim">Swimming</option>
      <option value="run">Running</option>
      <option value="mtb">MTB</option>
      <option value="road">Road Bike</option>
     </select>


     <div style={grid}>

      <div>
       <div style={label}>Distance (km)</div>
       <input
        type="number"
        onChange={(e)=>setDistance(Number(e.target.value))}
        style={input}
       />
      </div>

      <div>
       <div style={label}>Duration (minutes)</div>
       <input
        type="number"
        onChange={(e)=>setDuration(Number(e.target.value))}
        style={input}
       />
      </div>

      <div>
       <div style={label}>Elevation (meters)</div>
       <input
        type="number"
        onChange={(e)=>setElevation(Number(e.target.value))}
        style={input}
       />
      </div>

     </div>

    </div>


    {/* RIGHT SIDE */}

    <div style={right}>

     <div style={{
      textAlign:"center",
      padding:20,
      marginBottom:20,
      borderRadius:12,
      background:"#020617",
      border:"1px solid #1f2937"
     }}>

      <div style={{
       fontSize:11,
       letterSpacing:2,
       color:"#60a5fa"
      }}>
       ESTIMATED YIELD
      </div>

      <div style={{
       fontSize:42,
       fontWeight:900
      }}>
       {xp}
      </div>

      <div style={{color:"#3b82f6"}}>
       XP
      </div>

     </div>


     <MintButton activity={activity} xp={xp} />

     <div style={{height:12}}/>

     <MintStacksButton activity={activity} xp={xp} />

    </div>

   </div>

  </div>

 </div>

 )
}
