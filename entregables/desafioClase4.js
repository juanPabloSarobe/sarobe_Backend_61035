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

class ProductManager {
  constructor() {
    this.products = [];
  }

  #generateId = () => {
    let newId;
    if (!this.products.length) {
      newId = 1;
    } else {
      const lastObj = this.products.length - 1;
      newId = this.products[lastObj].id + 1;
    }
    return newId;
  };

  #validateCode = (code) => {
    if (this.products.length > 0) {
      const findCode = this.products.some((elem) => elem.code === code);
      if (findCode)
        throw new Error(
          `ERROR al agregar el productos código: ${code}. El campo código no puede repetirse`
        );
    }
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
  addProduct = (title, description, price, img, code, stock, category) => {
    this.#verifyField(title, description, price, img, code, stock, category);
    this.#validateCode(code);
    const product = {
      id: this.#generateId(),
      title,
      description,
      price,
      img,
      code,
      stock,
      category,
    };

    this.products.push(product);
  };

  getProducts = () => {
    return this.products;
  };
  getProductById = (id) => {
    this.#verifiyId(id);
    const product = this.products.find((element) => element.id === id);
    if (product) {
      return product;
    } else {
      throw new Error("ERROR ID NOT FOUND. El id ingresado no es un id valido");
    }
  };

  updateProduct = (product) => {
    // /traigo el producto completo por si product llega sin alguna de los elementos
    const productForUpdate = this.getProductById(product.id);

    if (productForUpdate) {
      const productIndex = this.products.findIndex(
        (element) => element.id === productForUpdate.id
      );
      const finalProduct = { ...productForUpdate, ...product };

      return this.products.splice(productIndex, 1, finalProduct);
    }
    throw new Error("ERROR. el producto no pudo ser actualizado");
  };
  deleteProduct = (id) => {
    this.#verifiyId(id);
    const productIndex = this.products.findIndex(
      (element) => element.id === id
    );
    return this.products.splice(productIndex, 1);
  };
}

//------------------- TESTING

const productos = new ProductManager();
console.log(productos.getProducts());

productos.addProduct(
  "Cerveza IPA",
  "Cerveza India Pale Ale, ligeramente amarga y aromática.",
  5.99,
  "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104302/descarga_schjmg.jpg",
  "cervezas1001",
  5,
  "Cervezas"
);
console.log(productos.getProducts());
productos.addProduct(
  "Vino Tinto Reserva",
  "Vino tinto reserva de alta calidad, cosecha 2015.",
  12.99,
  "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104434/CeYiCOGWSUuyzWD_JuDsOg_ytj20a.jpg",
  "vino1001",
  30,
  "Vinos"
);
productos.addProduct(
  "Whisky Escocés",
  "Whisky escocés de malta, suave y ahumado.",
  29.99,
  "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104567/Jack-Daniels-Master-Distiller-N4-550x550_qvvkp4.png",
  "licores1001",
  0,
  "Licores"
);
productos.addProduct(
  "Ron Añejo",
  "Ron añejo de 7",
  9.99,
  "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104541/ron-havana-club-7-anos_s9mxc4.png",
  "licores1002",
  25,
  "Licores"
);
console.log(productos.getProducts());
productos.getProductById(2);
productos.updateProduct({
  id: 3,
  stock: 25,
});
productos.updateProduct({
  id: 4,
  description: "Ron añejo de 7 años de barrica, ideal para cócteles.",
  price: 19.99,
  stock: 50,
});
console.log(productos.getProducts());
productos.deleteProduct(2);
productos.addProduct(
  "Ginebra Premium",
  "Ginebra premium con una mezcla de botánicos.",
  24.99,
  "https://res.cloudinary.com/dg8ndxl2y/image/upload/v1696104611/ventozelo-gin_tbmgg4.png",
  "licores1003",
  15,
  "Licores"
);
console.log(productos.getProducts());

productos.getProductById(6);
