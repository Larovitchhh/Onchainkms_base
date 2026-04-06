import { AppConfig, UserSession } from "@stacks/auth"; // Importación corregida
import { showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);

export const userSession = new UserSession({
  appConfig,
});

export function connectStacks() {
  showConnect({
    appDetails: {
      name: "Onchain Sports",
      icon: window.location.origin + "/favicon.ico",
    },
    userSession,
    onFinish: () => {
      // Importante: Recargar o actualizar el estado de la UI aquí
      console.log("Stacks wallet connected");
      window.location.reload(); 
    },
    onCancel: () => {
      console.log("User cancelled login");
    }
  });
}
