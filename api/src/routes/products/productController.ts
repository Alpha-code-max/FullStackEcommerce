import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductInputSchema, ProductInputType } from "../../../prisma/generated/schemas/variants/input/Product.input";



const prisma = new PrismaClient();

// ==============================
// Get all products
// ==============================
const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ message: "The list of products is here", products });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// ==============================
// Post a new product
// ==============================
const postProducts = async (req: Request, res: Response) => {
  try {
    const data: ProductInputType = ProductInputSchema.parse(req.body);

    if (data.price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    const product = await prisma.product.create({ data });

    res.json({ message: "Product created successfully", product });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        message: "Invalid product data provided",
        details: error.errors.map((err: any) => ({
          field: err.path.join('.'),
          error: err.message
        }))
      });

    }
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// ==============================
// Get a single product by ID
// ==============================
const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (product) {
      res.json({ message: "Product found", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// ==============================
// Patch (partial update) product
// ==============================
const patchProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: req.body,
    });

    res.json({ message: `Product with id ${productId} updated`, product });
  } catch (error: any) {
    res.status(404).json({ message: "Product not found", error: error.message });
  }
};

// ==============================
// Put (full update) product
// ==============================
const putProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const data: ProductInputType = ProductInputSchema.parse(req.body);

    const product = await prisma.product.update({
      where: { id: productId },
      data,
    });

    res.json({ message: `Product with id ${productId} updated`, product });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ 
        message: "Invalid product data provided",
        details: error.errors.map((err: any) => ({
          field: err.path.join('.'),
          error: err.message
        }))
      });
    }
    res.status(404).json({ message: "Product not found", error: error.message });
  }
};

// ==============================
// Delete product
// ==============================
const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await prisma.product.delete({ where: { id: productId } });

    res.json({ message: `Product with id ${productId} deleted`, product });
  } catch (error: any) {
    res.status(404).json({ message: "Product not found", error: error.message });
  }
};

export {
  getProducts,
  postProducts,
  getProduct,
  patchProduct,
  putProduct,
  deleteProduct,
};
