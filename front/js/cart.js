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

const deleteItem = document.querySelectorAll(".deleteItem")
for (let i = 0; i < deleteItem.length; i++) {
     deleteItem[i].addEventListener("click", function() {
       if (true) {
        console.log(i)
        let basket = getBasket()
        let deletProduct = basket.splice(i,1)
        console.log(basket)
        console.log(deletProduct)
        saveBasket(basket)
        location.reload()
       }
     });
 }
    
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
    changeQuantity[i].addEventListener("change", function(number) {
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

function noValidForm() {
    document.getElementById("order").preventDefault()
}

function validForm() {
    document.getElementById("order")
}

function validateFirstName(input) {
    var validRegex = /^([a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+[\-?]|[\s?]+[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)+$/i/*ÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ))(?!\-)*/
    if (document.getElementById("firstName").value.match(validRegex)) {
        document.getElementById("firstNameErrorMsg").innerText = ""
        document.getElementById("firstName").focus()
        return true
    } else {
        document.getElementById("firstNameErrorMsg").innerText = "Prénom invalide!"
        document.getElementById("firstName").focus()
        noValidForm()
        return false
    }
}

document.getElementById("firstName").addEventListener('input', function() {
    validateFirstName()
})

function validateLastName(input) {
    var validRegex = /^([a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]+[\-?]|[\s?]+[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ]*)+$/i
    if (document.getElementById("lastName").value.match(validRegex)) {
        document.getElementById("lastNameErrorMsg").innerText = ""
        document.getElementById("lastName").focus()
        return true
    } else {
        document.getElementById("lastNameErrorMsg").innerText = "Nom de famille invalide!"
        document.getElementById("lastName").focus()
        noValidForm()
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
        document.getElementById("address").focus()
        return true
    } else {
        document.getElementById("addressErrorMsg").innerText = "Adresse invalide!"
        document.getElementById("address").focus()
        noValidForm()
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
        document.getElementById("city").focus()
        return true
    } else {
        document.getElementById("cityErrorMsg").innerText = "Ville invalide!"
        document.getElementById("city").focus()
        noValidForm()
        return false
    }
}

document.getElementById("city").addEventListener('input', function() {
    validateCity()
})

function validateEmail(input) {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (document.getElementById("email").value.match(validRegex)) {
        document.getElementById("emailErrorMsg").innerText = ""
        document.getElementById("email").focus()
        return true
    } else {
        document.getElementById("emailErrorMsg").innerText = "Adresse email invalide!"
        document.getElementById("email").focus()
        noValidForm()
        return false
    }
}

document.getElementById("email").addEventListener('input', function() {
    validateEmail()
})