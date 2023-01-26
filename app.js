import ProductManager from './pm.js'
import express from 'express'

const app = express()
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const productManager = new ProductManager()
const products = productManager.getProducts()

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})



app.get('/products', (request, response) => {
    response.send(products)
})


app.get('/query', (req, res) => {
    console.log(req.query)
    const { limit } = req.query


    if (parseInt(limit) > products.lenght) {
        return res.send(products)
    }

    let productosFiltrados = products.filter(x => x.index < limit + 1)

    res.send({
        productosFiltrados
    })
})


app.get('/:pid', (req, res) => {
    console.log(req.params)
    const { idInput } = req.params

    const productosFiltrados = products.find(({ id }) => id === idInput)

    if (!productosFiltrados) {
        return "Not found"
    }

    res.send(productosFiltrados)
    
})
