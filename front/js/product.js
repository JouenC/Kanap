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
    const getProduct = await fetch(`http://localhost:3000/api/products/${productId}`)
    const productJson = await getProduct.json()
    fillPageProduct(productJson)
    colorChoice(productJson)
    currentProduct = productJson
}

/* Permet l'affichage des caractéristiques du produit correspondant à la page */
function fillPageProduct(product) {
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
        option.innerHTML = product.colors[i]
        document.querySelector("select").appendChild(option)
    }
}

/* Permet d'ajouter un produit au panier si une quantité et une couleur sont sélectionnées */
document.getElementById('addToCart').addEventListener('click', function() {
    currentProduct.selectQuantity = parseInt(document.getElementById("quantity").value)
    if (currentProduct.selectQuantity < 1 || currentProduct.selectQuantity > 100 || currentProduct.selectQuantity == "") {
        alert("Veuillez renseigner une couleur et une quantité valide")
        return false
    }
    currentProduct.selectColor = document.getElementById("colors").value
    if (currentProduct.selectColor === "") {
        alert("Veuillez renseigner une couleur et une quantité valide")
        return false
    }
    addBasket(currentProduct)
})

/* Permet d'ajouter un produit dans le panier et de l'ajouter à l'existant si même id et même couleur */
function addBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p._id === product._id && p.selectColor === product.selectColor)
    if (foundProduct) {
        foundProduct.selectQuantity += currentProduct.selectQuantity
        if (foundProduct.selectQuantity > 100) {
            alert("Vous ne pouvez commander plus de 100 unités du même article")
            return false
        }
    } else {
        basket.push(product)
    }
    saveBasket(basket)
}

/* Permet de créer une nouvelle liste dans le localstorage ou renvoie la liste si elle existe*/
function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

/* Sauvegarde le panier dans le local storage */
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
    delete basket.price
}