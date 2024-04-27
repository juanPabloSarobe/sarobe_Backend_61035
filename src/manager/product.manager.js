import { existsSync, promises } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #generateId = async () => {
    const newId = uuidv4();
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
    if (!id) {
      throw new Error("El campo ID no puede estar vacío ");
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
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  getProducts = async () => {
    try {
      if (existsSync(this.path)) {
        const productsFile = await promises.readFile(this.path, "utf8");
        const products = JSON.parse(productsFile);
        return products;
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (id) => {
    try {
      this.#verifiyId(id);
      const products = await this.getProducts();
      const product = products.find((element) => element.id === id);
      if (product) {
        return product;
      } else {
        //Pregunta como interceptar esta error desde el server.js
        /* throw new Error(
          `ERROR ID NOT FOUND. El id ${id} ingresado no es un id valido`
        ); */
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (product) => {
    // /traigo el producto completo por si product llega sin alguna de los elemento

    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (id) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
}
