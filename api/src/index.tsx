import express from 'express'
import productsRouter from './routes/products/product'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/products', productsRouter)

app.get('/products', (req, res) => {
  res.send('the list of products is here')
})

app.post('/products', (req, res) => {
  res.send('post the list of products is here')
})

app.get('/products/:id', (req, res) => {
    console.log(req.params)
  res.send('the product with id ' + req.params.id)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
