import { ProductManager } from "./entregables/desafioClase6.js";

const productos = new ProductManager("./products.json");

const test = async () => {
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
};
test();
