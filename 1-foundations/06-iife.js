// IIFE: función que se define y se ejecuta inmediatamente.
// Crea un scope local instantáneo → evita contaminar el Global Scope.

(function showTemp() {
  var temp = "solo existo aquí";
  console.log(temp); // ✅
})();

// console.log(temp); // ❌ ReferenceError

// ─── Con parámetros ───────────────────────────────────────────────────────────
const result = (function (a, b) {
  return a + b;
})(10, 20);

console.log(result); // 30

// ─── Arrow function version ───────────────────────────────────────────────────
(() => {
  console.log("IIFE con arrow function");
})();

// ─── Caso real: módulo con datos privados ─────────────────────────────────────
// Antes de que existieran los módulos ES6, IIFE era el patrón estándar
// para encapsular código y exponer solo lo necesario.

const app = (function () {
  const version = "1.0.0"; // privado

  function init() {
    console.log(`App v${version} iniciada`);
  }

  return { init }; // solo `init` es público
})();

app.init();
// console.log(app.version); // undefined — `version` no se expuso
