if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else {
    ready();
}
function ready(){
    var removeCartItemButton=document.getElementsByClassName("btn-danger")
    for(let i=0;i<removeCartItemButton.length;i++){
        var button=removeCartItemButton[i]
    button.addEventListener('click',removeCartItem)
}
var quantityInput=document.getElementsByClassName("cart-quantity-input")
for(let i=0;i<quantityInput.length;i++){
    var inputs=quantityInput[i];
    inputs.addEventListener('change',quantityChanged)
    }
    var addToCartButtons=document.getElementsByClassName('shop-item-button')
    for(let i=0;i<addToCartButtons.length;i++){
        var buttons=addToCartButtons[i]
        buttons.addEventListener('click',addCartToChanged)
    }
}
    function addCartToChanged(event){
        var button=event.target;;
        var shopItems=button.parentElement.parentElement;
        var price=shopItems.getElementsByClassName("shop-item-price")[0].innerText;
        var image=shopItems.getElementsByClassName("shop-item-image")[0].src;
        var title=shopItems.getElementsByClassName("shop-item-title")[0].innerText;

    }
function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.parentElement.remove();
   updateCartTotal();
}
function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value) || input.value<0){
        input.value=1;
    }
    updateCartTotal();
}
function updateCartTotal(){
    var cartItemcontainer=document.getElementsByClassName("cart-items")[0];
    
    var cartRows=cartItemcontainer.getElementsByClassName("cart-row");
    var total=0;
    for(let i=0;i<cartRows.length;i++){
        var cartRow=cartRows[i];
        var priceElement=cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement=cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price=parseFloat(priceElement.innerText.replace('$',''));
        var quantity=quantityElement.value;
        total=total+(price * quantity);
    }
    total=Math.round((total*100)/100)
    document.getElementsByClassName("cart-total-price").innerText='$'+total;
    }

