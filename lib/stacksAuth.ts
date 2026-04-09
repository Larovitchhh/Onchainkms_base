import { AppConfig, UserSession, showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);

export const userSession = new UserSession({
  appConfig
});

export function connectStacks() {
  // Verificamos que estamos en el cliente antes de usar window
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  showConnect({
    appDetails: {
      name: "Onchain Sports",
      icon: origin + "/favicon.ico",
    },
    userSession,
    onFinish: () => {
      console.log("Stacks wallet connected");
      window.location.reload(); // Recargamos para limpiar cualquier residuo de sesión antigua
    },
  });
}
