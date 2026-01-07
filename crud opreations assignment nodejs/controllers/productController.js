import * as Product from "../models/productModel.js";

// helper: validate id
const isValidId = (id) => {
  const n = Number(id);
  return Number.isInteger(n) && n > 0;
};

export const create = async (req, res) => {
  try {
    let { name, price, quantity } = req.body;

    // validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is required (min 2 characters).",
      });
    }

    price = Number(price);
    quantity = Number(quantity);

    if (Number.isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number greater than 0.",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be an integer (0 or more).",
      });
    }

    const result = await Product.createProduct(name.trim(), price, quantity);

    return res.status(201).json({
      success: true,
      message: "✅ Product created successfully.",
      data: { id: result.insertId },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "❌ Failed to create product.",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    return res.status(200).json({
      success: true,
      message: "✅ Products fetched successfully.",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "❌ Failed to fetch products.",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const product = await Product.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "✅ Product fetched successfully.",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "❌ Failed to fetch product.",
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, price, quantity } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name is required (min 2 characters).",
      });
    }

    price = Number(price);
    quantity = Number(quantity);

    if (Number.isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid number greater than 0.",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be an integer (0 or more).",
      });
    }

    const result = await Product.updateProduct(id, name.trim(), price, quantity);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `✅ Product ${id} updated successfully.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "❌ Failed to update product.",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const result = await Product.deleteProduct(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found.`,
      });
    }

    // IMPORTANT: 200 si message loo helo (message box)
    return res.status(200).json({
      success: true,
      message: `✅ Product ${id} deleted successfully.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "❌ Failed to delete product.",
    });
  }
};