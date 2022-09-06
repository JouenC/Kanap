function getBasket() {
    let basket = localStorage.getItem("basket")
    if (basket == null) {
        return []
    } else {
        return JSON.parse(basket)
    }
}

function removeFromBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.filter(p => p.id == product.id)
    saveBasket(basket)
}

function getNumberProduct() {
    let basket = getBasket
    let number = 0
    for (let product of basket) {
        number = product.quantity
    }
    return number
}

function getTotalPrice() {
    let basket = getBasket
    let number = 0
    for (let product of basket) {
        number = product.quantity * product.price
    }
    return number
}