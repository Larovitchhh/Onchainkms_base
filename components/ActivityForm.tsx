return(

<div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white">

<div className="relative w-full max-w-md">

{/* HEADER */}

<div className="mb-8 text-center">

<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(59,130,246,0.2)]">

<img src="/favicon.png" className="h-12 w-12"/>

</div>

<h1 className="text-4xl font-black italic tracking-tighter">
ONCHAIN<span className="text-blue-500">KMS</span>
</h1>

<p className="mt-1 text-[10px] font-bold tracking-[0.4em] text-gray-500">
PROOF OF PHYSICAL WORK
</p>

</div>


{/* CARD */}

<div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

<div className="p-8">


{/* SPORT SELECTOR */}

<div className="mb-8 grid grid-cols-2 gap-3">

{["run","swim","mtb","road"].map((id)=>(

<button
key={id}
onClick={()=>setType(id)}
className={`flex items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-black transition-all border ${
type===id
? "border-blue-500 bg-blue-500/20 text-blue-400"
: "border-white/5 bg-white/5 text-gray-500"
}`}
>

{id.toUpperCase()}

</button>

))}

</div>


{/* INPUTS */}

<div className="space-y-4">

<input
placeholder="Distance (km)"
type="number"
value={distance}
onChange={(e)=>setDistance(Number(e.target.value))}
className="w-full rounded-xl border border-white/5 bg-black/40 p-4 text-xl font-bold outline-none"
/>

<input
placeholder="Duration (minutes)"
type="number"
value={duration}
onChange={(e)=>setDuration(Number(e.target.value))}
className="w-full rounded-xl border border-white/5 bg-black/40 p-4 text-xl font-bold outline-none"
/>

<input
placeholder="Elevation (meters)"
type="number"
value={elevation}
onChange={(e)=>setElevation(Number(e.target.value))}
className="w-full rounded-xl border border-white/5 bg-black/40 p-4 text-xl font-bold outline-none"
/>

</div>


{/* XP */}

<div className="my-8 flex flex-col items-center justify-center py-6 border-y border-white/5">

<span className="text-[10px] tracking-[0.3em] text-blue-400 opacity-60">
ESTIMATED YIELD
</span>

<div className="flex items-center gap-3">

<span className="text-6xl font-black italic">
{xp}
</span>

<span className="text-xl font-black italic text-blue-500 mt-4">
XP
</span>

</div>

</div>


{/* MINT BUTTONS (LOS TUYOS) */}

<div className="space-y-4">

<MintButton activity={activity} xp={xp} />

<MintStacksButton activity={activity} xp={xp} />

</div>


</div>

<div className="bg-white/5 px-8 py-4 text-center">

<p className="text-[9px] font-bold tracking-widest text-gray-600">

SECURED BY BASE & STACKS PROTOCOL

</p>

</div>

</div>

</div>

</div>

)
