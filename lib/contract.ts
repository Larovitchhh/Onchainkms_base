export const CONTRACT_ADDRESS = "0x03c1539C6886c07166d33B1b2D80B66852253Aa1"

export const CONTRACT_ABI = [
 {
  name:"mintActivity",
  type:"function",
  stateMutability:"nonpayable",
  inputs:[
   {name:"user",type:"address"},
   {name:"xp",type:"uint256"},
   {name:"kms",type:"uint256"},
   {name:"duration",type:"uint256"},
   {name:"elevation",type:"uint256"}
  ],
  outputs:[]
 }
]
