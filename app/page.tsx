import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"

export default function Home(){

 return(

  <main style={{padding:40}}>

   <h1>Onchain Sports</h1>

   <ConnectWallet/>

   <br/>

   <ConnectStacks/>

   <ActivityForm/>

  </main>

 )
}
