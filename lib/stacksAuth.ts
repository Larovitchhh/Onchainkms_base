import { AppConfig, UserSession } from "@stacks/auth";
import { showConnect } from "@stacks/connect";

// Configuramos la app
const appConfig = new AppConfig(["store_write"]);

// Creamos la sesión de forma segura
export const userSession = new UserSession({ appConfig });

export function connectStacks() {
  // 1. Verificación radical de entorno
  if (typeof window === "undefined") return;

  try {
    showConnect({
      appDetails: {
        name: "Onchain Sports",
        icon: window.location.origin + "/favicon.ico",
      },
      // Usamos el cast 'as any' para evitar conflictos de tipos de la v7
      userSession: userSession as any, 
      onFinish: () => {
        console.log("Stacks wallet connected");
        window.location.reload();
      },
      onCancel: () => {
        console.log("User cancelled login");
      }
    });
  } catch (err) {
    console.error("Error en Stacks Connect:", err);
  }
}
