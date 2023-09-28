# Notas

## Instalamos MongoDb Local

al instalar mongo podemos correr el colamndo `mongo` o `mongosh` para conectarnos a la base de datos de mongo.

tambien podemos correr el comando `mongod` para conectarnos a la base de datos de mongo de la carpeta default

## Comandos de Mongo

- `show dbs` para ver las bases de datos
- `use <base_de_datos>` para seleccionar una base de datos
- `db.createCollection <nombre>` para dcrear colleciones
- `show collections` para ver las colecciones
- `db.collection.find()` para ver los documentos de una coleccion
- `insertOne` para agregar un objeto
- `help`: Muestra una lista de comandos disponibles en la consola de MongoDB.
- `exit` o `quit`: Sale de la consola de MongoDB.
- `db.dropDatabase()`: Elimina la base de datos actual.
- `db.collection.insertOne(document)`: Inserta un documento en una colección específica.
- `db.collection.insertMany([document1, document2, ...])`: Inserta varios documentos en una colección.
- `db.collection.updateOne(filter, update)`: Actualiza un documento en una colección.
- `db.collection.updateMany(filter, update)`: Actualiza varios documentos en una colección.
- `db.collection.deleteOne(filter)`: Elimina un documento de una colección.
- `db.collection.findOne(filter)`: Encuentra un documento que coincida con el filtro especificado.
- `db.collection.find(filter)`: Encuentra varios documentos que coincidan con el filtro especificado.

## Actividad: Primeros pasos

Una Vez que corrobores que mongo estä instalado en computador, a partir del
cliente CLI, crear una base de datos de nombre "estudiantes"
Agregar 5 estudiantes diferentes con los campos "nombre", "apellido", "curso",
"correo". Puedes utilizar db.colIection.insertMany()
Una vez agregados, listar a los estudiantes de dicha colecciön y corroborar su
persistencia.

Aquí tienes una lista de comandos adicionales de MongoDB que podrían ser útiles, además de un conjunto de pasos paso a paso para llevar a cabo la actividad que mencionaste:

### Pasos para la actividad

1. **Verificar la instalación de MongoDB**:
   - Abre una terminal.
   - Ejecuta `mongo` o `mongosh` para abrir el cliente de MongoDB y asegurarte de que MongoDB esté instalado y funcionando correctamente.

2. **Crear una base de datos**:
   - Dentro del cliente de MongoDB, ejecuta el siguiente comando para crear una base de datos llamada "estudiantes":

     ```bash
     use estudiantes
     ```

3. **Agregar estudiantes**:
   - Utiliza el comando `db.collection.insertMany()` para agregar 5 estudiantes con los campos "nombre", "apellido", "curso" y "correo". Aquí tienes un ejemplo de cómo hacerlo:

     ```bash
     db.estudiantes.insertMany([
       {
         nombre: "Estudiante1",
         apellido: "Apellido1",
         curso: "Curso1",
         correo: "estudiante1@example.com"
       },
       {
         nombre: "Estudiante2",
         apellido: "Apellido2",
         curso: "Curso2",
         correo: "estudiante2@example.com"
       }
     ])
     ```

4. **Listar estudiantes**:
   - Para verificar que los estudiantes se han agregado correctamente, puedes usar el comando `db.collection.find()` para listar todos los estudiantes en la colección "estudiantes":

     ```bash
     db.estudiantes.find()
     ```

5. **Corroborar la persistencia**:
   - Observa la lista de estudiantes que se muestra en la salida. Deberías ver los 5 estudiantes que agregaste en el paso anterior. Esto confirma que los datos se han persistido en la base de datos "estudiantes".

```bash
estudiantes> db.estudiantes.find()
[
  {
    _id: ObjectId("650bab89e0e7a076399c30e9"),
    nombre: 'Miguel',
    apellido: 'Chavez',
    curso: 'Backend',
    correo: 'toonchavez@gmail.com'
  },
  {
    _id: ObjectId("650badc8e0e7a076399c30ea"),
    name: 'user01',
    apellido: 'lastname',
    curso: 'ch01',
    correo: 'user01@gmail.com'
  },
  {
    _id: ObjectId("650badc8e0e7a076399c30eb"),
    name: 'user02',
    apellido: 'lastname',
    curso: 'ch01',
    correo: 'user01@gmail.com'
  },
  {
    _id: ObjectId("650badc8e0e7a076399c30ec"),
    name: 'user03',
    apellido: 'lastname',
    curso: 'ch01',
    correo: 'user03@gmail.com'
  },
  {
    _id: ObjectId("650badc8e0e7a076399c30ed"),
    name: 'user05',
    apellido: 'lastname',
    curso: 'ch01',
    correo: 'user04@gmail.com'
  }
]
```
