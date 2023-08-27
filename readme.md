# Programación Backend

## Index

[Modulo - 01](#modulo-1)

- [Clase - 00: Principios de Backend](#clase-0-principios-de-programación-backend)
- [Clase - 01: Principios de JS](#clase-01-principios-de-js)
- [Clase - 02: Nuevas Funcionalidades](#clase-02-nuevas-funcionalidades)
- [Clase - 03: Sincronia y Asincronia](#clase-03-sincronia-y-asincronia)
- [Clase - 04: Manejo de Archivos](#clase-04-manejo-de-archivos)
- [Clase - 05: Administradores de Paquetes](#clase-05-administradores-de-paquetes-npm)
- [Clase - 06: Servidores Web](#clase-06-servidores-web)
- [Clase - 07: Express Avanzado](#clase-07-express-avansado)
- [Clase - 08: Router y Multer](#clase-08-router-y-multer)

 [Dependencias](#dependencias)

## Como usar este repo

iniciamos despues de descargar con `npm i` para instalar las [dependencias](#dependencias)

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

##### Resultado de Calculador

y el resultado que podriamos ver seria

```js
10
0
25
1
```

### Clase 04: Manejo de Archivos

Este ejercicio demuestra cómo manipular archivos utilizando Node.js. El código crea un archivo llamado `hello.txt`, escribe "Hello World!" en él, luego sobrescribe ese contenido con "i see you". Luego, verifica la existencia del archivo, lo lee, agrega "Hello Again!" y finalmente elimina el archivo.

#### Archivo

- [archivo.js](/clase-03/archivo.js)

#### Uso

Puedes probar este ejercicio ejecutando el archivo `archivo.js` desde la carpeta `clase-03` utilizando Node.js:

`node clase-04/ejercicio-01-sync.js`

El código mostrará mensajes en la consola para indicar cada paso del proceso.

```js
File written successfully!
i see you
i see you
Hello Again!
```

### Clase 05: Administradores de paquetes (NPM)

#### [Actividad 01](/clase-05/actividad-01.js)

En este ejericio lo que hacmeos es importamos Chalk y luego creamos una funcion para correr sacar un numero random del 1 al 20, lo corremos 1000 veces y vemos cuantas veces sale cada numero y lo mentemos a un objto donde llevamos el conteo

```js
function getRandomNumbers() {
 const obj = {};
 for (let index = 0; index < 1000; index++) {
  const aleatoreo = parseInt(Math.random() * 20 + 1);
  if (!obj[aleatoreo]) obj[aleatoreo] = 1;
  else obj[aleatoreo]++;
 }

 return obj;
}
```

y la usamos para retornar un obj de random number

##### Resultado de Activad 01

podemos correr `node clase-05/actividad-01` desde la raiz y veriamos en la consola lo siguente

 ```js
 //Random numbers generated!
{
  '1': 51,
  '2': 49,
  '3': 50,
  '4': 49,
  '5': 38,
  '6': 45,
  '7': 52,
  '8': 55,
  '9': 52,
  '10': 35,
  '11': 60,
  '12': 50,
  '13': 56,
  '14': 39,
  '15': 47,
  '16': 49,
  '17': 57,
  '18': 53,
  '19': 65,
  '20': 48
}
```

#### [Actividad 02](/clase-05/actividad-02.js)

En este ejercicio lo que hacemos es crear una classe donde recibidmos un usario y usamos crypto para encriptar el usario y esconder los datos del usario

se hace con

```js
// Generate a random 128-byte salt and convert it to a base64 string.
  const salt = crypto.randomBytes(128).toString("base64");

  // Hash the user's password using SHA-256 algorithm and the generated salt.
  user.password = crypto
   .createHmac("sha256", salt)
   .update(user.password)
   .digest("base64");
```

##### Resultado de Actividad 02

Si corremos `node clase-05/actividad-02` veriamos que el resultado de nuestro usario es lo siguente

```js
[
  {
    name: 'Miguel',
    lastName: 'Chavez',
    age: 30,
    password: 'KfqGTkXnarAQjuBVQdouNzVN7bfs/Ru2vGzSFg4EmzY='
  }
]
```

#### [Actividad 3](/clase-05/actividad-03.js)

En este ejericio lo que hicimos era un calcludador de edad donde recibimos edad y caluclamos cuando leapyears han pasado, yo lo incremente a incluir varias otras vechas usando moment para retornar mas informacion

```js
function calculateAge(dateOfBirth) {
const currentDate = moment(); // Store the current date
const dob = moment(dateOfBirth, "YYYY-MM-DD"); // Store the date of birth

 if (!dob.isValid()) {
  console.log("Invalid date of birth.");
  return;
 }

 const christmas = moment({ month: 11, day: 25 });
 const halloween = moment({ month: 9, day: 31 });

  // Calculate the number of leap years between DOB and current date
 let leapYears = 0;
 for (let year = dob.year(); year <= currentDate.year(); year++) {
  if (moment({ year }).isLeapYear()) {
   leapYears++;
  }
 }

 console.log(
  chalk.greenBright(`You've lived through ${leapYears} leap years! `)
 );
}
```

 Primero, verifica si la fecha de nacimiento es válida. Luego, calcula el número de años bisiestos contando cuántos años dentro de ese rango son bisiestos. Finalmente, muestra la cantidad de años bisiestos en la consola.

##### Resultado de Actividad 03

si corremos `node clase-05/actividad-03` con la edad de del usario que tenemos en el codigo

```js
// Usage example:
const dateOfBirth = "1990-10-20"; // Replace with your actual date of birth
calculateAge(dateOfBirth);
```

Lo que nos retorna seria

```console
Program started!
Your age is 32 years.
That's about 1,036,535,164 seconds!
You've been alive for 11,996 days.
You've been alive for 394 months!
You've lived through 131 seasons!
You've seen 33 Christmases! 
You've celebrated 33 Halloweens! 
You've lived through 8 leap years! 
```

### Clase 06: Servidores Web

#### Ejercicio [index.js](/clase-06/index.js)

En este ejericcio usamos expres para correar un puerto que retorna a la consola el servidor, luego creamos 2 rutas

```js
// 04 create server routes
app.get("/", (req, res) => {
 res.send("Hello World!");
});
app.get("/users", (req, res) => {
 res.json(users);
});

app.get("/users/:id", (req, res) => {
 // get id from url params
 const id = parseInt(req.params.id);
 // find user by id
 const user = users.find((user) => user.id === id);
 // if no user found, respond with 404
 if (!user) return res.status(404).send("User not found");
 // else return user
 res.json(user);
});
```

y cuando vamos a nuestro broweser o algun cliente como postman o thunderclient y ingresamos a las rutas podemos recibir los usarios que estan en una variable.

##### Resultado Index.js

si corremos `node clase-06/index.js` y vamos a la ruta `http://localhost:3000/users/1` reciberiamos u n Json.

```json
{"id":1,"name":"John","last":"snow","age":30}
```

### Clase 07: Express Avansado

En esta clase, hemos creado una API REST simple utilizando Express, un marco de aplicación web de Node.js.

#### [Creacion del Servidor](/clase-07/app.js)

Rutas de la API

En este Ejericico defenimos varias rutas para la API que permiten realizar operaciones CRUD en una colección de usuarios.

- *Obtener un Usuario por ID*

```js
app.get("/users/:id", (req, res) => {
  const result = users.find((user) => user.id === parseInt(req.params.id));
  if (result) {
    res.json({ status: "success", payload: result });
  } else {
    res.status(404).send("User not found");
  }
});

```

- *Obtener Todos los Usuarios*

```js
app.get("/users", (req, res) => {
  res.json({ status: "success", payload: users });
});
```

- *Crear un Nuevo Usuario*

```js
app.post("/users", (req, res) => {
  // Código para crear un nuevo usuario y agregarlo a la colección
  res.status(201).json({ status: "success", payload: user });
});
```

- *Actualizar un Usuario Existente*

```js
app.put("/users/:id", (req, res) => {
  // Código para actualizar un usuario existente
  res.json({ status: "success", payload: updatedUser });
});
```

- *Eliminar un Usuario por ID*

```js
app.delete("/users/:id", (req, res) => {
  // Código para eliminar un usuario por ID
  res.json({ status: "success", payload: deletedUser });
});
```

Este código crea una API REST básica que puede manejar solicitudes para obtener, crear, actualizar y eliminar usuarios. Cada ruta realiza una operación específica en la colección de usuarios y responde con un mensaje de éxito o error según corresponda.

### Clase 08: Router y Multer

En esta clase, hemos introducido una nueva estructura de carpetas para organizar mejor nuestro proyecto y hemos comenzado a trabajar en la creación de una base de datos simulada utilizando un archivo JSON.

#### Estructura de Carpetas

Hemos reorganizado nuestro proyecto de la siguiente manera:

- **public**: En esta carpeta agregamos un archivo `index.html` que sera usado para un formulado para crear pets.
- **data**: Esta carpeta contiene el archivo `database.json`, que actúa como nuestra base de datos simulada. Aquí almacenaremos datos relacionados con nuestra aplicación.

- **src**: Esta carpeta contiene el código fuente de nuestra aplicación.

  - **models**: En esta carpeta, colocaremos los modelos de datos que representan las entidades de nuestra aplicación, como usuarios, productos, etc.

  - **router**: Aquí definiremos las rutas de nuestra API y cómo manejar las solicitudes entrantes.

##### [Archivo app.js](/clase-08/src/app.js)

Este archivo es el punto de entrada principal de la aplicación Express. Aquí se crean las rutas y se inicia el servidor web.

```js
// Usar el enrutador para las rutas relacionadas con productos
app.use("/products", router);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log(chalk.green("Server up"));
});
```

##### [Archivo productManager.js](/clase-08/src/models/ProductManager.js)

Este archivo contiene la clase ProductManager, que se encarga de gestionar productos y la base de datos simulada en el archivo database.json.

Algunas de las funciones clave de esta clase incluyen:

- `loadDatabase`: Carga los datos desde el archivo database.json en la inicialización.
- `saveDatabase`: Guarda los datos en el archivo database.json.
- `getProducts`: Obtiene todos los productos.
- `addProduct`: Agrega un nuevo producto a la base de datos.
- `getProductbyId`: Obtiene un producto por su ID.
- `deleteProductById`: Elimina un producto por su ID.
- `updateProductById`: Actualiza un producto por su ID

##### [Archivo product.router.js](/clase-08/src/router/products.router.js)

Este archivo define las rutas relacionadas con productos utilizando Express Router. También crea una instancia de ProductManager para interactuar con la base de datos simulada.

Algunas de las rutas definidas incluyen:

- `GET/`: Obtiene una lista de productos con un límite opcional.
- `GET/:id`: Obtiene un producto por su ID.

La instancia de `ProductManager` se utiliza para realizar operaciones en la base de datos simulada y devolver resultados a través de estas rutas.

## Dependencias

- [chalk](https://www.npmjs.com/package/chalk): es para colores en la consola.
- [fs](https://nodejs.org/api/fs.html): para el manejo de archivos
- [crypto](https://nodejs.org/api/crypto.html): es para la encriptacion de datos usando sha-256
- [moment](https://momentjs.com/): es para recibir dias y fechas importantes
- [express](https://expressjs.com/): es para corerr servidores con node
- [multer](https://www.npmjs.com/package/multer): se encarga de manuliplar los middlewares

## Agradecimientos

Quiero expresar mi sincero agradecimiento a la escuela [Coderhouse](https://coderhouse.com.mx/) por proporcionar valiosa información y recursos que han contribuido en gran medida a mi aprendizaje en el campo de la programación backend. Este repositorio es el resultado de ese aprendizaje y de la oportunidad de poner en práctica lo que he aprendido.

Además, quiero invitar a cualquier persona interesada en este proyecto a contribuir y mejorar. Si tienes correcciones, sugerencias o mejoras, no dudes en realizar un pull request. Estoy dispuesto a revisar y fusionar las contribuciones de manera colaborativa para hacer de este repositorio una fuente de conocimiento más útil.

¡Gracias por tu interés y apoyo!
