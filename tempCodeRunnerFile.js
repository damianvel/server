import ProductManager from './pm.js'
import express from 'express'
import watch from 'node-watch'

const app = express()
watch('/', { recursive: true }, console.log);

app.use(express.urlencoded({ extended: true }))

const PORT = 8080

const productManager = new ProductManager("./products.json")

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})

app.get('/', (request, response) => {
    response.send({ message: 'haga su peticion' })
})

app.get('/products', (request, response) => {
    response.send(productManager.getProducts())
})




app.get('/products/query', (req, res) => {
    const { limit } = parseInt(req.query)
    const products = productManager.getProducts()
    const productosLimitados = products.filter((x) => (x.index < limit + 1))
    console.log(productosLimitados)



    if (limit < products.lenght) {
        res.send(productosLimitados)
    }
    else {
        res.send(products)
    }
})