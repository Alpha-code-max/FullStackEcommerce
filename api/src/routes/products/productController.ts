import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ProductSchema, ProductType, ProductInputSchema, ProductInputType } from "../../schema/product.schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

interface ProductResponse {
  message: string;
  product?: any;
  products?: any[];
  error?: string;
  details?: string;
}

// ==============================
// Get all products
// ==============================
const getProducts = async (req: Request, res: Response<ProductResponse>) => {
  try {
    const products = await prisma.product.findMany();
    res.json({ message: "The list of products is here", products });
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// ==============================
// Post a new product
// ==============================
const postProducts = async (req: Request, res: Response<ProductResponse>) => {
  try {
    // ✅ Validate only input fields from client
    const data = ProductInputSchema.parse(req.body);

    // ✅ Ensure user is logged in via session
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized: missing userId" });
    }

    // ✅ Add userId from session
    data.userId = String(req.session.user.id);

    if (data.price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    console.log("Session user:", req.session.user);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        stock: data.stock ?? 0,
        userId: data.userId, // ✅ fixed
      },
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid product data",
        error: error.message, // return full details instead of just string
      });
    }
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ==============================
// Get a single product by ID
// ==============================
const getProduct = async (req: Request, res: Response<ProductResponse>) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product found", product });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// ==============================
// Patch (partial update) product
// ==============================
const patchProduct = async (req: Request, res: Response<ProductResponse>) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ message: `Product with id ${req.params.id} updated`, product });
  } catch (error: any) {
    res.status(404).json({ message: "Product not found", error: error.message });
  }
};

// ==============================
// Put (full update) product
// ==============================
const putProduct = async (req: Request, res: Response<ProductResponse>) => {
  try {
    const data: ProductType = ProductSchema.parse(req.body);
    
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name: data.name,
        price: data.price,
        categoryId: data.categoryId ?? null,
        image: data.image,
        description: data.description,
        stock: data.stock ?? 0,
        userId: data.userId,
      },
    });

    res.json({ message: `Product with id ${req.params.id} updated`, product });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Invalid product data provided",
        details: error.message
      });
    }
    res.status(404).json({ message: "Product not found", error: error.message });
  }
};

// ==============================
// Delete product
// ==============================
const deleteProduct = async (req: Request, res: Response<ProductResponse>) => {
  try {
    const product = await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.json({ message: `Product with id ${req.params.id} deleted`, product });
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
