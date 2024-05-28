import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
  getAll = async () => {
    try {
      return await ProductModel.find();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  getByCategory = async (category) => {
    try {
      return await ProductModel.find({ category: category });
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (product) => {
    try {
      return await ProductModel.create(product);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, product) => {
    try {
      return await ProductModel.findByIdAndUpdate(id, product, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  };
  delete = async (id) => {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
}
