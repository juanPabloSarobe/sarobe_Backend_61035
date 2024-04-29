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
