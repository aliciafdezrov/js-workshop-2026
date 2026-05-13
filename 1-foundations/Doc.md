# Execution Context

El **Execution Context** es el entorno en el que se evalúa y ejecuta el código JavaScript. Cada contexto de ejecución tiene tres fases:

- **Creación:** se reserva el espacio en memoria para variables y funciones.
- **Ejecución:** el código se ejecuta de forma secuencial y se asignan los valores.
- **Destrucción:**: Una vez que la función termina su ejecución (return o fin de bloque), su Execution Context es eliminado del Call Stack.
  > **Nota:** Al destruirse el contexto, normalmente se libera la memoria asociada. La única excepción a esta "muerte" es la Closure, que mantiene el Lexical Environment vivo en el Heap si una función hija todavía lo necesita..

Existen tres tipos:

- **Global Execution Context (GEC):** el contexto raíz. Se crea una sola vez, al iniciar el script.
- **Function Execution Context (FEC):** se crea cada vez que se invoca una función.
- **Eval Execution Context:** se crea al ejecutar código dentro de `eval()`.

## Lexical Environment

Es el registro donde se almacenan las variables/funciones y sus valores. Tiene dos componentes:

- **Environment Record:** la ubicación física en memoria donde se almacenan.
- **Referencia al Environment Externo:** un enlace al Lexical Environment del scope padre.

```javascript
let serie = "Friends";

let quedarAmigos = function () {
  let bar = "Central Park";
  let beber = function () {
    let bebida = "cafe";
  };
  beber();
};

quedarAmigos();
```

| **Contexto**     | **Environment Record (Variables/Argumentos)**    | **Outer Reference (Link Externo)** |
| ---------------- | ------------------------------------------------ | ---------------------------------- |
| **Global**       | `serie: undefined`, `quedarAmigos: fn()`         | `null` (es la raíz)                |
| **quedarAmigos** | `bar: undefined`, `beber: fn()`, `arguments: {}` | `Global Lexical Environment`       |
| **beber**        | `bebida: undefined`, `arguments: {}`             | `quedarAmigos Lexical Environment` |

```javascript
beber_LexicalEnvironment = {
  EnvironmentRecord: {
    bebida: "café",
    // Aquí no está "beber", está en el record de su padre
  },
  OuterReference: {
    EnvironmentRecord: {
      bar: "Central Park",
      beber: fn, // <-- La definición de "beber" vive aquí
    },
    OuterReference: {
      EnvironmentRecord: {
        serie: "Friends",
        quedarAmigos: fn, // <-- La definición de "quedarAmigos" vive aquí
      },
      OuterReference: null,
    },
  },
};
```

Cada vez que se crea un Execution Context, el motor le asigna un Lexical Environment específico para ese contexto.

> **Nota:** En la fase de creación, el motor prepara el Lexical Environment con las declaraciones de variables inicializadas. Luego, cuando se ejecuta el código, se actualizan los valores en el Lexical Environment.

---

## Scope

Conjunto de reglas que determinan la accesibilidad de las variables y funciones. Existen tres tipos:

- **Global:** abarca todo el código; las variables declaradas son accesibles desde cualquier lugar.
- **Función:** las variables solo son accesibles dentro de la función y sus funciones anidadas.
- **Bloque:** las variables solo son accesibles dentro de estructuras de control (`if`/`else`) o bucles (`for`).

### Scope Chain

Es el proceso de búsqueda que realiza el motor de JavaScript para resolver identificadores (variables o funciones). Si una variable no se encuentra en el Lexical Environment del Execution Context actual, el motor usa la referencia al Outer Lexical Environment para buscarla en el entorno superior. Este proceso se repite en cadena hasta alcanzar el Global Scope, si no se halla ahí, se lanza un `ReferenceError`.

> **Shadowing:** ocurre cuando una variable en un scope interno tiene el mismo nombre que una en el externo. El motor utiliza la variable del scope más cercano y deja de buscar.

---

## Hoisting

El **Hoisting** es un comportamiento del motor de JavaScript durante la fase de creación del Execution Context, donde las declaraciones se registran en memoria antes de que el código comience a ejecutarse.

- **Function Declarations:** tienen hoisting total. El motor guarda el cuerpo completo de la función en el Lexical Environment, lo que permite invocarla antes de su definición.
- **Variables con `var`:** tienen hoisting parcial. El motor reserva el espacio y asigna automáticamente el valor `undefined`. Se puede acceder a ellas antes de su definición.

---

## Temporal Dead Zone (TDZ)

La **Temporal Dead Zone** es un comportamiento exclusivo de `let` y `const`. Es el periodo en el que una variable no puede ser utilizada, a pesar de que el motor ya sabe que existe.

1. **Entrada al scope:** la TDZ comienza cuando el hilo de ejecución entra en el scope donde está definida la variable. El Execution Context ya reservó el nombre en memoria, pero está marcado como "no inicializado".
2. **Acceso bloqueado:** cualquier intento de lectura o escritura lanza un `ReferenceError`.
3. **Fin de la TDZ:** termina en el momento en que el motor ejecuta la línea de la declaración.

---

## Call Stack

Es la estructura de datos que utiliza el motor de JavaScript para rastrear qué Execution Context se está ejecutando en cada momento. Funciona bajo el principio LIFO (Last In, First Out), donde el Global Execution Context actúa siempre como la base permanente de la pila desde que se inicia el script.

**Funcionamiento:** cuando se invoca una función, se crea su FEC y se apila en la cima del Call Stack, moviendo el foco del motor a ese nuevo entorno. Cuando la función termina su ejecución o retorna un valor, su contexto se elimina (pop) y el motor recupera el control del contexto que estaba justo debajo, descendiendo por la pila hasta regresar al contexto global.

> **Nota:** Console Trace: es el comando que permite visualizar el estado actual del Call Stack. Es especialmente útil en funciones reutilizables o arquitecturas complejas para identificar qué ruta exacta de llamadas siguió el motor hasta un punto determinado.
---

## Closure

Un **Closure** es la combinación de una función y el Lexical Environment donde fue creada. Es la capacidad técnica que permite a una función interna recordar y acceder a las variables de su scope superior, incluso después de que la función padre haya terminado su ejecución y su contexto haya sido eliminado del Call Stack.

Esto ocurre porque, mientras la función hija sea accesible, el motor mantiene su entorno léxico en memoria para evitar que el Garbage Collector lo elimine.

---

## IIFE (Immediately Invoked Function Expression)

Es una función que se ejecuta inmediatamente después de ser definida. Se utiliza principalmente para crear un scope local instantáneo que evita la contaminación del Global Scope con variables temporales. Este mecanismo permite el encapsulamiento de datos, proporcionando privacidad al código interno.
