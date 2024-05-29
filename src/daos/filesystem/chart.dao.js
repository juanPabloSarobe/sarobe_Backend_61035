import { existsSync, promises } from "fs";
import { v4 as uuidv4 } from "uuid";
import { ProductDaoFS } from "../filesystem/product.dao.js";
const productManager = new ProductDaoFS("./src/data/products.json");

export class ChartDaoFS {
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
    const charts = await this.getAll();
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

  getAll = async () => {
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

  getById = async (id) => {
    try {
      this.#verifiyId(id);
      const charts = await this.getAll();
      const chart = charts.find((element) => element.chartId === id);
      if (chart) return chart;

      throw new Error(`ERROR ID ${id} NOT FOUND. not valid chart Id`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  create = async () => {
    try {
      const charts = await this.getAll();
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
      let charts = await this.getAll();
      const chart = await this.getById(cid);

      const product = await productManager.getById(pid);

      const chartIndex = charts.findIndex((elem) => elem.chartId === cid);

      const productsInChart = charts[chartIndex].products;
      const existsProduct = productsInChart.some((elem) => elem.id === pid);

      if (!existsProduct) {
        productsInChart.push({ id: pid, quantity: 1 });
      } else {
        const productIndex = productsInChart.findIndex(
          (elem) => elem.id === pid
        );

        charts[chartIndex].products[productIndex].quantity += 1;
      }
      await this.#saveCharts(charts);
      return productsInChart;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
