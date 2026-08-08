/*====================================
LOADING SCREEN
====================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},800);

},2500);

});

/*====================================
THEME BUTTON
====================================*/

const theme=document.getElementById("theme");

theme.onclick=function(){

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

theme.innerHTML="☀️";

}

else{

theme.innerHTML="🌙";

}

};

/*====================================
HOUSE SELECTION
====================================*/

const houseButtons=document.querySelectorAll(".house button");

const houseName=document.getElementById("selectedHouse");

houseButtons.forEach(button=>{

button.onclick=function(){

let house=this.parentElement.querySelector("h2").innerText;

houseName.innerHTML=house;

alert("⚡ Welcome to "+house+"!");

};

});

/*====================================
QUIZ QUESTIONS
(Array of Objects)
====================================*/

const questions=[

{

question:"Which spell unlocks a locked door?",

options:[

"Alohomora",

"Lumos",

"Accio",

"Expelliarmus"

],

answer:"Alohomora"

},

{

question:"Who is the Headmaster of Hogwarts?",

options:[

"Dumbledore",

"Snape",

"Hagrid",

"Moody"

],

answer:"Dumbledore"

},

{

question:"Which house values bravery?",

options:[

"Gryffindor",

"Slytherin",

"Ravenclaw",

"Hufflepuff"

],

answer:"Gryffindor"

},

{

question:"Which creature delivers letters?",

options:[

"Owl",

"Dragon",

"Phoenix",

"Hippogriff"

],

answer:"Owl"

},

{

question:"Which spell creates light?",

options:[

"Lumos",

"Nox",

"Accio",

"Stupefy"

],

answer:"Lumos"

},

{

question:"What platform leaves for Hogwarts?",

options:[

"9¾",

"8½",

"7¾",

"10"

],

answer:"9¾"

},

{

question:"Which subject teaches potion making?",

options:[

"Potions",

"Charms",

"Flying",

"Divination"

],

answer:"Potions"

},

{

question:"Who keeps the Hogwarts keys?",

options:[

"Hagrid",

"Harry",

"Snape",

"Ron"

],

answer:"Hagrid"

},

{

question:"What sport is played on broomsticks?",

options:[

"Quidditch",

"Football",

"Cricket",

"Chess"

],

answer:"Quidditch"

},

{

question:"Which spell summons an object?",

options:[

"Accio",

"Lumos",

"Alohomora",

"Expecto Patronum"

],

answer:"Accio"

}

];

/*====================================
VARIABLES
====================================*/

let currentQuestion=0;

let score=0;

let xp=0;

let housePoints=0;

let lives=3;
/*====================================
DISPLAY QUESTION
====================================*/

const questionText=document.getElementById("questionText");

const optionButtons=document.querySelectorAll(".option");

function loadQuestion(){

let q=questions[currentQuestion];

document.getElementById("questionNumber").innerHTML=currentQuestion+1;

document.getElementById("currentQuestion").innerHTML=currentQuestion+1;

questionText.innerHTML=q.question;

optionButtons.forEach((button,index)=>{

button.innerHTML=q.options[index];

button.classList.remove("correct");

button.classList.remove("wrong");

button.disabled=false;

});

updateProgress();

}

loadQuestion();

/*====================================
OPTION CLICK
====================================*/

optionButtons.forEach(button=>{

button.addEventListener("click",function(){

let selected=this.innerHTML;

let correct=questions[currentQuestion].answer;

/* Disable Buttons */

optionButtons.forEach(btn=>{

btn.disabled=true;

});

/* Correct */

if(selected===correct){

this.classList.add("correct");

score+=10;

xp+=20;

housePoints+=10;

}

/* Wrong */

else{

this.classList.add("wrong");

lives--;

if(lives<0){

lives=0;

}

/* Highlight Correct */

optionButtons.forEach(btn=>{

if(btn.innerHTML===correct){

btn.classList.add("correct");

}

});

}

/* Update Dashboard */

document.getElementById("score").innerHTML=score;

document.getElementById("xp").innerHTML=xp;

document.getElementById("points").innerHTML=housePoints;

document.getElementById("lives").innerHTML=

"❤️".repeat(lives);

if(lives===0){

setTimeout(()=>{

alert("💀 Game Over!");

location.reload();

},1000);

}

});

});

/*====================================
NEXT QUESTION
====================================*/

document.getElementById("nextBtn").onclick=function(){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}

else{

showResult();

}

};

/*====================================
SKIP QUESTION
====================================*/

document.getElementById("skipBtn").onclick=function(){

currentQuestion++;

if(currentQuestion<questions.length){

loadQuestion();

}

else{

showResult();

}

};

/*====================================
PROGRESS BAR
====================================*/

function updateProgress(){

let progress=


((currentQuestion+1)/questions.length)*100;

document.getElementById("progressFill").style.width=

progress+"%";

document.getElementById("progressFill").innerHTML=

Math.round(progress)+"%";

}
/*====================================
TIMER
====================================*/

let timeLeft=30;

let timer=setInterval(updateTimer,1000);

function updateTimer(){

document.getElementById("timer").innerHTML=timeLeft+" s";

document.getElementById("bigTimer").innerHTML=timeLeft;

timeLeft--;

if(timeLeft<0){

currentQuestion++;

timeLeft=30;

if(currentQuestion<questions.length){

loadQuestion();

}

else{

showResult();

}

}

}

/*====================================
RESET TIMER
====================================*/

function resetTimer(){

clearInterval(timer);

timeLeft=30;

timer=setInterval(updateTimer,1000);

}

/*====================================
NEXT BUTTON TIMER RESET
====================================*/

document.getElementById("nextBtn").addEventListener("click",()=>{

resetTimer();

});

document.getElementById("skipBtn").addEventListener("click",()=>{

resetTimer();

});

/*====================================
FINAL RESULT
====================================*/

function showResult(){

clearInterval(timer);

let percentage=(score/(questions.length*10))*100;

let grade="";

let message="";

if(percentage>=90){

grade="Outstanding";

message="🏆 You are a true Hogwarts Champion!";

}

else if(percentage>=75){

grade="Excellent";

message="✨ Great magical knowledge!";

}

else if(percentage>=60){

grade="Good";

message="🪄 Keep practicing your spells!";

}

else{

grade="Needs Practice";

message="📚 Visit the Hogwarts Library and try again.";

}

/* Update Certificate */

document.getElementById("certificateName").innerHTML=

houseName.innerHTML=="Not Selected"

?"Student Wizard"

:houseName.innerHTML+" Wizard";

/* Result Popup */

setTimeout(()=>{

alert(

"🎉 QUIZ COMPLETED!\n\n"+

"Score : "+score+"\n"+

"Percentage : "+percentage.toFixed(1)+"%\n"+

"Grade : "+grade+"\n\n"+

message

);

document.querySelector(".certificateSection")

.scrollIntoView({

behavior:"smooth"

});

},500);

}

/*====================================
DOWNLOAD CERTIFICATE
====================================*/

document.getElementById("downloadCertificate")

.onclick=function(){

window.print();

};

/*====================================
BACK TO TOP
====================================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

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

/*====================================
SAVE THEME
====================================*/

if(localStorage.getItem("wizardTheme")=="light"){

document.body.classList.add("light");

theme.innerHTML="☀️";

}

theme.addEventListener("click",()=>{

if(document.body.classList.contains("light")){

localStorage.setItem("wizardTheme","light");

}

else{

localStorage.setItem("wizardTheme","dark");

}

});

/*====================================
START QUIZ BUTTON
====================================*/

document.getElementById("startQuiz")

.onclick=function(){

document.getElementById("quiz")

.scrollIntoView({

behavior:"smooth"

});

};

/*====================================
KEYBOARD SHORTCUT
====================================*/

document.addEventListener("keydown",function(e){

if(e.key==="ArrowRight"){

document.getElementById("nextBtn").click();

}

});

/*====================================
END OF SCRIPT
====================================*/