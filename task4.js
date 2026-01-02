let servicesData = [
    { id: 1, name:  "Dry Cleaning", price: 200, icon: "👕" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧺" },
    { id: 3, name: "Ironing", price: 30, icon: "💨" },
    { id: 4, name: "Stain Removal", price: 500, icon: "✨" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👞" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];
let categories =servicesData;
let index =0;
document.addEventListener("DOMContentLoaded",function () {
  services();
  displayitem();
});
function services() {
  

let services =document.getElementById('first-service-div-2');
services.innerHTML = categories.map(function (item ,id) {
  var { icon,name, price } = item;

  let isIncart =cart.some(cartItem => cartItem.id === item.id);
  let btntext= isIncart ?"remove button":"add button"  ;
  let btncolor = isIncart? "red":"#d0d6d2ff";
  let btnicon = isIncart ? ' &#8854;' : ' &#8853;';
  return (`
    
    <div class="btns">
    <p>${icon}</p>
    <p>${name}</p>
    <p>${price}.00</p>
    <button  style="background-color:${btncolor}" onclick='addcart(${id})'>${btntext} ${btnicon}</button>
    </div>
    `);
}).join('');
}

let cart= [];
function addcart(index){
  
let selectedItem =categories[index];
let cartIndex =cart.findIndex(item => item.id ===selectedItem.id);
if (cartIndex === -1) {
  cart.push(selectedItem);
} else {
  cart.splice(cartIndex, 1);
}
services()
  displayitem();
}

function displayitem() {
  let display=  document.getElementById('cart-display');
  let totalamount =document.getElementById('totalamount');
  if (cart.length ==0) {
  display.innerHTML ="";
  } else {
    let total =0;
    let index =0;
    display.innerHTML = cart.map((item)=>
    
    {
      let {name,price} = item;
      total += price;
      return(
        `
        <div class="cart-item">
        <p>${index +=1}</p>
        <p>${name}</p>
        <p >${price}</p>
        </div>`
      )
    }).join('');
  totalamount.innerHTML =`
  <hr>
  <div class="total">
  <p>total</p> 
  <h4> ${total}.00</h4>
  <div>`
  }
  
}

function sendemail() {
 
    const cartList = cart.map(item => `${item.name}: ${item.price}`).join('\n');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
  let parms = {
  from_name:document.getElementById('email').value,
    name :document.getElementById('name').value,
    title:cartList
 
  }
  emailjs.send("service_q79ovvp","template_qj1ccmw",parms )
  .then(function(response) {
            cart = [];
            services();
            displayitem();
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            alert("Error: " + error.text); 
        });
}
    
