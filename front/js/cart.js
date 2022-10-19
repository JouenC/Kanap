getPriceProducts()
let allProducts

/* Si aucun panier dans le localstorage, en créer un, sinon, en récupèrer le contenu*/
function getBasket() {
    const basket = localStorage.getItem("basket")
    if (basket == undefined) {
        return false
    } else {
        return JSON.parse(basket)
    }
}

/* Construit l'affichage des produits stockés dans le localstorage */
async function fillPage() {
    let basket = getBasket()
    for(let product of basket) {
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.selectProductColor}">
                                                                <div class="cart__item__img">
                                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                    <div class="cart__item__content__description">
                                                                        <h2>${product.name}</h2>
                                                                        <p>${product.selectColor}</p>
                                                                        <p>${getProductPrice(product._id)} €</p>
                                                                    </div>
                                                                    <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                            <p>Qté : </p>
                                                                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.selectQuantity}>
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                            <p class="deleteItem">Supprimer</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </article>`
    }
}

/* Requête GET auprès de l'API suivi de la construction de la page */
async function getPriceProducts() {
    const priceProducts = await fetch("http://localhost:3000/api/products")
    allProducts = await priceProducts.json()
    fillPage()
    getNumberProduct()
    getTotalPrice()
}

/* Lance une recherche en comparant les id des produits du local storage avec ceux de l'API pour en extraire les prix */
function getProductPrice(_id) {
    let foundProduct = allProducts.find(p => p._id === _id)
    return foundProduct.price
}

/* Retire un produit donné du panier */
function deleteProduct() {
    let basket = getBasket()
        basket.splice(i,1)
        saveBasket(basket)
        location.reload()
}

/* Permet de supprimer un article du panier */
const deleteItem = document.querySelectorAll(".deleteItem")
for (let i = 0; i < deleteItem.length; i++) {
     deleteItem[i].addEventListener("click", function() {
        deleteProduct()
        /*let basket = getBasket()
        basket.splice(i,1)
        saveBasket(basket)
        location.reload()*/
     })
 }

/* Calcul et affiche la quantité totale de produits commandés */
async function getNumberProduct() {
    let basket = await getBasket()
    let number = 0
    for (let product of basket) {
        number += product.selectQuantity
    }
    document.getElementById("totalQuantity").innerHTML = `${number}`
}

/* Calcul et affiche le prix total des produits du panier */
function getTotalPrice() {
    let basket = getBasket()
    let number = 0
    for (let product of basket) {
        number += product.selectQuantity * getProductPrice(product._id)
    }
    document.getElementById("totalPrice").innerHTML = `${number}`
}

/* Sauvegarde le panier dans le local storage */
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

/* Ecoute les changements de la quantité des produits du panier et met à jour son contenu dans le local storage (ce qui entrainera une mise à jour de l'affichage du nombre total de produits ainsi que le prix total) */
var changeQuantity = document.querySelectorAll(".itemQuantity")
for (let i = 0; i < changeQuantity.length; i++) {
    changeQuantity[i].addEventListener("change", function() {
        let basket = getBasket()
        if (changeQuantity > 0 && changeQuantity < 101) {
            if (selectQuantity != "") {
                basket[i].selectQuantity = changeQuantity[i].valueAsNumber
                saveBasket(basket)
                location.reload()
            }   else {
                    alert ("Veuillez saisir une quantité entre comprise entre 0 et 101")
                    return false  
                }  
        } else {
            alert ("Veuillez saisir une quantité entre comprise entre 0 et 101")
            return false  
        }  
    })
 }

 /* Validation du champs fist name du formulaire */
function validateFirstName(input) {
    var validRegex = /^([a-z\u00E1\u00E0\u00E2\u00E4\u00E3\u00E5\u00E7\u00E9\u00E8\u00EA\u00EB\u00ED\u00EC\u00EE\u00EF\u00F1\u00F3\u00F2\u00F4\u00F6\u00F5\u00FA\u00F9\u00FB\u00FC\u00FD\u00FF\u00E6\u0153\s-]*)+$/i
    if (document.getElementById("firstName").value.match(validRegex)) {
        document.getElementById("firstNameErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("firstNameErrorMsg").innerText = "Prénom invalide!"
        return false
    }
}

/* Ecoute de tout changement dans le champs first name */
document.getElementById("firstName").addEventListener('input', function() {
    validateFirstName()
})

/* Validation du champs last name du formulaire */
function validateLastName(input) {
    var validRegex = /^([a-z\u00E1\u00E0\u00E2\u00E4\u00E3\u00E5\u00E7\u00E9\u00E8\u00EA\u00EB\u00ED\u00EC\u00EE\u00EF\u00F1\u00F3\u00F2\u00F4\u00F6\u00F5\u00FA\u00F9\u00FB\u00FC\u00FD\u00FF\u00E6\u0153\s-]*)+$/i
    if (document.getElementById("lastName").value.match(validRegex)) {
        document.getElementById("lastNameErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("lastNameErrorMsg").innerText = "Nom de famille invalide!"
        return false
    }
}

/* Ecoute de tout changement dans le champs last name */
document.getElementById("lastName").addEventListener('input', function() {
    validateLastName()
})

/* Validation du champs address du formulaire */
function validateAddress(input) {
    var validRegex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9\-\s]+$/i
    if (document.getElementById("address").value.match(validRegex)) {
        document.getElementById("addressErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("addressErrorMsg").innerText = "Adresse invalide!"
        return false
    }
}

/* Ecoute de tout changement dans le champs address */
document.getElementById("address").addEventListener('input', function() {
    validateAddress()
})

/* Validation du champs city du formulaire */
function validateCity(input) {
    var validRegex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\-\s]+$/i
    if (document.getElementById("city").value.match(validRegex)) {
        document.getElementById("cityErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("cityErrorMsg").innerText = "Ville invalide!"
        return false
    }
}

/* Ecoute de tout changement dans le champs city */
document.getElementById("city").addEventListener('input', function() {
    validateCity()
})

/* Validation du champs email du formulaire */
function validateEmail(input) {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/
    if (document.getElementById("email").value.match(validRegex)) {
        document.getElementById("emailErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("emailErrorMsg").innerText = "Adresse email invalide!"
        return false
    }
}

/* Ecoute de tout changement dans le champs email */
document.getElementById("email").addEventListener('input', function() {
    validateEmail()
})

/* Stock l'id des produits présents dans le local storage dans la constante productId */
const productId = []
let basket = getBasket()
for (i = 0; i < basket.length; i++) {
    productId.push(basket[i]._id)
}

/* Lors du clique sur le bouton commander, envoie les informations du formmulaire à l'API ainsi que l'id des produits puis redirige vers la page confirmation en stockant le numéro de commande dans son URL */
document.getElementById("order").addEventListener("click", function(event) {
    event.preventDefault()
    const validForm = {
        contact : {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        },
        products : productId
    }
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {"Content-Type": "application/JSON"},
        body: JSON.stringify(validForm)
    })
        .then (function(res) {
            if (res.ok) {
                return res.json()
            }
        })
        .then (function(value) {
            document.location.href = "confirmation.html?orderid=" + value.orderId
        })
        .catch (function(err) {
            alert("Une erreur s'est produite, votre commande n'a pu être effetuée")
        })
})