// Cuando el motor inicia el script, crea el GLOBAL EXECUTION CONTEXT (GEC).
// Junto con él, crea su Lexical Environment — el registro donde van a vivir
// todas las variables y funciones declaradas en el nivel global.
//
// GEC — Lexical Environment
// ┌──────────────────────────────┐
// │ Environment Record           │
// │   greet    → fn              │
// │   userName → "Gerard"        │
// │ Outer Reference → null       │ ← no hay nada afuera del global
// └──────────────────────────────┘

const userName = "Gerard";

function greet(name) {
  // Cada vez que se invoca greet(), el motor crea un FUNCTION EXECUTION CONTEXT (FEC).
  // Ese FEC tiene su PROPIO Lexical Environment — separado del global.
  //
  // FEC — Lexical Environment
  // ┌──────────────────────────────┐
  // │ Environment Record           │
  // │   name    → "Gerard"         │
  // │   message → "Hola, Gerard"   │
  // │ Outer Reference → GEC LE     │ ← apunta al Lexical Environment del global
  // └──────────────────────────────┘

  const message = `Hola, ${name}`;
  console.log(message);

  // `userName` no está en este Lexical Environment.
  // El motor usa la Outer Reference para buscarlo en el GEC → lo encuentra.
  console.log(`Desde el global: ${userName}`);
}

greet(userName);

// Cuando greet() termina → su FEC se elimina del Call Stack.
// Su Lexical Environment se destruye (salvo que un closure lo retenga).
// El motor vuelve al GEC, que sigue activo.
