// Durante la fase de CREACIÓN del Execution Context, el motor registra
// declaraciones en memoria antes de ejecutar una sola línea.
// El comportamiento difiere según cómo se declare la variable.

// ─── FUNCTION DECLARATIONS: hoisting total ───────────────────────────────────
console.log(sayHello()); // ✅ "Hola" — la función ya está en memoria completa

function sayHello() {
  return "Hola";
}

// ─── VAR: hoisting parcial ────────────────────────────────────────────────────
// El motor reserva el espacio y asigna `undefined`. El valor llega en la ejecución.
console.log(age); // ✅ undefined — no ReferenceError, pero tampoco el valor real
var age = 30;
console.log(age); // ✅ 30

// Lo que el motor "ve" internamente:
//
//   var age = undefined;  ← fase de creación
//   console.log(age);     → undefined
//   age = 30;             ← fase de ejecución
//   console.log(age);     → 30

// ─── FUNCTION EXPRESSION con var: no tiene hoisting total ────────────────────
// console.log(greet()); // ❌ TypeError: greet is not a function
var greet = function () {
  return "Hey";
};
// `greet` fue hoisted como var → undefined. Llamarla antes es un TypeError, no ReferenceError.

// ─── LET y CONST: Temporal Dead Zone (TDZ) ───────────────────────────────────
// El motor también registra `let` y `const` en la fase de creación,
// pero los marca como "no inicializados". Acceder a ellos antes lanza ReferenceError.
const color = "azul"; // ← TDZ termina acá
let gender = "unkown";

console.log(color); // ✅ "azul"

// ─── Comparación de los tres comportamientos ─────────────────────────────────
//
//   var   → hoisting parcial    → undefined antes de la asignación
//   let   → TDZ                 → ReferenceError antes de la declaración
//   const → TDZ                 → ReferenceError antes de la declaración
//   fn declaration → hoisting total → disponible desde el inicio del scope
