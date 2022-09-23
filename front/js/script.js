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

/* Récupération des données de l'API, conversion en Json puis appel de la fonction fillPage */
async function getProducts() {
    const products = await fetch("http://localhost:3000/api/products")
    const productsJson = await products.json()
    fillPage(productsJson)
}

/* Construit de manière dynamique les cartes des différents produits */
function fillPage(products) {
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

/* Lance la fonction permettant l'affichage dynamique */
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