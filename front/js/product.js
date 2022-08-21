async function getProducts () {
    fetch ('http://localhost:3000/api/products')
    .then(function() {
        if(res.ok) {
            return res.json();
        }    
    })
    .then(function(value) {
        console.log(value)
    })
    .catch(function(err) {
        console.log("Game Over")
    })
}