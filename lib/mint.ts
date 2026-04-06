await tx.wait();

    // NUEVO: Guardar en DB tras éxito en Base
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          blockchain: "base",
          sport: activity.type,
          km: activity.distance,
          elev: activity.elevation,
          time: activity.duration,
          xp: xp,
          hash: tx.hash
        })
      });
    } catch (e) {
      console.error("Error saving to DB:", e);
    }
    
    return { success: true, hash: tx.hash };
