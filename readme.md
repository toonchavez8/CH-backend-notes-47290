# Programación Backend

## Index

- [Clase - 00: Principios de Backend](#clase-0-principios-de-programación-backend)
- [Clase - 01: Principios de JS](#clase-01-principios-de-js)

## Como usar este repo

iniciamos despues de descargar con `npm i` para instalar dependencias

Puedes correr el código dependiendo de la carpeta utilizando la siguiente estructura: `node clase-[X]/[elarchivo que quieres correr].js.` En cada sección, proporcionaré la ruta de cómo ejecutarlo.

Asegúrate de reemplazar` [X] `con el número de clase correspondiente y `[elarchivo que quieres correr]` con el nombre del archivo que deseas ejecutar.

### Archivos importantes

- `index.js` - Archivo principal que corre todo

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

#### Ejercicio: showList

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

las pruebas de las funciones anteriores se encuentran en dentro del mismo archivo.

```js
// Pruebas
showList(["a", "b", "c"]);
showList(null);
showList([]);
```

podemos probar el codigo corriengo desde la carpeta raiz `node clase-1/showList.js` y veremos como funciona.
