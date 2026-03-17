"use client";

import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"
import MintStacksButtonV2 from "../components/MintStacksButtonV2" // Importa el nuevo

export default function Home() {
  // Datos de prueba para que el botón no explote si el form está vacío
  const mockActivity = {
    type: "run",
    distance: 10,
    duration: 60,
    elevation: 100
  };

  return (
    <main style={{ padding: 40 }}>
      <ConnectWallet />
      <br />
      <ConnectStacks />
      <br />
      
      {/* El formulario original */}
      <ActivityForm />

      <hr style={{ margin: '40px 0', borderColor: '#eee' }} />
      
      {/* EL BOTÓN DE GUERRA: Pónlo aquí para testearlo fuera del form */}
      <div style={{ textAlign: 'center', background: '#f9f9f9', padding: '20px', borderRadius: '15px' }}>
        <h3>Test de Minteo V2</h3>
        <MintStacksButtonV2 activity={mockActivity} xp={500} />
      </div>
    </main>
  );
}
