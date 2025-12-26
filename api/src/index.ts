import express, {json, urlencoded} from 'express'
import cors from 'cors'
import productsRouter from './routes/products/product.js'
import session from 'express-session'
import userRouter from './routes/auth/user.js'

const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend origin
  credentials: true               // if you're using cookies or auth headers
}));
app.use(json())
app.use(urlencoded({extended: false}))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax' }

}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/products', productsRouter)
app.use('/user', userRouter)
app.use('/orders', ordersRouter)


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
