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
            /*let selectQuantity = changeQuantity[i].valueAsNumber*/
            console.log(changeQuantity[i].valueAsNumber)
            basket[i].selectQuantity = changeQuantity[i].valueAsNumber
            /*basket = basket.selectQuantity.splice(i,1,selectQuantity)*/
            /*console.log(basket)*/
            saveBasket(basket)
            location.reload()
       }
     });
 }

/*document.querySelectorAll('.input').addEventListener('change', function() {
    let basket = getBasket()
    for (let product of basket) {
        if (basket.selectQuantity != parseInt(document.querySelector('input').value)) {
            basket.selectQuantity == parseInt(document.querySelector('input').value)
            console.log (basket.selectQuantity)
            basket.push()
            saveBasket()
        }
    }
})*/

function disableSubmit() {
    if (disabled) {
        document
            .getElementById("order")
            .setAttribute("disabled, true")
    } else {
        document
            .getElementById("order")
            .setAttribute("disabled, true")
    }
}

document
    .getElementById("firstName")
    .addEventListener('change', function(validate) {
        console.log(validate)
        if(/[0-9]/.test(validate)) {
            document.getElementById("firstNameErrorMsg").innerText = "Ceci n'est pas un prénom"
            disableSubmit(true)
        } else {
            disableSubmit(false)
        }
    })