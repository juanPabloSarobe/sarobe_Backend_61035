# Curso Backend comisión 61035 - SAROBE JUAN PABLO 2024

Repo curso backend comisión 61035

## Desafío clase 2

Se crea una clase ProductManager, para que gestiones un conjunto de productos.
Se validan todos los input, en caso de error se detiene el código.
Se valida que el code no este repetido.
Se generan 3 métodos:

1.  addProduct: que se encarga de validar las entradas y agregar productos generando un nuevo id auto incremental
2.  getProducts: que trae todos los productos
3.  getElementById: valida que el id sea valido, y busca en la lista de productos, si encuentra una ocurrencia devuelve el producto completo, caso contrario devuelve un error de búsqueda por consola.

Se crean métodos privados para validación de datos.
<br/>
<br/>
Por ultimo se ejecutan los test de funcionamiento.
<br/>
<br/>

## Desafío clase 4

OBSERVACIONES IMPORTANTES:
En los cursos de react (https://react-47225.vercel.app/)(https://github.com/juanPabloSarobe/react-47225) y react native (https://github.com/juanPabloSarobe/LiquidStoreApp?tab=readme-ov-file) cree una tienda de venta de bebidas. Ambos proyectos utilizan de base los mismos tipos de productos. Por lo cual construiré mi proyecto backend pensando en luego ser consumidos por los proyectos anteriores.

IMPORTANTE: para utilizar los mismos quizás deba cambiar el nombre de algún elemento, no obstante no se realizaran tareas de menos, al contrario se agregarán los elementos extras que sean necesarios.
Cambios: Se agrega clase category y se cambian los productos del desafío 2.
La categoría thumbnail pasa a llamarse img, dado que todos los proyectos anteriores manejan ese nombre.
Se implementan los productos que vengo utilizando en las clases de react y react Native, con el objetivo de integrar todos los proyectos al final del curso.

Se crean 3 nuevos métodos:

1. Método updateProduct: recibe un elemento con los datos del producto, donde el único dato obligatorio es el id, y actualiza el objeto dentro del array.
2. Método deleteProduct: verifica el id recibido y si lo encuentra elimina el producto del array o arroja error
3. Método privado saveFile: guarda el archivo con los nuevos datos del array.

Se implementa persistencia de datos mediante manejador de archivos File System de node.
Se crea un archivo products.json donde se van agregando, modificando o eliminando los productos de nuestro e-commerce.
<br/>
Se refactorizan todos los métodos anteriores para que sean asíncronos
<br/>
<br/>
Por último se ejecutan los test de funcionamiento en una función anónima auto-ejecutable.
<br/>
<br/>

## Desafío clase 6

Se crea el servidor con Express, se configura el package.json, y se instalan la librería uuidv4, asi como nodemon para desarrollo.
Se refactorizan las carpetas del proyecto para que se ajuste a la rubrica.

Se crean los siguientes endpoints:

1. **GET /products** Muestra todos los products. puede recibir 2 parámetros por query, title y limit, si recibe title filtra por cualquier parte del titulo del producto, si recibe limit filtra la cantidad de productos igual al limite, si recibe los 2, primero filtra por titulo y al resultado lo filtra por limite.

2. **GET /products/pid** recibe un id de producto por req.params, en caso de que sea valido revuelve el producto. en caso de que no corresponda devuelve error.

3. **GET /productsbycategory/:category** recibe una categoría de producto y devuelve los elementos que coincidan con la misma. en caso de que la categoría sea incorrecta devuelve error.

4. **POST /products** recibe por body un objeto con los detalles del producto. realiza todas las validaciones de los datos y en caso que sean correctos inserta el producto nuevo. en caso de faltar un dato, devuelve error, en caso de que el code este duplicado devuelve error.

5. **PUT /products** en este elemento se modifico lo solicitado por la rubrica y no recibe el id del producto por params sino que recibe un objeto con el id y el o los elementos del producto a modificar. realiza todas las validaciones y en caso de ser correctas realiza el cambio en el producto sin eliminarlo. en caso de que las validaciones sean incorrectas devuelve error.

6. **DELETE /products/:pid** recibe por params el id del producto a eliminar, en caso de ser un producto valido lo elimina, en caso contrario devuelve error.

<br/>
<br/>
Por último se ejecutan los test de funcionamiento desde postman. Se adjunta link a la documentación de la api: https://documenter.getpostman.com/view/11511543/2sA3BuW9A1
<br/>
<br/>

## Preentrega 1

Se actualiza el servidor express con los siguientes con los siguientes componentes.
En la carpeta manager se crea un nuevo archivo charts.manager.js para manejar la lógica del carrito. Se implementan los distintos endpoints mediante router en el archivo charts.router.js. y se crea un nuevo archivo de persistencia de datos con file system en la carpeta data con nombre charts.json
Se actualizo los products.json asi como los métodos para que cada producto ahora reciba el campo status siempre en verdadero. al igual que la entrega anterior el campo thumbnails se renombró como img.
Se edito el endpoint **POST /products** ahora exige que el path de thumbnail (img, en este caso) sea un array o que este vacío, ya no permite strings.

Se crearon los siguientes endpoints

1. **POST "/"** Agrega un item a la lista de carritos, el cual contiene un chartId y un elemento products el cual contendrá todos los productos del carrito, el mismo se inicializa vacío. El body se entrega vacío

2. **GET "/"** trae todos los datos del carrito.
3. **GET "/:cid"** trae los datos del carrito en función del id del mismo. en caso de no existir el id proporcionado devuelve un error.
4. **POST "/:cid/products:pid"** endpoint que agrega productos al carrito. primero recibe un ID de carrito y un ID de producto y evalúa que ambos existan. si alguno de los 2 no existiera o no fuera correcto devuelve error. En caso de recibir un Id de carrito y del producto validos, primero verifica si el producto ya existe dentro del carrito en cuyo caso suma uno a la cantidad, en caso de no existir agrega el id del producto al carrito y la cantidad en 1.
   <br/>
   <br/>
   Por último se ejecutan los test de funcionamiento desde postman. Se verificó que el proyecto corre con npm start. Se adjunta link a la documentación de la api:  
   <br/>
   **Product Manager API** https://documenter.getpostman.com/view/11511543/2sA3BuW9A1
   <br/>
   **Chart Manager API** https://documenter.getpostman.com/view/11511543/2sA3JJ8NeR
   <br/>
   <br/>

## Desafío clase 10

Se configura el servidor para implementar el motor de plantillas Handlebars y websocket

Se crea y configura la plantilla Home, la cual contiene un acceso al header, recibe un array con la lista de productos, y las recorre dentro de handlebars mostrando cada uno de los productos con un each.
Se crea y configura las plantilla realTimeProducts, la cual contiene un acceso al header y solo tiene un DIV para luego recibir su innerHTML desde el archivo javascript index.js, el cual recibe desde el servidor un array con los products, y dibuja en tiempo real el contenido del HTML a medida que la lista de productos cambia.

Se crean los siguientes endpoints:

1. **GET /vistas/home** Muestra todos los productos en un HTML con una plantilla de handlebars.

2. **GET /vistas/realtimeproducts** Utiliza websocket, para mostrar un HTML con la lista de productos en tiempo real. Se realizan pruebas eliminando, modificando y agregando productos desde postman, y los mismos se ven en tiempo real.
   <br/>

[![VideoLink]][LinkVideo]

[LinkVideo]: https://res.cloudinary.com/dg8ndxl2y/video/upload/v1715571364/testingWebsocket_jmnwxg.mp4 "Testing Websocket."
[VideoLink]: https://img.shields.io/badge/DEMO_Video-F17105?style=for-the-badge&logoColor=white&logo=youtube

<br/>
Por último se ejecutan los test de funcionamiento desde postman. 
<br/>
<br/>

## Desafío clase 15

Se configura el servidor para implementar base de datos mongoDB, con conexión a mongo Atlas.
Se añade persistencia de datos tanto de los productos, como de los carritos, y de los mensajes de chat.
Se configura un chat con Handlebars y websocket con persistencia en mongo Atlas.
Se crea el sistema de carpetas DAO, con los modelos de esquemas para Mongo, los servicios correspondientes que servirían para redireccionar a otro sistema de persistencia de datos de ser necesario, los controllers que efectivamente controlan los datos de ingreso e invocan las consultas a la DB mediante el servicio, y por ultimo estos son llamados desde las rutas o endpoints.

Se creo al archivo de Handlebars para el chat, utilizando la carpeta public para el diseño de los estilos y para alojar los archivos js que manipulan el websocket. Se creo el archivo chat.js el cual contiene el código para el chat, asi como también se edito el Modal de SweetAlert para que solo se puedan introducir emails y no permita cerrarse sin el dato con el fin de evitar usuarios null en la DB.

Se actualizan los siguientes endpoints:

1. **GET /vistas/home** Muestra todos los productos en un HTML con una plantilla de handlebars. la información se toma desde mongo, para lo cual se tuvo que implementar la función .lean() en la consulta para que sea compatible

2. **GET /vistas/realtimeproducts** Utiliza websocket, para mostrar un HTML con la lista de productos en tiempo real. Nuevamente implementando la función .lean(). En este caso, al realizar los cambio desde postman en mongo, no se actualiza automáticamente la lista, ya que no hay un disparador que vuelva a dibujar los elementos, por lo cual se agrego un botón de actualizar que simularía la acción de aceptar una modificación de un producto desde el front, para llamar nuevamente al .emit que vuelve a cargar los datos.

3. **Todos los endpoints anteriores** Se modificaron todos los end points ya creados anteriormente para utilizar el el controller y tomar los datos desde mongo.
   <br/>

Se crearon los siguientes endpoints:

1. **DELETE /charts/:cid** se creo el endpoint para eliminar un carrito completo.

1. **GET /chats/** endpoint que dispara el handlebars del chat

<br/>
Por último se ejecutan los test de funcionamiento desde postman y del chat desde el explorador. 
<br/>
Se envía el archivo de variables de entorno de forma privada.
<br/>
<br/>

## Segunda Pre-entrega Proyecto final (clase 17)

Se configura el servidor para implementar base de datos mongoDB, con conexión a mongo Atlas.
se modifican los models para implementar la population. También se implementa pagination.
El GET de productos ahora permite un titulo, un limite, una pagina y un orden y se implementa en la pagination. asi como también la estructura para poder avanzar y retroceder paginas.
se implementa el endpoint para buscar por categorías, también con pagination.
Para el carrito se implementan todos los endpoint solicitados, asi como uno extra que elimina por completo el carrito.
Se implementa la population de los productos dentro del carrito.

Se implementa la view/products, el cual recibe title, page, limit y order y muestra los productos en función de dichos filtros asi como también los botones prev y next para moverse entre las paginas.

Se actualizan los siguientes endpoints:

1. **GET /vistas/products** Muestra todos los productos en un HTML con una plantilla de handlebars. la información se toma desde mongo, utilizando paginate. Como no es compatible con el método .lean() se reestructura la info a manualmente, y se agregan los botones PREV y NEXT para moverse entre las paginas.

2. **GET /products** ahora recibe title, limit, page y sort, para realizar la pagination del mismo.

3. **GET /products/cat** endpoint que puede filtrar por categoría y por precio, ademas de paginar.

4. **DELETE /charts/:cid** el endpoint vacía el carrito.

5. **Resto de Endpoints del carrito** se modifican todos los endpoint del carrito en función de la consigna. se agrega el método populate tanto en middleware como directo en la función findById
   <br/>

Se crearon los siguientes endpoints:

1. **DELETE /charts/cleanCart/:cid** se creo el endpoint para eliminar un carrito completo.

<br/>
Por último se ejecutan los test de funcionamiento desde postman y del chat desde el explorador. 
<br/>
Se envía el archivo de variables de entorno de forma privada.
<br/>
<br/>

## Desafío clase 19

Se configuran las vistas para que se inicie en la login. se crean las siguientes Vistas:

1. **vistas/login** recibe un mail y un password y lo verifica en la base de datos a ver si ya esta cargado. en caso de estar repetido se muestra en la misma pantalla de login. También posee un link para redireccionar al register
2. **vistas/register** recibe los datos indicados en el desafío. También posee un link para redireccionar al login.

`Observaciones:` tanto el login como el register, tienen un middleware que no permite acceder a ellos en caso que ya haya una sesión abierta.

Al registrarse correctamente, se redirecciona al login, el register valida que los campos requeridos no estén vacíos, asi como también se verifica en base de datos que el mail no este duplicado y se muestra la advertencia por pantalla.

Luego de login correcto, se redirecciona a la pantalla productos, donde se muestra la bienvenida al usuario indicando nombre, apellido y rol.

3. **vistas/profile** vista que muestra el perfil del usuario logueado. esta tiene un middleware que no permite acceder si no se esta logueado.

En el navbar hay un link al perfil del usuario, desde donde se puede acceder al perfil del usuario, y desde allí también se puede cerrar la sesión o volver a los productos.

En el word que indica como se realizará la corrección, indica en el ultimo renglón:

> Se ingresarán las credenciales específicas de admin indicadas en las diapositivas, el login debe redirigir correctamente y mostrar en los datos del rol: “admin” haciendo referencia a la correcta gestión de roles.

> Se revisará que el admin NO viva en base de datos, sino que sea una validación que se haga de manera interna en el código.

Dado que el profesor en clase cargó el usuario en la DB como admin directamente, no supe como interpretar correctamente este apartado, por lo que lo tome literal y si bien se carga el usuario adminCoder, el rol ADMIN no se carga en la DB, sino que se hace luego una validación en el código.

En la vista productos, se muestran los productos con pagination implementada, asi como los botones para su navegación
<br/>

Se crearon los siguientes endpoints:

1. **POST user/login** verifica que el usuario este creado en la DB y devuelve los datos en aso correcto
2. **POST user/register** crea el usuario en la DB.
3. **GET user/info** devuelve los datos de la sesión.
4. **GET user/logout** destruye la sesión activa y vuelve a la vista login.

<br/>
Por último se ejecutan los test de funcionamiento desde postman y desde el explorador. 
<br/>
Se envía el archivo de variables de entorno de forma privada.
<br/>
<br/>

## Desafío clase 21

Se configuran las vistas par que se pueda acceder desde un botón utilizando la autenticación de Github:

Se implenta bcrypt correctamente, se implementa passport tanto en login como en register.

Se crean las estrategias de passport tanto para local como para github.

Se modifican los endpoints necesarios para el funcionamiento de passport:

1. **POST user/login** se implementa el middleware de passport.
2. **POST user/register** se implementa el middleware de passport.
3. **GET user/register-github** se implementa el middleware de passport.
4. **GET user/profile** se implementa el middleware de passport.

<br/>
Por último se ejecutan los test de funcionamiento desde postman y desde el explorador. 
<br/>
Se envía el archivo de variables de entorno de forma privada.
<br/>
<br/>

## Desafío clase 24

Se decide utilizar como sistema de login session con passport

Se modifica el user Model para que pueda recibir por body un id de cart. El mismo hace referencia a la colección charts.
Se implementa también populate, para luego traer en la respuesta el contenido completo del carrito de ese usuario.

Se crean y modifican los siguientes endpoints.

1. **GET user/current** Si esta logueado devuelve los datos de la session y del usuario y el user de passport. Si no esta logueado solo devuelve los datos de session.
2. **GET vistas/profile** Se modifico la vista profile para que al traer un usuario con carrito, nos traiga también el detalle del carrito, el subtotal por producto y el total general.

<br/>
Por último se ejecutan los test de funcionamiento desde postman y desde el explorador.
<br/>
Se envía el archivo de variables de entorno de forma privada.
<br/>
<br/>
