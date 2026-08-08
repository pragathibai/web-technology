/*==================================
LOADER
==================================*/

window.onload=function(){

setTimeout(function(){

document.getElementById("loader").style.display="none";

},2000);

};

/*==================================
PRODUCTS
==================================*/

let cart=[];

const GST=0.05;

let discountRate=0.10;

/*==================================
ADD TO CART
==================================*/

const buttons=document.querySelectorAll(".addCart");

buttons.forEach(function(button){

button.addEventListener("click",function(){

let name=this.dataset.name;

let price=parseInt(this.dataset.price);

addToCart(name,price);

});

});

/*==================================
ADD FUNCTION
==================================*/

function addToCart(name,price){

let item=cart.find(function(product){

return product.name===name;

});

if(item){

item.quantity++;

}

else{

cart.push({

name:name,

price:price,

quantity:1

});

}

updateCart();

}

/*==================================
UPDATE CART
==================================*/

function updateCart(){

let list=document.getElementById("cartList");

list.innerHTML="";

let count=0;

cart.forEach(function(item,index){

count+=item.quantity;

list.innerHTML+=`

<div class="cartCard">

<div>

<h4>${item.name}</h4>

<p>₹${item.price}</p>

</div>

<div class="quantity">

<button onclick="decrease(${index})">

-

</button>

<span>

${item.quantity}

</span>

<button onclick="increase(${index})">

+

</button>

</div>

<div class="remove"

onclick="removeItem(${index})">

Remove

</div>

</div>

`;

});

document.getElementById("cartCount").innerHTML=count;

calculateBill();

updateGarden();

}
/*==================================
INCREASE QUANTITY
==================================*/

function increase(index){

cart[index].quantity++;

updateCart();

}

/*==================================
DECREASE QUANTITY
==================================*/

function decrease(index){

if(cart[index].quantity>1){

cart[index].quantity--;

}

else{

cart.splice(index,1);

}

updateCart();

}

/*==================================
REMOVE ITEM
==================================*/

function removeItem(index){

cart.splice(index,1);

updateCart();

}

/*==================================
CALCULATE BILL
==================================*/

function calculateBill(){

let subtotal=0;

cart.forEach(function(item){

subtotal+=item.price*item.quantity;

});

let discount=subtotal*discountRate;

let gst=(subtotal-discount)*GST;

let delivery=49;

let total=(subtotal-discount)+gst+delivery;

document.getElementById("subTotal").innerHTML="₹"+subtotal.toFixed(2);

document.getElementById("discount").innerHTML="- ₹"+discount.toFixed(2);

document.getElementById("gst").innerHTML="₹"+gst.toFixed(2);

document.getElementById("total").innerHTML="₹"+total.toFixed(2);

if(cart.length===0){

document.getElementById("cartList").innerHTML=

"<p class='empty'>Your cart is empty 🌿</p>";

document.getElementById("subTotal").innerHTML="₹0";

document.getElementById("discount").innerHTML="₹0";

document.getElementById("gst").innerHTML="₹0";

document.getElementById("total").innerHTML="₹49";

}

}

/*==================================
COUPON CODE
==================================*/

document.getElementById("applyCoupon")

.addEventListener("click",function(){

let code=document.getElementById("coupon")

.value.trim().toUpperCase();

if(code==="GREEN10"){

discountRate=0.10;

alert("🌿 GREEN10 Applied Successfully!");

}

else if(code==="GREEN20"){

discountRate=0.20;

alert("🌿 GREEN20 Applied Successfully!");

}

else{

discountRate=0;

alert("Invalid Coupon Code!");

}

calculateBill();

});
/*==================================
SEARCH PLANTS
==================================*/

const search=document.getElementById("search");

search.addEventListener("keyup",function(){

let value=search.value.toLowerCase();

let cards=document.querySelectorAll(".flipCard");

cards.forEach(function(card){

let name=card.querySelector("h3")

.innerHTML.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

/*==================================
VIRTUAL GARDEN
==================================*/

function updateGarden(){

let garden=document.getElementById("gardenArea");

garden.innerHTML="";

cart.forEach(function(item){

let plant=document.createElement("span");

plant.innerHTML="🪴";

plant.style.fontSize="45px";

plant.title=item.name;

garden.appendChild(plant);

});

if(cart.length==0){

garden.innerHTML="🌱";

}

}

/*==================================
PLANT CARE TIPS
==================================*/

const tips=[

"💧 Water indoor plants once every week.",

"☀ Keep plants in bright indirect sunlight.",

"🌱 Rotate your plants every month for even growth.",

"🍃 Clean leaves regularly to remove dust.",

"🪴 Repot plants every 1-2 years.",

"🌿 Use organic compost for healthier plants."

];

let tip=0;

setInterval(function(){

tip++;

if(tip>=tips.length){

tip=0;

}

document.getElementById("tipsText").innerHTML=

tips[tip];

},5000);

/*==================================
CHECKOUT
==================================*/

document.getElementById("checkout")

.addEventListener("click",function(){

if(cart.length==0){

alert("🛒 Your cart is empty!");

return;

}

alert(

"🌿 Thank you for shopping at Plantopia!\n\nYour order has been placed successfully."

);

cart=[];

updateCart();

});

/*==================================
BACK TO TOP
==================================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",function(){

if(window.scrollY>400){

topBtn.style.display="block";

}

else{

topBtn.style.display="none";

}

});

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/*==================================
END OF PROJECT
==================================*/

console.log(

"🌿 Plantopia Nursery Loaded Successfully"

);