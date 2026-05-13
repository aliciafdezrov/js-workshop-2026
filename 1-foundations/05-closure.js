// Un closure es la función + el Lexical Environment donde fue CREADA.
// La función interna recuerda las variables del scope padre incluso después
// de que ese contexto haya sido eliminado del Call Stack.

// ─── Ejemplo base ─────────────────────────────────────────────────────────────
function makeCounter() {
  let count = 0; // este contexto va a desaparecer del Call Stack...

  function incrementCount() {
    count++;
    return count;
  }
  return incrementCount;
}

const counter = makeCounter(); // makeCounter() terminó y fue eliminado del stack
console.log(counter()); // 1 — `count` sigue accesible
console.log(counter()); // 2

// ─── Caso práctico: datos privados ────────────────────────────────────────────
// function createAccount(initialBalance) {
//   let balance = initialBalance; // privado — no accesible desde afuera

//   return {
//     deposit(amount) {
//       balance += amount;
//     },
//     withdraw(amount) {
//       if (amount > balance) return "Fondos insuficientes";
//       balance -= amount;
//     },
//     getBalance() {
//       return balance;
//     },
//   };
// }

// const account = createAccount(100);
// account.deposit(50);
// account.withdraw(30);
// console.log(account.getBalance()); // 120
