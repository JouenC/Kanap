async function getProducts () {
    const result = await fetch ('http://localhost:3000/api/products')
    .then(function() {
        if(res.ok) {
            return res.json();
        }    
    })
    .then(function(value) {
        console.log(value)
    })
    .catch(function(err) {
        console.log("Game Over")
    })
}

function fillPage(products) {
    console.log(products)
    products.forEach(product => {
        console.log(product)
        let productLink = document.createElement("a")
        productLink = './product.html?id=42' + product._id
        document.getElementById('items').appendChild(productLink)
        let article = document.createElement("article")
        let productImage
    });
}

getProducts()
fillPage()