import { AppConfig, UserSession, showConnect } from "@stacks/connect"

// Usamos una configuración estándar que no bloquee el popup
const appConfig = new AppConfig(["store_write", "publish_data"])

export const userSession = new UserSession({ appConfig })

export function connectStacks() {
  showConnect({
    appDetails: {
      name: "OnchainKMs",
      // Usamos logo.png que es el que confirmamos que existe en tu root
      icon: typeof window !== "undefined" ? window.location.origin + "/logo.png" : "",
    },
    userSession,
    onFinish: () => {
      window.location.reload()
    },
  })
}
