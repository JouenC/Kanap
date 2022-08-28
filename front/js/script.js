/*main()

async function main() {
    const products = await getProducts()
    console.log(products)
    fillPage (products)
}

async function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function(result) {
            return result.json()
        })
        .then(function(value) {
            console.log(value)
        })
        .catch(function(error) {
            alert(error)
        })
}*/

async function getProducts() {
    const products = await fetch("http://localhost:3000/api/products")
    console.log(products.data)
    const productsJson = await products.json()
    console.log(productsJson)
    fillPage(productsJson)
}

function fillPage(products) {
    console.log(products)
    products.forEach(product => {
        let productLink = document.createElement('a')
        let productArticle = document.createElement('article')
        let productImg = document.createElement('img')
        let productTitle = document.createElement('h3')
        let productDescription = document.createElement('p')
        productLink.href = './product.html?id=' + product._id
        productImg.src = product.imageUrl
        productImg.alt = product.altTxt
        productTitle.innerText = product.name
        productDescription.innerText = product.description
        document.getElementById("items").appendChild(productLink)
        productLink.appendChild(productArticle)
        productArticle.appendChild(productImg)
        productArticle.appendChild(productTitle)
        productArticle.appendChild(productDescription)
    });  
}

getProducts()

/*class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

class ProductManager {
    constructor(listProduct) {
        this.listProduct = listProduct;
    }
}

fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then(jsonListProduct => {
        for(let jsonProduct of jsonListProduct) {
            let product = new Product(jsonProduct);
            document.getElementById("items").innerHTML +=  `<a href="./product.html?id=${product._id}">
                                                                <article>
                                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                    <h3 class="productName">${product.name}</h3>
                                                                    <p class="productDescription">${product.description}</p>
                                                                </article>
                                                            </a>`
        }
    })*/