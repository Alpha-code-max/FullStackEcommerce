import {Request, Response} from 'express'

const getProducts = (req: Request, res: Response) => {
    res.send('the list of products is here')
}
const postProducts = (req: Request, res: Response) => {
    res.send('post the list of products is here')
}
const getProduct = (req: Request, res: Response) => {
    res.send('the product with id ' + req.params.id)
}
const putProduct = (req: Request, res: Response) => {
    res.send('put the product with id ' + req.params.id)
}
const deleteProduct = (req: Request, res: Response) => {
    res.send('delete the product with id ' + req.params.id)
}
const patchProduct = (req: Request, res: Response) => {
    res.send('patch the product with id ' + req.params.id)
}
export {
    getProducts,
    postProducts,
    getProduct,
    putProduct,
    deleteProduct,
    patchProduct
}
