function getBasket() {
    const orderId = localStorage.getItem("orderId")
    console.log(orderId)
    if (orderId == undefined) {
        return false
    } else {
        /*return JSON.parse(orderId)*/
        document.getElementById("orderId").innerText = "" + orderId
        localStorage.clear()
    }
}

getBasket()