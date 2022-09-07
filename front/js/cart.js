function getBasket() {
    const basket = localStorage.getItem("basket")
    if (basket == undefined) {
        return false
    } else {
        return JSON.parse(basket)
    }
}

async function fillPage() {
    let basket = getBasket()
    console.log(basket)
    for(let product of basket) {
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${product.selectProductId}" data-color="${product.selectProductColor}">
                                                                <div class="cart__item__img">
                                                                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                                </div>
                                                                <div class="cart__item__content">
                                                                    <div class="cart__item__content__description">
                                                                        <h2>${product.name}</h2>
                                                                        <p>${product.selectColor}</p>
                                                                        <p>${product.selectPrice} €</p>
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

document.getElementsByClassName('deleteItem').addEventListener('click', removeFromBasket())

function removeFromBasket(product) {
    let basket = getBasket()
    basket = basket.filter(p => p.id != product.id)
    saveBasket(basket)
}

function getNumberProduct() {
    let basket = getBasket
    console.log(basket)
    let number = 0
    for (i=0; i<basket.length; i++) {
    /*for (let product of basket) {
        number = product.selectQuantity*/
        number = product.selectQuantity[i] + product.selectQuantity[i++]
        console.log(number)
    }
    document.getElementById("totalQuantity").innerHTML = `${number}`
}

function getTotalPrice() {
    let basket = getBasket
    let number = 0
    for (i=0; i<basket.length; i++) {
        number = product.selectQuantity[i] * product.selectPrice[i] + product.selectQuantity[i++] * product.selectPrice[i++]
    }
    document.getElementById("totalPrice").innerHTML = `${number}`
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket))
}

function changeQuantity(product, quantity) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity
        if (foundProduct.quantity <= 0) {
            removeFromBasket(product)
        }
    }
}