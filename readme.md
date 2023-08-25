# Programación Backend

## Index

[Modulo - 01](#modulo-1)

- [Clase - 00: Principios de Backend](#clase-0-principios-de-programación-backend)
- [Clase - 01: Principios de JS](#clase-01-principios-de-js)
- [Clase - 02: Nuevas Funcionalidades](#clase-02-nuevas-funcionalidades)
- [Clase - 03: Sincronia y Asincronia](#clase-03-sincronia-y-asincronia)

## Como usar este repo

iniciamos despues de descargar con `npm i` para instalar dependencias

Puedes correr el código dependiendo de la carpeta utilizando la siguiente estructura: `node clase-[X]/[elarchivo que quieres correr].js.` En cada sección, proporcionaré la ruta de cómo ejecutarlo.

Asegúrate de reemplazar` [X] `con el número de clase correspondiente y `[elarchivo que quieres correr]` con el nombre del archivo que deseas ejecutar.

## Modulo 1

### Clase 0: Principios de programación Backend

#### Anotaciones

- Explicación de los principios básicos de programación Backend
- Diferencias con Frontend
- Arquitectura de una aplicación Backend
- Mern stack

#### Actividades en clase

##### LongestWord

Crear una funcion que te devuelve la palabra mas larga de una cadena de texto.

Por ejemplo:

```js
console.log(longestWord('Hello my name is John'));
 // hello
console.log(longestWord("The quick brown fox jumps over the lazy dog"));
//[ 'quick', 'brown', 'jumps' ]
```

esta funcion esta retornando la palabra mas larga de una cadena de texto se encuentra en [longestWord.js](/clase-0/longestWord.js)

##### isReverseInt

Crear una funcion que determine si un numero dado es el reverso de otro numero.

por ejemplo:

```js
isReverseInt(123, 321); // true
isReverseInt(-123, -321); // true
isReverseInt(321, 312); // false
isReverseInt(-123, 321) // false
```

este documento se encuentra en ahi se resolvio nuestro reto [isReverseInt.js](isReverseInt.js)

### Clase 01: Principios de JS

#### Ejercicio: [showList.js](/clase-01/showList.js)

En este ejercicio, hemos creado la función showList que recibe un array y muestra sus elementos en la consola. Si el array está vacío, muestra un mensaje en rojo indicando que el array está vacío.

```js
// Queremos crear una función llamada showList que reciba un array
function showList(array) {
 // Si el array está vacío, retorna una lista vacía con chalk
 if (array == null || array == undefined || array == "") {
  return console.log(chalk.red("El array está vacío"));
 } else {
  array.forEach((element, index) => {
   console.log(chalk.green(`Elemento ${index + 1}:`, element));
  });
 }
}
```

las pruebas de las funciones anteriores se encuentran en dentro del archivo [showList.js](/clase-01/showList.js)

```js
// Pruebas
showList(["a", "b", "c"]);
showList(null);
showList([]);
```

podemos probar el codigo corriengo desde la carpeta raiz `node clase-1/showList.js` y veremos como funciona.

### Clase 02: Nuevas Funcionalidades

En esta clase, hemos añadido dos ejercicios :

#### Ejercicio: [keys.js](/clase-02/keys.js)

Este ejercicio trabaja con un conjunto de objetos y crea una lista de todas las claves únicas presentes en estos objetos. El código se ve de la siguiente manera:

```js
const keys = objetos.reduce((acc, curr) => {
 Object.keys(curr).forEach((key) => {
  if (!acc.includes(key)) {
   acc.push(key);
  }
 });
 return acc;
}, []);

```

Esto lo que hace es te filtra todas las claves o keys. Comienza con un acumulador vacío y, para cada objeto, obtiene sus claves. Si una clave aún no está en el acumulador, la agrega. El resultado es un arreglo keys con claves únicas de todos los objetos. Esto es util para propiedades que estan duplicados El código completo se encuentra en [keys.js](/clase-02/keys.js)

##### Resultado de keys

Para correr El ejercicio se core desde la raiz con `node clase-02/keys.js` y veriamos que el resultado es

```js
[
  'manzanas', 'peras',
  'carne',    'jugos',
  'dulces',   'sandias',
  'huevos',   'panes'
]
```

#### Ejercicio: [TicketManager.js](/clase-02/TicketManager.js)

Para este ejercicio hiciemos una implementación de una clase llamada TicketManager. Hace lo siguiente:

Define una clase `TicketManager` que tiene propiedades privadas ``#_events``y `#_user`.

La propiedad `#_events` se utiliza para almacenar una lista de eventos.

La clase tiene métodos `get` y `set` para las propiedades events y user.

EL `set user(newUser)` usa un `switch case` para validacioens y mejor informacion para el usario

```js
set user(newUser) {
  switch (true) {
   case !newUser.name && !newUser.age && !newUser.event:
    console.error(chalk.red("Name, Age, and Event are required"));
    break;
   case !newUser.name && !newUser.age:
    console.error(chalk.red("Name and Age are required"));
    break;
   case !newUser.name && !newUser.event:
    console.error(chalk.red("Name and Event are required"));
    break;
   case !newUser.age && !newUser.event:
    console.error(chalk.red("Age and Event are required"));
    break;
   case !newUser.name:
    console.error(chalk.red("Name is required"));
    break;
   case !newUser.age:
    console.error(chalk.red("Age is required"));
    break;
   case !newUser.event:
    console.error(chalk.red("Event is required"));
    break;
   default:
    // Check if the event exists and attach it to the user
    const validEvent = this.#_events.find(
     (event) => event.id === newUser.event
    );
    if (validEvent) {
     this.#_user = { ...newUser, event: validEvent };
    } else {
     throw new Error(`Event with id ${newUser.event} not found.`);
    }
  }
 }
 ```

Me gustan mas switch cases cuando hay varias opciones de validacion como en este caso. Hace el codigo mas legible.

##### Resultado de Ticketmaster

Para correr El ejercicio se core desde la raiz con `node clase-02/TicketManager.js` y veriamos que el resultado es:

```js
tm.user = { name: "John Doe", age: 30, event: 1 };

console.log(chalk.yellow(`name: "John Doe", age: 30, event: 5`));
console.log("user updated", tm.user);
```

```js
// name: "John Doe", age: 30, event: 5
//user updated
{
  name: 'John Doe',
  age: 30,
  event: {
    artist: 'bad bunny',
    city: 'caba',
    price: 120,
    capacity: 1500,
    id: 1
  }
}
```

### Clase 03: Sincronia y Asincronia

#### Ejercicio: [calculadora.js](/clase-03/calculadora.js)

En este ejercicio, hemos implementado una calculadora simple que puede realizar operaciones de suma, resta, multiplicación y división. La calculadora utiliza promesas para manejar las operaciones de manera asíncrona.

Podemos correr `node clase-03/calculadora.js` y modificar los numeros

```js
async function calculator() {
 try {
  console.log(chalk.green(await add(5, 5)));
  console.log(chalk.green(await subtract(5, 5)));
  console.log(chalk.green(await multiply(5, 5)));
  console.log(chalk.green(await divide(5, 5)));
 } catch (error) {
  console.log(chalk.redBright(error));
 }
}
```

##### Resultado

y el resultado que podriamos ver seria

```js
10
0
25
1
```
