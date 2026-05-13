// El Call Stack rastrea qué Execution Context está activo en cada momento.
// Funciona LIFO: el último en entrar es el primero en salir.

function third() {
  console.trace("¿Dónde estoy?"); // muestra el stack completo en este momento
  return "tercera";
}

function second() {
  return third(); // apila third() encima de second()
}

function first() {
  return second(); // apila second() encima de first()
}

first();

// Orden del stack cuando `third()` se ejecuta:
//
//   third()   ← tope (ejecutándose)
//   second()
//   first()
//   Global    ← base, siempre presente

// ─── Stack Overflow ───────────────────────────────────────────────────────────
// Una función recursiva sin caso base llena el stack hasta que el motor lo rompe.

function infinite() {
  return infinite(); // cada llamada apila un FEC nuevo sin nunca hacer pop
}

infinite(); // ❌ RangeError: Maximum call stack size exceeded
