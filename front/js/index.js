main()

async function main() {
    const products = await getProducts()
    fillPage (products)
}

function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function(result) {
            return result.json()
        })
        .then(function(products) {
            return products
        })
        .catch(function(error) {
            alert(error)
        })
}

function fillPage(products) {
    products.forEach(product => {
        let productLink = createElement('a')
        let productArticle = createElement('article')
        let productImg = createElement('img')
        let productTitle = createElement('h3')
        let productDescription = createElement('p')
        productLink.href = './product.html?id=' + product._id
        productImg.src = product.imageURL
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