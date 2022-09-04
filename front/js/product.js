getProductId()
displayProduct()
let currentProduct

/* Récupèration de l'ID du produit affiché sur la page */
function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

/* Appel le produit correspondant à la page à l'aide de son id puis appel les fonctions permettant son affichage sur la page */
async function displayProduct() {
    const productId = getProductId()
    console.log(productId)
    const getProduct = await fetch(`http://localhost:3000/api/products/${productId}`)
    console.log(getProduct)
    const productJson = await getProduct.json()
    console.log(productJson)
    fillPageProduct(productJson)
    colorChoice(productJson)
    currentProduct = productJson
}

/* Permet l'affichage des caractéristiques du produit correspondant à la page */
function fillPageProduct(product) {
    console.log(product)
    let productImg = document.createElement('img')
    productImg.src = product.imageUrl
    productImg.alt = product.altTxt
    document.querySelector("article > div:nth-child(1)").appendChild(productImg)
    document.getElementById("title").innerHTML = product.name
    document.getElementById("price").innerHTML = product.price
    document.getElementById("description").innerHTML = product.description
    
}

function colorChoice(product) {
    for(i = 0; i<product.colors.length; i++) { 
        let option = document.createElement("option")
        option.value = product.colors[i]
        console.log(option.value)
        option.innerHTML = product.colors[i]
        console.log(option.innerHTML)
        document.querySelector("select").appendChild(option)
    }
}

function removeFromBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.filter(p => p.id == product.id)
    saveBasket(basket)
}

/* A mettre sur la page panier */
function getNumberProduct() {
    let basket = getBasket
    let number = 0
    for (let product of basket) {
        number = product.quantity
    }
    return number
}

/* A mettre sur la page panier */
function getTotalPrice() {
    let basket = getBasket
    let number = 0
    for (let product of basket) {
        number = product.quantity * product.price
    }
    return number
}

document.getElementById('addToCart').addEventListener('click', function() {
    currentProduct.selectQuantity = parseInt(document.getElementById("quantity").value)
    currentProduct.selectColor = document.getElementById("colors").value
    /* if (currentProduct.selectColor === "") {
        alors renvoyer un texte demandant de choisir une couleur
    } */
    currentProduct.selectPrice = parseInt(document.getElementById("price").innerHTML)
    console.log(currentProduct)
    addBasket(currentProduct)  
})

function addBasket(product, quantity) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    /* if (foundProduct.selectColor != undefined) {
        foundProduct.quantity += quantity
        Si selectColors && _id existe déjà, alors select.quantity += quantity
        Sinon select.quantity == quantity
    }*/
    basket.push(product)
    console.log(basket)
    saveBasket(basket)
}

function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}
