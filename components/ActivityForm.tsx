"use client"

import { useState, useEffect } from "react"
import { calculateXP } from "../lib/xpCalculator"
import MintButton from "./MintButton"
import MintStacksButton from "./MintStacksButton"

type ActivityType = "run" | "swim" | "mtb" | "road"

export default function ActivityForm(){

 const [activity,setActivity] = useState<ActivityType>("run")

 const [distance,setDistance] = useState(0)
 const [duration,setDuration] = useState(0)
 const [elevation,setElevation] = useState(0)

 const [xp,setXp] = useState(0)

 useEffect(()=>{

  const value = calculateXP({
   type:activity,
   distance,
   duration,
   elevation
  })

  setXp(value)

 },[activity,distance,duration,elevation])


 return(

  <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center p-4">

   <div className="max-w-md w-full">

    {/* HEADER */}

    <div className="text-center mb-8">

     <div className="inline-flex p-4 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 mb-4">

      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
       <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>

     </div>

     <h1 className="text-3xl font-black italic uppercase tracking-tight">
      ONCHAIN<span className="text-blue-500">KMS</span>
     </h1>

     <p className="text-gray-500 text-xs tracking-[0.25em] font-bold">
      BTC & BASE PROTOCOL
     </p>

    </div>


    {/* CARD */}

    <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">

     <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-600/10 blur-[120px] rounded-full"></div>

     <div className="relative z-10 space-y-6">


      {/* ACTIVITY SELECTOR */}

      <div className="grid grid-cols-2 gap-2">

       {["run","swim","mtb","road"].map((t:any)=>(

        <button
         key={t}
         onClick={()=>setActivity(t)}
         className={`py-3 rounded-xl text-xs font-black transition-all border-2

         ${activity===t
          ?"border-blue-500 bg-blue-500/10 text-blue-400"
          :"border-transparent bg-white/5 text-gray-400"}`}
        >

         {t.toUpperCase()}

        </button>

       ))}

      </div>


      {/* DISTANCE */}

      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">

       <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">
        Kilómetros
       </label>

       <input
        type="number"
        value={distance || ""}
        onChange={(e)=>setDistance(Number(e.target.value))}
        className="bg-transparent w-full text-2xl font-bold outline-none"
        placeholder="0.0"
       />

      </div>


      {/* DURATION */}

      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">

       <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">
        Tiempo (min)
       </label>

       <input
        type="number"
        value={duration || ""}
        onChange={(e)=>setDuration(Number(e.target.value))}
        className="bg-transparent w-full text-2xl font-bold outline-none"
        placeholder="0"
       />

      </div>


      {/* ELEVATION */}

      <div className="bg-white/5 p-4 rounded-2xl border border-white/5">

       <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">
        Desnivel (m)
       </label>

       <input
        type="number"
        value={elevation || ""}
        onChange={(e)=>setElevation(Number(e.target.value))}
        className="bg-transparent w-full text-2xl font-bold outline-none"
        placeholder="0"
       />

      </div>


      {/* XP */}

      <div className="text-center py-6 border-y border-white/5">

       <span className="text-xs font-black text-blue-500 uppercase tracking-widest">
        XP CALCULADO
       </span>

       <div className="text-6xl font-black tabular-nums">
        {xp}
       </div>

      </div>


      {/* BUTTONS */}

      <div className="space-y-3">

       <MintButton
        activity={{
         type:activity,
         distance,
         duration,
         elevation
        }}
        xp={xp}
       />

       <MintStacksButton
        activity={{
         type:activity,
         distance,
         duration,
         elevation
        }}
        xp={xp}
       />

      </div>

     </div>

    </div>

   </div>

  </div>

 )

}
