import { Router } from "express"
import isAuthenticated from "src/middleware/authMiddleware"
import isAuthorized from "src/middleware/roleMiddleware"

import { 
  getProducts, 
  postProducts, 
  getProduct, 
  putProduct, 
  deleteProduct, 
  patchProduct 
} from "./productController"


const productsRouter = Router()
productsRouter.get('/', getProducts)
productsRouter.post('/', isAuthenticated, isAuthorized("admin"), postProducts)
productsRouter.get('/:id', getProduct)
productsRouter.put('/:id', isAuthenticated, isAuthorized("admin"), putProduct)

productsRouter.delete('/:id', isAuthenticated, isAuthorized("admin"), deleteProduct)
productsRouter.patch('/:id', isAuthenticated, isAuthorized("admin"), patchProduct)


export default productsRouter
