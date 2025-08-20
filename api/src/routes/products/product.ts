import { Router } from "express"
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
productsRouter.post('/', postProducts)
productsRouter.get('/:id', getProduct)
productsRouter.put('/:id', putProduct)
productsRouter.delete('/:id', deleteProduct)
productsRouter.patch('/:id', patchProduct)


export default productsRouter
