/* ===========================
LOADING SCREEN
=========================== */

window.addEventListener("load", () => {

setTimeout(() => {

document.getElementById("loader").style.opacity = "0";

setTimeout(() => {

document.getElementById("loader").style.display = "none";

},800);

},2000);

});

/* ===========================
DARK MODE
=========================== */

const themeBtn=document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark");

themeBtn.innerHTML="☀️";

}

themeBtn.onclick=function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeBtn.innerHTML="☀️";

localStorage.setItem("theme","dark");

}

else{

themeBtn.innerHTML="🌙";

localStorage.setItem("theme","light");

}

}

/* ===========================
SCROLL PROGRESS BAR
=========================== */

window.onscroll=function(){

let scrollTop=document.documentElement.scrollTop;

let height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

let progress=(scrollTop/height)*100;

document.getElementById("progressBar").style.width=progress+"%";

}

/* ===========================
BACK TO TOP
=========================== */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}

else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ===========================
ANIMATED COUNTERS
=========================== */

const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{

const update=()=>{

const target=+counter.getAttribute("data-target");

const current=+counter.innerText;

const increment=Math.ceil(target/100);

if(current<target){

counter.innerText=current+increment;

setTimeout(update,25);

}

else{

counter.innerText=target+"+";

}

};

update();

});

/* ===========================
SMOOTH NAVIGATION
=========================== */

document.querySelectorAll('.nav-links a').forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const section=document.querySelector(this.getAttribute("href"));

section.scrollIntoView({

behavior:"smooth"

});

});

});

/* ===========================
ACTIVE NAVBAR
=========================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ===========================
MOBILE MENU
=========================== */

const menu=document.querySelector(".menu");

const nav=document.querySelector(".nav-links");

menu.onclick=()=>{

nav.classList.toggle("show");

};

/* ===========================
HERO BUTTON EFFECT
=========================== */

document.querySelectorAll(".heroButtons button").forEach(button=>{

button.addEventListener("mouseenter",()=>{

button.style.transform="translateY(-8px) scale(1.08)";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translateY(0px)";

});

});

/* ===========================
CARD ANIMATION
=========================== */

const cards=document.querySelectorAll(".glass");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const x=e.offsetX;

const y=e.offsetY;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,

rgba(255,255,255,.35),

rgba(255,255,255,.15))`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="";

});

});

/* ===========================
IMAGE POPUP
=========================== */

document.querySelectorAll(".galleryGrid img").forEach(img=>{

img.addEventListener("click",()=>{

window.open(img.src,"_blank");

});

});

/* ===========================
WELCOME MESSAGE
=========================== */

setTimeout(()=>{

console.log("Welcome to Saveetha University Website");

},2500);
