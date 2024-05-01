import { existsSync, promises } from "fs";
import { v4 as uuidv4 } from "uuid";
import { ProductManager } from "../manager/product.manager.js";
const productManager = new ProductManager("./src/data/products.json");

export class ChartsManager {
  constructor(path) {
    this.path = path;
  }
  #generateId = () => {
    const newId = uuidv4();
    return newId;
  };
  #verifiyId = (id) => {
    if (!id) {
      throw new Error("Error: ID field can not be empty");
    }
  };
  #validateChart = async (id) => {
    //se va a usar para agregar productos al chart
    const charts = await this.getCharts();
    if (charts.length > 0) {
      const findId = charts.some((elem) => elem.code === code);
      if (findId) {
        throw new Error(
          `ERROR: failed to insert product code: ${code}. Code field can not be duplicated`
        );
      }
    }
    return true;
  };

  #saveCharts = async (charts) => {
    await promises.writeFile(this.path, JSON.stringify(charts));
  };

  getCharts = async () => {
    try {
      if (existsSync(this.path)) {
        const chartsFile = await promises.readFile(this.path, "utf8");
        const charts = JSON.parse(chartsFile);
        return charts;
      } else return [];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getChartById = async (id) => {
    try {
      this.#verifiyId(id);
      const charts = await this.getCharts();
      const chart = charts.find((element) => element.chartId === id);
      if (chart) return chart;

      throw new Error(`ERROR ID ${id} NOT FOUND. not valid chart Id`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  addChart = async () => {
    try {
      const charts = await this.getCharts();
      const newChart = { chartId: this.#generateId(), products: [] };

      charts.push(newChart);
      await this.#saveCharts(charts);
      return newChart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  addProduct = async (cid, pid) => {
    try {
      const charts = await this.getCharts();
      const chart = await this.getChartById(cid);
      if (!chart) res.status(400).json({ msj: "bad chart request" });
      const product = await productManager.getProductById(pid);
      if (!product) res.status(400).json({ msj: "bad product request" });
      const chartIndex = charts.findIndex((elem) => elem.chartId === cid);

      const productsInChart = charts[chartIndex].products;
      console.log(productsInChart);
      const existsProduct = productsInChart.some((elem) => elem.id === pid);

      if (!existsProduct) {
        productsInChart.push({ id: pid, quantity: 1 });
        //quede por aca, falta agregar el nuevo producto al carrito total y guardarlo.
        const newCharts = charts.slice;
      } else {
        const productIndex = productsInChart.find((elem) => elem.id === pid);

        const oldQuantity = charts[chartIndex].product[productIndex].quantity;
        const newQuantity =
          charts[chartIndex].product[productIndex].quantity + 1;

        console.log(oldQuantity, newQuantity);
      }
      await this.#saveCharts(charts);
      return chart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
