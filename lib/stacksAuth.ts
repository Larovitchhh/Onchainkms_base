import { AppConfig, UserSession } from "@stacks/auth";
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
    // Añadimos 'as any' para resolver el conflicto de tipos de Stacks
    userSession: userSession as any, 
    onFinish: () => {
      console.log("Stacks wallet connected");
      window.location.reload();
    },
    onCancel: () => {
      console.log("User cancelled login");
    }
  });
}
