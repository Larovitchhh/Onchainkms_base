import { AppConfig, UserSession } from "@stacks/auth";
import { showConnect } from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);

export const userSession = new UserSession({
  appConfig,
});

export function connectStacks() {
  // Verificamos que estemos en el navegador
  if (typeof window === "undefined") return;

  try {
    showConnect({
      appDetails: {
        name: "Onchain KMs",
        icon: window.location.origin + "/favicon.ico",
      },
      userSession: userSession as any,
      onFinish: () => {
        console.log("Stacks wallet connected");
        window.location.reload();
      },
      onCancel: () => {
        console.log("User cancelled login");
      }
    });
  } catch (error) {
    console.error("Error al intentar abrir Stacks Connect:", error);
  }
}
