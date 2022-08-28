getProductId()
displayProduct()
/*getProduct()*/

function getProductId() {
    return new URL(location.href).searchParams.get("id")
}

async function displayProduct() {
    const productId = getProductId()
    console.log(productId)
    const getProduct = await fetch(`http://localhost:3000/api/products/${productId}`)
    console.log(getProduct)
    const productJson = await getProduct.json()
    console.log(productJson)
    fillPageProduct(productJson)
    colorChoise(productJson)
}

function fillPageProduct(product) {
    console.log(product)
    let productImg = document.createElement('img')
    productImg.src = product.imageUrl
    productImg.alt = product.altTxt
    document.querySelector("article > div:nth-child(1)").appendChild(productImg)
    document.getElementById("title").innerHTML = product.name
    document.getElementById("price").innerHTML = product.price
    document.getElementById("description").innerHTML = product.description
    
}

function colorChoise(product) {
    /*for (let color of product.colors) {
        console.log(color)
        let option = document.querySelector("option")
        option.value = color.charAt(0).toUpperCase() + color.slice(1)
        option.innerText = color.charAt(0).toUpperCase() + color.slice(1)*/

        /*document.querySelector("option").value = product.colors[color]
        console.log(document.querySelector("option").value)
        document.querySelector("option").innerText = product.colors*/

    /*var option = null;*/
    /*var selection = document.appendChild("option") */
    var option = null

    for(i = 0; i<product.colors.length; i++) { 
        
        /*option = document.querySelector("option")
        option.value = product.colors[i]
        option.innerHTML = product.colors[i]*/
        document.createElement("option").document.appendChild("option")
        option = document.querySelector("option:nth-child(i)")
        option.value = product.colors[i]
        console.log(option.value)
        option.innerHTML = product.colors[i]
        console.log(option.innerText)
        
        /*selection.appendChild("option:nth-child(i)")*/
    }
}

    
