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

/* Permet le choix de la couleur du canapé dans un menu déroulant */
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

document.getElementById('addToCart').addEventListener('click', function() {
    currentProduct.selectQuantity = parseInt(document.getElementById("quantity").value)
    if (currentProduct.selectQuantity == 0) {
        return false
        /*alors renvoyer un texte demandant de choisir une quantité*/
    }
    currentProduct.selectColor = document.getElementById("colors").value
    if (currentProduct.selectColor === "") {
        return false
        /*alors renvoyer un texte demandant de choisir une couleur*/
    }
    console.log(currentProduct)
    addBasket(currentProduct)
})

function addBasket(product) {
    let basket = getBasket()
    console.log(basket)
    let foundProduct = basket.find(p => p._id === product._id && p.selectColor === product.selectColor)
    if (foundProduct) {
        console.log("tot")
        foundProduct.selectQuantity += currentProduct.selectQuantity /*Ne fonctionne pas...*/
    } else {
        basket.push(product)
    }
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