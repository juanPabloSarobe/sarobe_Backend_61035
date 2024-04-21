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
  #verifyField = (title, description, price, thumbnail, code, stock) => {
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
    if (!thumbnail || thumbnail.length === 0) {
      throw new Error("Falta la dirección de la imagen, no puede estar vacía");
    }
    if (!code || code.length === 0) {
      throw new Error("El campo código no puede estar vacío");
    }
    if (!stock || isNaN(stock) || stock <= 0) {
      throw new Error(
        "El campo stock no puede estar vacío, ni ser menor a cero, y debe ser un numero"
      );
    }
  };
  #verifiyId = (id) => {
    if (!id || isNaN(id) || id <= 0) {
      throw new Error(
        "El campo ID no puede estar vacío y debe ser un numero mayor a cero"
      );
    }
  };
  addProduct = (title, description, price, thumbnail, code, stock) => {
    this.#verifyField(title, description, price, thumbnail, code, stock);
    this.#validateCode(code);
    const product = {
      id: this.#generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
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
    const productForUpdate = this.getProductById(product.id);
    return console.log("update: ", productForUpdate);
  };
}

//------------------- TESTING

const productos = new ProductManager();
console.log(productos.getProducts());

productos.addProduct(
  "Notebook",
  "es una notebook",
  1000,
  "sin imagen",
  "nb1001",
  20
);
console.log(productos.getProducts());
productos.addProduct("Mac", "es una mac", 2500, "sin imagen", "nb1002", 30);
console.log(productos.getProducts());
productos.addProduct(
  "Notebook",
  "es una notebook",
  1000,
  "sin imagen",
  "nb1003",
  20
);
productos.addProduct(
  "Teclado",
  "es un teclado",
  0.1,
  "tecladoPath",
  "kb1001",
  5
);
console.log(productos.getProducts());
productos.getProductById(2);
productos.updateProduct({
  id: 3,
  title: "Notebook",
  description: "es una notebook",
  price: 1000,
  thumbnail: "sin imagen",
  code: "nb1003",
  stock: 25,
});
productos.getProductById(5);
