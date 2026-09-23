let cart=JSON.parse(localStorage.getItem('hutichaCart')||'[]');
let orders=JSON.parse(localStorage.getItem('hutichaOrders')||'[]');
function addCart(name,price){let item=cart.find(x=>x.name===name);if(item){item.qty++}else{cart.push({name,price,qty:1})}saveCart();render()}
function change(i,n){cart[i].qty+=n;if(cart[i].qty<=0){cart.splice(i,1)}saveCart();render()}
function saveCart(){localStorage.setItem('hutichaCart',JSON.stringify(cart))}
function render(){let box=document.getElementById('cart');if(!box)return;box.innerHTML='';let total=0;cart.forEach((x,i)=>{total+=x.price*x.qty;box.innerHTML+=`${x.name}<br><button onclick="change(${i},-1)">−</button> ${x.qty} <button onclick="change(${i},1)">+</button><br>`});document.getElementById('total').innerHTML='Tổng: '+total.toLocaleString()+'đ';let count=document.getElementById('cartCount');if(count)count.innerHTML=cart.reduce((a,b)=>a+b.qty,0)}
function checkout(){if(!cart.length)return;orders.push({time:new Date().toLocaleString('vi-VN'),items:[...cart],total:cart.reduce((a,b)=>a+b.price*b.qty,0),status:'Chờ xác nhận'});localStorage.setItem('hutichaOrders',JSON.stringify(orders));cart=[];saveCart();render();showOrders()}
function showOrders(){alert(orders.length?'Bạn có '+orders.length+' đơn hàng đã lưu':'Chưa có đơn hàng')}
function searchFood(){let v=document.getElementById('search').value.toLowerCase();document.querySelectorAll('.item').forEach(e=>e.style.display=e.innerText.toLowerCase().includes(v)?'block':'none')}
render();