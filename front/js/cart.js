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
                                                                        <p>${product.price} €</p>
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

fillPage()
getNumberProduct()
getTotalPrice()

/* Permet de supprimer un article du panier */
const deleteItem = document.querySelectorAll(".deleteItem")
for (let i = 0; i < deleteItem.length; i++) {
     deleteItem[i].addEventListener("click", function() {
        console.log(i)
        let basket = getBasket()
        let deletProduct = basket.splice(i,1)
        console.log(basket)
        console.log(deletProduct)
        saveBasket(basket)
        location.reload()
     })
 }

/* Calcul et affiche la quantité totale de produits commandés */
async function getNumberProduct() {
    let basket = await getBasket()
    console.log(basket.length)
    let number = 0
    for (let product of basket) {
        number += product.selectQuantity
    }
    document.getElementById("totalQuantity").innerHTML = `${number}`
}

function getTotalPrice() {
    let basket = getBasket()
    console.log(basket)
    let number = 0
    for (let product of basket) {
        number += product.selectQuantity * product.price
    }
    document.getElementById("totalPrice").innerHTML = `${number}`
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

var changeQuantity = document.querySelectorAll(".itemQuantity")
for (let i = 0; i < changeQuantity.length; i++) {
    changeQuantity[i].addEventListener("change", function() {
        let basket = getBasket()
        console.log(basket)
        if (changeQuantity != basket.selectQuantity) {
            console.log(i)
            console.log(changeQuantity)
            console.log(changeQuantity[i].valueAsNumber)
            basket[i].selectQuantity = changeQuantity[i].valueAsNumber
            saveBasket(basket)
            location.reload()
       }
     });
 }

function validateFirstName(input) {
    var validRegex = /^([a-z\u00E1\u00E0\u00E2\u00E4\u00E3\u00E5\u00E7\u00E9\u00E8\u00EA\u00EB\u00ED\u00EC\u00EE\u00EF\u00F1\u00F3\u00F2\u00F4\u00F6\u00F5\u00FA\u00F9\u00FB\u00FC\u00FD\u00FF\u00E6\u0153\s-]*)+$/i
    if (document.getElementById("firstName").value.match(validRegex)) {
        document.getElementById("firstNameErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("firstNameErrorMsg").innerText = "Prénom invalide!"
        /*noValidForm()*/
        return false
    }
}

document.getElementById("firstName").addEventListener('input', function() {
    validateFirstName()
})

function validateLastName(input) {
    var validRegex = /^([a-z\u00E1\u00E0\u00E2\u00E4\u00E3\u00E5\u00E7\u00E9\u00E8\u00EA\u00EB\u00ED\u00EC\u00EE\u00EF\u00F1\u00F3\u00F2\u00F4\u00F6\u00F5\u00FA\u00F9\u00FB\u00FC\u00FD\u00FF\u00E6\u0153\s-]*)+$/i
    if (document.getElementById("lastName").value.match(validRegex)) {
        document.getElementById("lastNameErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("lastNameErrorMsg").innerText = "Nom de famille invalide!"
        /*noValidForm()*/
        return false
    }
}

document.getElementById("lastName").addEventListener('input', function() {
    validateLastName()
})

function validateAddress(input) {
    var validRegex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9\-\s]+$/i
    if (document.getElementById("address").value.match(validRegex)) {
        document.getElementById("addressErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("addressErrorMsg").innerText = "Adresse invalide!"
        /*noValidForm()*/
        return false
    }
}

document.getElementById("address").addEventListener('input', function() {
    validateAddress()
})

function validateCity(input) {
    var validRegex = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\-\s]+$/i
    if (document.getElementById("city").value.match(validRegex)) {
        document.getElementById("cityErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("cityErrorMsg").innerText = "Ville invalide!"
        /*noValidForm()*/
        return false
    }
}

document.getElementById("city").addEventListener('input', function() {
    validateCity()
})

function validateEmail(input) {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/
    if (document.getElementById("email").value.match(validRegex)) {
        document.getElementById("emailErrorMsg").innerText = ""
        return true
    } else {
        document.getElementById("emailErrorMsg").innerText = "Adresse email invalide!"
        /*noValidForm()*/
        return false
    }
}

document.getElementById("email").addEventListener('input', function() {
    validateEmail()
})

 
const productId = []
let basket = getBasket()
for (i = 0; i < basket.length; i++) {
    productId.push(basket[i]._id)
}
console.log(productId)


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
    console.log(validForm)
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
            console.log(value)
            document.location.href = "confirmation.html?orderid=" + value.orderId
        })
        .catch (function(err) {
            alert("Une erreur s'est produite, votre commande n'a pu être effetuée")
        })
})