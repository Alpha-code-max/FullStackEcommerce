import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { OrderSchema, OrderType } from "../../schema/order.schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

// ==============================
// Get all orders
// ==============================
const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
    })
    res.json({ message: "The list of orders is here", orders });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// ==============================
// Get orders for authenticated user
// ==============================
const getUserOrders = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - comes from auth middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User authentication required" });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ message: "User orders retrieved successfully", orders });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

// ==============================
// Post a new order
// ==============================
const postOrder = async (req: Request, res: Response) => {
  try {
    // Validate input against schema
    const data: OrderType = OrderSchema.parse(req.body);

    // Attach userId if available (don't pass undefined)
    // @ts-ignore - comes from auth middleware
     if (req.userId) {
      data.userId = req.userId; 
    }

    // Business rule validation
    if (!data.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!data.items || data.items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    if (data.total <= 0) {
      return res.status(400).json({ message: "Order total must be greater than 0" });
    }

    // Create order with items
 const order = await prisma.order.create({
  data: {
    userId: data.userId, // keep as string (ObjectId)
    status: data.status || 'PENDING',
    total: data.total,
    items: {
      create: data.items.map((item) => ({
        productId: item.productId, // ObjectId string
        price: item.price,
        quantity: item.quantity,
      })),
    },
  },
  include: {
    user: true,
    items: {
      include: {
        product: true, // 👈 so you still get product details
      },
    },
  },
});


    return res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (error: unknown) {
    // Handle schema validation errors
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Invalid order data",
        details: error.name
      });
    }

    // Log unexpected errors for debugging
    console.error("Create order error:", error);

    // Generic fallback
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ==============================
// Get a single order by ID
// ==============================
const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const order = await prisma.order.findUnique({ 
      where: { id: orderId },
      include: {
        user: true,
        items: true,
      },
    });

    if (order) {
      res.json({ message: "Order found", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// ==============================
// Patch (partial update) order
// ==============================
const patchOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    // Don't allow updating userId or createdAt through patch
    const { userId, createdAt, ...updateData } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: true,
        items: true,
      },
    });

    res.json({ message: `Order with id ${orderId} updated`, order });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// ==============================
// Put (full update) order
// ==============================
const putOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    const data: OrderType = OrderSchema.parse(req.body);

    // Check if order exists first
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Business rule validation
    if (data.total <= 0) {
      return res.status(400).json({ message: "Order total must be greater than 0" });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: data.status,
        total: data.total,
        // Note: For items, you might want to handle this separately
        // as updating nested relations can be complex
      },
      include: {
        user: true,
        items: true,
      },
    });

    res.json({ message: `Order with id ${orderId} updated`, order });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Invalid order data provided",
        details: error.name,
      });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// ==============================
// Update order status
// ==============================
const updateOrderStatus = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Validate status is provided
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        user: true,
        items: true,
      },
    });

    res.json({ message: `Order status updated to ${status}`, order });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).json({ message: "Error updating order status", error: error.message });
  }
};

// ==============================
// Delete order
// ==============================
const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  try {
    // First delete related order items
    await prisma.orderItem.deleteMany({
      where: { orderId },
    });

    // Then delete the order
    const order = await prisma.order.delete({ 
      where: { id: orderId },
    });

    res.json({ message: `Order with id ${orderId} deleted`, order });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

// ==============================
// Get orders by status
// ==============================
const getOrdersByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { status: status as any },
      include: {
        user: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ 
      message: `Orders with status ${status}`, 
      count: orders.length,
      orders 
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching orders by status", error: error.message });
  }
};

export {
  getOrders,
  getUserOrders,
  postOrder,
  getOrder,
  patchOrder,
  putOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByStatus,
};