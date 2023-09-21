## Instalamso MongoDb Local

al instalar mongo podemos correr el colamndo `mongo` o `mongosh` para conectarnos a la base de datos de mongo.

tambien podemos correr el comando `mongod` para conectarnos a la base de datos de mongo de la carpeta default

## Comandos de Mongo

- `show dbs` para ver las bases de datos
- `use <base_de_datos>` para seleccionar una base de datos
- `db.createCollection <nombre>` para dcrear colleciones
- `show collections` para ver las colecciones
- `db.collection.find()` para ver los documentos de una coleccion
- `insertOne` para agregar un objeto

## Actividad: Primeros pasos

Una Vez que corrobores que mongo estä instalado en computador, a partir del
cliente CLI, crear una base de datos de nombre "estudiantes"
Agregar 5 estudiantes diferentes con los campos "nombre", "apellido", "curso",
"correo". Puedes utilizar db.colIection.insertMany()
Una vez agregados, listar a los estudiantes de dicha colecciön y corroborar su
persistencia.
