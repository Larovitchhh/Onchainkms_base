import { AppConfig, UserSession, showConnect } from "@stacks/connect"

const appConfig = new AppConfig(["store_write", "publish_data"])
export const userSession = new UserSession({ appConfig })

export function connectStacks() {
  console.log("Iniciando showConnect desde lib...");
  showConnect({
    appDetails: {
      name: "OnchainKMs",
      icon: window.location.origin + "/logo.png",
    },
    userSession,
    onFinish: () => {
      window.location.reload()
    },
  })
}

// Hacemos la función accesible globalmente para el navegador
if (typeof window !== "undefined") {
  (window as any).forceStacksConnect = connectStacks;
}
