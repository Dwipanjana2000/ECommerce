


const cart_items = document.querySelector('#cart .cart-items');
const cart=document.querySelector('#cart')
document.addEventListener('click',(e)=>{
    
    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.querySelector(`#in-cart-${id}`)){
            alert('This item is already added to the cart');
            return 
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`
        cart_items.appendChild(cart_item)
       
        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)
    }
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        const cartContainer=document.getElementById('cart')
        cartContainer.innerHTML = ''
        getCartDetails()
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})

const orders=document.getElementById('show-orders')
orders.addEventListener('click',showOrders)
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:5500/products')
    .then(data=>{
        console.log(data)
        if(data.request.status === 200){
            const products=data.data.products
            const parentSection=document.getElementById('products')
            products.forEach(product=>{
                const productHtml=`
                <div>
                <h1>${product.title}</h1>
                <img src=${product.imageURL}></img>
                <button onClick="addToCart(${product.id})">Add To Cart</button>
                </div>`
                parentSection.innerHTML += productHtml
            })
          
        }
    })
    .catch(err=>{console.log(err)})
})
function addToCart(productId){
axios.post('http://localhost:5500/cart',{productId:productId})
.then(response=>{
    if(response.status===200){

        notifyUser(response.data.message)
    }else{
        throw new Error()
    }
}
)
.catch(err=>console.log(err))
}
function getCartDetails(){
    axios.get('http://localhost:5500/cart')
    .then(response=>{
        if(response.status===200){
            response.data.products.forEach(product=>{
                const cartContainer=document.getElementById('cart')
                cartContainer.innerHTML += `<li>${product.title}--${product.price}--${product.CartItem.quantity}</li>
                <button onClick="StoreData()">Order Now</button>`

            })
            document.querySelector('#cart').style = "display:block;" 
        }else {
            throw new Error('Something went wrong')
        }
        // console.log(response)
     
    })
    .catch(err=>{
     notifyUser(err)
    })
}
function notifyUser2(message){

    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message} has been ordered<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}
function StoreData(){
    axios.post('http://localhost:5500/create-order')
    .then(response =>{
        if(response.status===200){
            console.log(response)
        }
    })
    .catch(err=>{console.log(err)})
    axios.get('http://localhost:5500/orders')
    .then(response=>{
        if(response.status=== 200){
            console.log(response)
           response.data.orders.forEach(order=>{
            notifyUser2(order.id)
           })
           
    
        }
    })
}
function notifyUser(message){
   
       
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500)
}
function notifyUser3(message){
   
       
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message} has been ordered<h4>`;
    container.appendChild(notification);
    
}
function showOrders(){
    axios.get('http://localhost:5500/orders')
    .then(response=>{
        if(response.status=== 200){
            response.data.orders.forEach(order=>{
                notifyUser3(order.id)
               })
        }
           })
           
    
        
    
    .catch(err=>{
        notifyUser(err)
    })
}