import db from "../config/db.js";

export const createProduct = async (name, price, quantity) => {
  const [result] = await db.execute(
    "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
    [name, price, quantity]
  );
  return result;
};

export const getAllProducts = async () => {
  const [rows] = await db.execute("SELECT * FROM products ORDER BY id DESC");
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

export const updateProduct = async (id, name, price, quantity) => {
  const [result] = await db.execute(
    "UPDATE products SET name=?, price=?, quantity=? WHERE id=?",
    [name, price, quantity, id]
  );
  return result;
};

export const deleteProduct = async (id) => {
  const [result] = await db.execute("DELETE FROM products WHERE id=?", [id]);
  return result;
};