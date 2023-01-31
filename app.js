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

app.get('/', (req, res) => {
    res.send({ message: 'haga su peticion' })
})



app.get('/products', (req, res) => {
    const { limit } = req.query
    const products = productManager.getProducts()
    const lenght = Object.keys(products).length
    const productosLimitados = products.filter((x) => (x.id < (parseInt(limit) + 1)))
    


    if (parseInt(limit) < lenght) {
        res.send(productosLimitados)
    }
    else {
        res.send(products)
    }
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params
    const idInput = parseInt(pid)
    const produc = productManager.getProductById(idInput)

    if (!produc) {
        res.send({ message: 'el producto no existe' })
    }
    else {
        res.send(produc)

    }
})
