/*====================================
LOADER
====================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},700);

},2500);

});

/*====================================
LIVE DIGITAL CLOCK
====================================*/

function updateClock(){

const now=new Date();

let hour=String(now.getHours()).padStart(2,"0");

let minute=String(now.getMinutes()).padStart(2,"0");

let second=String(now.getSeconds()).padStart(2,"0");

document.getElementById("digitalClock").innerHTML=

hour+" : "+minute+" : "+second;

}

setInterval(updateClock,1000);

updateClock();

/*====================================
CURRENT DATE
====================================*/

function updateDate(){

const now=new Date();

const months=[

"January","February","March","April",

"May","June","July","August",

"September","October","November","December"

];

const days=[

"Sunday","Monday","Tuesday",

"Wednesday","Thursday",

"Friday","Saturday"

];

document.getElementById("currentDate").innerHTML=

now.getDate()+" "+

months[now.getMonth()]+" "+

now.getFullYear();

document.getElementById("currentDay").innerHTML=

days[now.getDay()];

}

updateDate();

/*====================================
THEME
====================================*/

const theme=document.getElementById("theme");

if(localStorage.getItem("airportTheme")=="light"){

document.body.classList.add("light");

theme.innerHTML="☀️";

}

theme.onclick=function(){

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem("airportTheme","light");

theme.innerHTML="☀️";

}

else{

localStorage.setItem("airportTheme","dark");

theme.innerHTML="🌙";

}

};
/*====================================
BOARDING COUNTDOWN
====================================*/

/*
Change this date and time to your preferred
flight departure.

Format:
Year, Month(0-11), Day, Hour, Minute, Second
*/

const departureTime=new Date(

2026,

7,

25,

19,

45,

0

);

function updateCountdown(){

const now=new Date();

const difference=departureTime-now;

if(difference<=0){

document.getElementById("days").innerHTML="00";

document.getElementById("hours").innerHTML="00";

document.getElementById("minutes").innerHTML="00";

document.getElementById("seconds").innerHTML="00";

flightDeparted();

return;

}

const days=Math.floor(

difference/(1000*60*60*24)

);

const hours=Math.floor(

(difference%(1000*60*60*24))

/

(1000*60*60)

);

const minutes=Math.floor(

(difference%(1000*60*60))

/

(1000*60)

);

const seconds=Math.floor(

(difference%(1000*60))

/

1000

);

document.getElementById("days").innerHTML=

String(days).padStart(2,"0");

document.getElementById("hours").innerHTML=

String(hours).padStart(2,"0");

document.getElementById("minutes").innerHTML=

String(minutes).padStart(2,"0");

document.getElementById("seconds").innerHTML=

String(seconds).padStart(2,"0");

}

setInterval(updateCountdown,1000);

updateCountdown();

/*====================================
FLIGHT DEPARTED
====================================*/

function flightDeparted(){

const boarding=document.querySelector(".boarding");

if(boarding){

boarding.innerHTML="DEPARTED";

boarding.style.color="#888";

}

document.getElementById("announcement").innerHTML=

"✈ Flight AI276 has departed successfully.";

}

/*====================================
AIRPORT ANNOUNCEMENTS
====================================*/

const announcements=[

"📢 Welcome to AeroSync International Airport.",

"🛫 Flight AI276 to Singapore is boarding at Gate B12.",

"🧳 Please keep your boarding pass ready.",

"🛂 Security check is mandatory for all passengers.",

"☕ Visit our lounge while waiting for your flight.",

"📢 Thank you for choosing AeroSync Airlines."

];

let announcementIndex=0;

setInterval(()=>{

announcementIndex++;

if(announcementIndex>=announcements.length){

announcementIndex=0;

}

document.getElementById("announcement").innerHTML=

announcements[announcementIndex];

},5000);
/*====================================
WORLD CLOCKS
====================================*/

function updateWorldClocks(){

const now=new Date();

/* Chennai */

document.getElementById("indiaTime").innerHTML=

now.toLocaleTimeString("en-IN",{

hour:"2-digit",

minute:"2-digit",

hour12:false

});

/* Singapore */

document.getElementById("singaporeTime").innerHTML=

now.toLocaleTimeString("en-SG",{

timeZone:"Asia/Singapore",

hour:"2-digit",

minute:"2-digit",

hour12:false

});

/* Dubai */

document.getElementById("dubaiTime").innerHTML=

now.toLocaleTimeString("en-AE",{

timeZone:"Asia/Dubai",

hour:"2-digit",

minute:"2-digit",

hour12:false

});

/* London */

document.getElementById("londonTime").innerHTML=

now.toLocaleTimeString("en-GB",{

timeZone:"Europe/London",

hour:"2-digit",

minute:"2-digit",

hour12:false

});

}

setInterval(updateWorldClocks,1000);

updateWorldClocks();

/*====================================
BACK TO TOP
====================================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

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

/*====================================
BOARDING STATUS EFFECT
====================================*/

const boarding=document.querySelector(".boarding");

if(boarding){

setInterval(()=>{

boarding.style.visibility="hidden";

setTimeout(()=>{

boarding.style.visibility="visible";

},500);

},1000);

}

/*====================================
KEYBOARD SHORTCUT
====================================*/

document.addEventListener("keydown",(event)=>{

if(event.key==="Home"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

/*====================================
LAST UPDATED
====================================*/

console.log(

"Airport Display Updated Successfully"

);

/*====================================
END OF SCRIPT
====================================*/

