import { ChartModel } from "./models/chart.model.js";

export default class ChartDaoMongoDB {
  getAll = async () => {
    try {
      return await ChartModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await ChartModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (chart) => {
    try {
      return await ChartModel.create(chart);
    } catch (error) {
      throw new Error(error);
    }
  };

  addProduct = async (id, productId) => {
    try {
      const { products } = await ChartModel.findById(id, { products: true });
      const productAdded = products.some((element) => element.id === productId);
      if (!productAdded) {
        const addedProduct = await ChartModel.updateOne(
          { _id: id },
          { $push: { products: { id: productId, quantity: 1 } } },
          { new: true }
        );
        return addedProduct;
      } else {
        const product = products.find((element) => element.id === productId);
        const newQuantity = product.quantity + 1;
        const addProduct = await ChartModel.updateOne(
          { _id: id, "products.id": productId },
          { $set: { "products.$.quantity": newQuantity } },
          {
            new: true,
          }
        );
        return addProduct;
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await ChartModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
