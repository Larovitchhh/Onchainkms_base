export const CONTRACT_ADDRESS = "0x03c1539C6886c07166d33B1b2D80B66852253Aa1"

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
