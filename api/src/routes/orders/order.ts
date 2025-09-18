import { Router } from "express";
import { getOrders, postOrder, putOrder, getOrder, deleteOrder } from "./orderController"; 
import isAuthenticated from "src/middleware/authMiddleware"

const ordersRouter = Router()

ordersRouter.get('/', getOrders)
ordersRouter.post('/', isAuthenticated, postOrder)
ordersRouter.get('/:id', isAuthenticated, getOrder)
ordersRouter.put('/:id', isAuthenticated, putOrder)
ordersRouter.delete('/:id', isAuthenticated, deleteOrder)

export default ordersRouter
