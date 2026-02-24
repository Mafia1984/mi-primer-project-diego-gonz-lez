
import * as webnative from "webnative";

/**
 * Inicializa WebNative usando la API nueva basada en `program()`
 * y devuelve el `session` si está disponible.
 */
export async function initWebnative() {
  // Crea el "program" de la app (identidad/namespace de tu app)
  const program = await webnative.program({
    // Usa un namespace único para tu app (aparece en cachés/local)
    namespace: { creator: "diego", name: "mi-primer-proyecto" }
  }).catch((error) => {
    switch (error) {
      case webnative.ProgramError.InsecureContext:
        console.error("❌ WebNative requiere HTTPS o localhost");
        break;
      case webnative.ProgramError.UnsupportedBrowser:
        console.error("❌ Navegador no soportado por WebNative");
        break;
      default:
        console.error("❌ Error creando program:", error);
    }
    return null;
  });

  if (!program) return null;

  // Si ya hay sesión previa, úsala
  let session = program.session;

  // Si no hay sesión, no forzamos login ahora (solo demostramos inicialización).
  // En un flujo real, podrías registrar o vincular dispositivo aquí.

  console.log("Estado WebNative (program):", {
    hasSession: Boolean(session),
    username: session?.username ?? null
  });

  return { program, session };
}
