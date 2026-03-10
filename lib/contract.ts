export const CONTRACT_ADDRESS = "0x6f0090250D66C5DCe0193741973EFFbA8160F5B3"

export const CONTRACT_ABI = [
 {
  name:"mintActivity",
  type:"function",
  stateMutability:"nonpayable",
  inputs:[
   {name:"to",type:"address"},
   {name:"km",type:"uint256"},
   {name:"xp",type:"uint256"},
   {name:"stravaId",type:"string"},
   {name:"metadataURI",type:"string"}
  ],
  outputs:[
   {name:"",type:"uint256"}
  ]
 }
]
