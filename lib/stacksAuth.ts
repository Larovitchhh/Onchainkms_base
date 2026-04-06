import { AppConfig, UserSession, showConnect } from "@stacks/connect"

const appConfig = new AppConfig(["store_write", "publish_data"])
export const userSession = new UserSession({ appConfig })

export async function connectStacks() {
  console.log("Iniciando showConnect desde lib...")

  try {
    await showConnect({
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/icon.png",
      },
      userSession,
      onFinish: () => {
        console.log("Stacks connect OK")
        window.location.reload()
      },
      onCancel: () => {
        console.log("Stacks connect cancelado")
      },
    })
  } catch (err) {
    console.error("showConnect falló:", err)
    throw err
  }
}

if (typeof window !== "undefined") {
  ;(window as any).forceStacksConnect = connectStacks
}
