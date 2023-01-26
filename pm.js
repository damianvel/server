const fs = require('fs')


export default class ProductManager {

    constructor() {
        this.path = "./products.json"
        this.products = []
    }

    getProducts = () => {
        const productsDb = JSON.parse(fs.readFileSync(this.path))
        return productsDb
    }

    addProduct = (newProduct) => {

        const productAd = this.products.find(({ code }) => code === newProduct.code)

        if (productAd) {
            console.log('producto con este code ya existe')
            return productAd
        } else {

            if (newProduct["title" && "description" && "price" && "code" && "thumbnail" && "stock"]) {


                if (this.products.length === 0) {
                    newProduct.id = 1
                } else {
                    newProduct.id = this.products[this.products.length - 1].id + 1
                }

                this.products.push(newProduct)



                fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))

            }

            else {
                console.log(" faltan datos")
                return newProduct
            }
        }
    }

    getProductById = (idInput) => {

        const productsDb = JSON.parse(fs.readFileSync(this.path))
        const productDb = productsDb.find(({ id }) => id === idInput)

        if (!productDb) {
            return "Not found"
        }
        return productDb
    }


    deleteProductById = (idInput) => {

        const productsDb = JSON.parse(fs.readFileSync(this.path))
        const productDb = productsDb.find(({ id }) => id === idInput)


        if (!productDb) {
            return "Not found"
        }

        const productIndex = productsDb.findIndex(({ id }) => id === idInput)


        productsDb.splice(productIndex, 1)

        fs.writeFileSync(this.path, JSON.stringify(productsDb, null, '\t'))

    }

    updateProductById = (idInput, key, value) => {

        const productsDb = JSON.parse(fs.readFileSync(this.path))
        const productDb = productsDb.find(({ id }) => id === idInput)


        if (!productDb) {
            return "Not found"
        }


        const productIndex = productsDb.findIndex(({ id }) => id === idInput)

        const updated = { ...productDb }


        updated.key = value

        productsDb.splice(productIndex, 1)
        productsDb.push(updated)
        fs.writeFileSync(this.path, JSON.stringify(productsDb, null, '\t'))
    }
}


const productManager = new ProductManager()


productManager.addProduct(

    {
        title: "jarra",
        description: "linda",
        price: 500,
        thumbnail: "notiene",
        code: 265,
        stock: 50,
    })


productManager.addProduct({
    title: "florero",
    description: "negro",
    price: 500,
    thumbnail: "notiene",
    code: 658,
    stock: 15,
    
})


productManager.addProduct({
    title: "maceta",
    description: "grande",
    price: 500,
    thumbnail: "notiene",
    code: 1234,
    stock: 15,
})



productManager.getProducts()


productManager.getProductById(idInput = 1)



productManager.deleteProductById(idInput = 2)

productManager.updateProductById(idInput = 1, key = "price", value = 50000000)

productManager.getProducts()
