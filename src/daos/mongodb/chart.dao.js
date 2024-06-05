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

  addProduct = async (id, productId, quantity) => {
    try {
      const { products } = await ChartModel.findById(id, { products: true });

      const productAdded = products.some(
        (element) => element.product.toString() === productId
      );
      if (!productAdded) {
        const addedProduct = await ChartModel.updateOne(
          { _id: id },
          { $push: { products: { product: productId, quantity: quantity } } },
          { new: true }
        );
        return addedProduct;
      } else {
        const addProduct = await ChartModel.updateOne(
          { _id: id, "products.product": productId },
          { $set: { "products.$.quantity": quantity } },
          { new: true }
        );
        return addProduct;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  addManyProduct = async (cid, products) => {
    const response = await ChartModel.findByIdAndUpdate(cid, products, {
      new: true,
    });
    return response;
  };

  delProduct = async (id, productId) => {
    try {
      const delProduct = await ChartModel.updateOne(
        {
          _id: id,
        },
        { $pull: { products: { product: productId } } }
      );

      if (!delProduct.modifiedCount) return;
      else return delProduct;
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
