/*  OBSERVACIONES IMPORTANTES:
    En los cursos de react (https://react-47225.vercel.app/)(https://github.com/juanPabloSarobe/react-47225)
    y react native (https://github.com/juanPabloSarobe/LiquidStoreApp?tab=readme-ov-file)
    cree una tienda de venta de bebidas. Ambos proyectos utilizan de base los 
    mismos tipos de productos. Por lo cual construiré mi proyecto backend pensando en luego ser consumidos por los 
    proyectos anteriores.

    IMPORTANTE: para utilizar los mismos quizás deba cambiar el nombre de algún elemento, no obstante no se realizaran tareas
    de menos, al contrario se agregarán los elementos extras que sean necesarios.
    Cambios: Se agrega clase category y se cambian los productos del desafío 2. 
    La categoría thumbnail pasa a llamarse img, dado que todos los proyectos anteriores manejan ese nombre.
    Se implementan los productos que vengo utilizando en las clases de react y react Native, 
    con el objetivo de integrar todos los proyectos al final del curso.
 */

import { existsSync, promises } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #generateId = async () => {
    let newId;
    const products = await this.getProducts();
    if (!products.length) {
      newId = 1;
    } else {
      const lastObj = products.length - 1;
      newId = products[lastObj].id + 1;
    }
    return newId;
  };

  #validateCode = async (code) => {
    const products = await this.getProducts();
    if (products.length > 0) {
      const findCode = products.some((elem) => elem.code === code);
      if (findCode) {
        /* se comenta el codigo que detiene la ejecucion para cambiarlo por un console log y que se
            ejecuten los test
        throw new Error(
          `ERROR al agregar el productos código: ${code}. El campo código no puede repetirse`
        ); */
        console.log(
          `ERROR al agregar el productos código: ${code}. El campo código no puede repetirse`
        );
        return false;
      }
    }
    return true;
  };
  #verifyField = (title, description, price, img, code, stock, category) => {
    if (!title || title.length === 0) {
      throw new Error("El campo titulo no puede estar vacío");
    }
    if (!description || description.length === 0) {
      throw new Error("El campo descripción no puede estar vacío");
    }
    if (!price || isNaN(price) || price < 0) {
      throw new Error(
        "El campo precio no puede estar vacío, ni ser menor o igual a cero, y debe ser un numero"
      );
    }
    if (!img || img.length === 0) {
      throw new Error("Falta la dirección de la imagen, no puede estar vacía");
    }
    if (!code || code.length === 0) {
      throw new Error("El campo código no puede estar vacío");
    }
    if (isNaN(stock) || stock < 0) {
      throw new Error(
        "El campo stock no puede estar vacío, ni ser menor a cero, y debe ser un numero"
      );
    }
    if (!category || category.length === 0) {
      throw new Error("El campo category no puede estar vacío");
    }
  };
  #verifiyId = (id) => {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error(
        "El campo ID no puede estar vacío y debe ser un numero mayor a cero"
      );
    }
  };
  #saveFile = async (products) => {
    await promises.writeFile(this.path, JSON.stringify(products));
  };
  addProduct = async (
    title,
    description,
    price,
    img,
    code,
    stock,
    category
  ) => {
    const products = await this.getProducts();
    this.#verifyField(title, description, price, img, code, stock, category);
    const validCode = await this.#validateCode(code);
    if (validCode) {
      const product = {
        id: await this.#generateId(),
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
      };

      products.push(product);
      return await this.#saveFile(products);
    }
  };

  getProducts = async () => {
    if (existsSync(this.path)) {
      const productsFile = await promises.readFile(this.path, "utf8");
      const products = JSON.parse(productsFile);
      return products;
    } else return [];
  };

  getProductById = async (id) => {
    this.#verifiyId(id);
    const products = await this.getProducts();
    const product = products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      throw new Error(
        `ERROR ID NOT FOUND. El id ${id} ingresado no es un id valido`
      );
    }
  };

  updateProduct = async (product) => {
    // /traigo el producto completo por si product llega sin alguna de los elementos
    const products = await this.getProducts();
    const productForUpdate = await this.getProductById(product.id);

    if (productForUpdate) {
      const productIndex = products.findIndex(
        (element) => element.id === productForUpdate.id
      );
      const finalProduct = { ...productForUpdate, ...product };
      products.splice(productIndex, 1, finalProduct);

      return await this.#saveFile(products);
    }
    throw new Error("ERROR. el producto no pudo ser actualizado");
  };
  deleteProduct = async (id) => {
    this.#verifiyId(id);
    this.getProductById(id);
    const products = await this.getProducts();
    const productForDelete = products.find((element) => element.id === id);
    const productIndex = products.findIndex((element) => element.id === id);
    products.splice(productIndex, 1);

    console.log(
      `El producto ${productForDelete.title} fue eliminado correctamente`
    );
    return this.#saveFile(products);
  };
}

//------------------- TESTING

const productos = new ProductManager("./products.json");

(async () => {
  console.log(await productos.getProducts());

  await productos.addProduct(
    "Cerveza IPA",
    "Cerveza India Pale Ale, ligeramente amarga y aromática.",
    5.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104302/descarga_schjmg.jpg",
    "cervezas1001",
    5,
    "Cervezas"
  );
  console.log(await productos.getProducts());
  await productos.addProduct(
    "Vino Tinto Reserva",
    "Vino tinto reserva de alta calidad, cosecha 2015.",
    12.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104434/CeYiCOGWSUuyzWD_JuDsOg_ytj20a.jpg",
    "vino1001",
    30,
    "Vinos"
  );
  await productos.addProduct(
    "Whisky Escocés",
    "Whisky escocés de malta, suave y ahumado.",
    29.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104567/Jack-Daniels-Master-Distiller-N4-550x550_qvvkp4.png",
    "licores1001",
    0,
    "Licores"
  );
  await productos.addProduct(
    "Ron Añejo",
    "Ron añejo de 7",
    9.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104541/ron-havana-club-7-anos_s9mxc4.png",
    "licores1002",
    25,
    "Licores"
  );
  console.log(await productos.getProductById(3));
  await productos.updateProduct({
    id: 3,
    stock: 99,
  });
  await productos.updateProduct({
    id: 4,
    description: "Ron añejo de 7 años de barrica, ideal para cócteles.",
    price: 19.99,
    stock: 50,
  });
  console.log(await productos.getProducts());
  await productos.deleteProduct(6);
  //await productos.deleteProduct(6);
  await productos.addProduct(
    "Ginebra Premium",
    "Ginebra premium con una mezcla de botánicos.",
    24.99,
    "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104611/ventozelo-gin_tbmgg4.png",
    "licores1003",
    15,
    "Licores"
  );
  console.log(await productos.getProducts());
  //console.log(await productos.getProductById(7));
})();
