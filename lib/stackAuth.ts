import { AppConfig, UserSession, showConnect } from "@stacks/connect"

const appConfig = new AppConfig(["store_write","publish_data"])

export const userSession = new UserSession({ appConfig })

export function connectStacks(){

 showConnect({

  appDetails:{
   name:"Onchain Sports",
   icon:window.location.origin + "/favicon.ico"
  },

  redirectTo:"/",

  userSession,

  onFinish:()=>{
   console.log("Stacks login success")
   window.location.reload()
  }

 })

}
