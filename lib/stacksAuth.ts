import { AppConfig, UserSession, showConnect } from "@stacks/connect"

const appConfig = new AppConfig(["store_write"])

export const userSession = new UserSession({
 appConfig
})

export function connectStacks(){

 showConnect({

  appDetails:{
   name:"Onchain Sports",
   icon: window.location.origin + "/favicon.ico"
  },

  userSession,

  onFinish:()=>{
   console.log("Stacks wallet connected")
  }

 })
}
