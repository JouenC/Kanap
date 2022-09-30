/* Récupère le numéro de commande dans l'URL et l'affiche dans la page */
function getOrderId() {
    const orderId = new URL(location.href).searchParams.get("orderid")
    document.getElementById("orderId").innerText = "" + orderId
    localStorage.clear()
}

getOrderId()