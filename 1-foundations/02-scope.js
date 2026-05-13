// ─── GLOBAL SCOPE ────────────────────────────────────────────────────────────
const globalVar = "global";

function showFunction() {
  // ─── FUNCTION SCOPE ──────────────────────────────────────────────────────
  const functionVar = "función";
  console.log(globalVar);   // ✅ la scope chain llega al global
  console.log(functionVar); // ✅ está en este mismo scope
}

showFunction();
// console.log(functionVar); // ❌ ReferenceError — no existe fuera de la función

// ─── BLOCK SCOPE ─────────────────────────────────────────────────────────────
if (true) {
  const blockVar = "bloque";
  let alsoBlock = "también bloque";
  var leaks = "me escapo del bloque"; // var ignora bloques — solo respeta funciones

  console.log(blockVar);  // ✅
  console.log(alsoBlock); // ✅
}

// console.log(blockVar);  // ❌ ReferenceError
// console.log(alsoBlock); // ❌ ReferenceError
console.log(leaks);        // ✅ var se escapó al scope superior

// ─── SCOPE CHAIN ─────────────────────────────────────────────────────────────
// El motor busca variables de adentro hacia afuera hasta el Global Scope.
// Si no la encuentra → ReferenceError.

function first() {
  const inFirst = "first";

  function second() {
    const inSecond = "second";

    function third() {
      console.log(inSecond);  // ✅ encuentra en second()
      console.log(inFirst);   // ✅ sube un nivel más, encuentra en first()
      console.log(globalVar); // ✅ sube hasta el Global Scope
    }

    third();
  }

  second();
}

first();

// La búsqueda va hacia AFUERA, nunca hacia adentro ni hacia los lados.
function sibling() {
  const siblingVar = "hermano";
}

function other() {
  // console.log(siblingVar); // ❌ ReferenceError — sibling() no está en su scope chain
}

// ─── SHADOWING ───────────────────────────────────────────────────────────────
const value = "externo";

function shadow() {
  const value = "interno"; // mismo nombre, distinto scope → shadowing
  console.log(value);      // "interno" — el motor usa el más cercano y deja de buscar
}

shadow();
console.log(value); // "externo" — el scope global no se tocó
