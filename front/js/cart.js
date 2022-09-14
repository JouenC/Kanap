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
    console.log(basket)
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


document.querySelector/*All*/('deleteItem').forEach((basket) => {
    document.querySelector/*All*/('deleteItem').addEventListener('click', function() {
    console.log("hih")
    let basket = getBasket()
    for (let product of basket) {
        delete product.dataset.basket
    }
    /*saveBasket(basket)*/
    })
})
    
async function getNumberProduct() {
    let basket = await getBasket()
    console.log(basket.length)
    let number = 0
    for (let product of basket) {
        number += product.selectQuantity
        /*number += document.querySelector("input").value*/
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

document.querySelector/*All*/('input').addEventListener('click', function() {
    let basket = getBasket()
    for (let product of basket) {
        if (basket.selectQuantity != parseInt(document.querySelector('input').value)) {
            basket.selectQuantity == parseInt(document.querySelector('input').value)
            console.log (basket.selectQuantity)
            /*basket.push()
            saveBasket()*/
        }
    }
})