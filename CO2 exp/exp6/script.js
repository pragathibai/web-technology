let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let happiness = 80;
let xp = 20;
let level = 1;

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const difficulty = document.getElementById("difficulty");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");

const happyBar = document.getElementById("happyBar");
const xpBar = document.getElementById("xpBar");
const petMood = document.getElementById("petMood");
const levelText = document.getElementById("level");

taskForm.addEventListener("submit", function(e){

e.preventDefault();

let task = {

id: Date.now(),

name: taskInput.value,

difficulty: difficulty.value,

completed: false

};

tasks.push(task);

saveTasks();

displayTasks();

taskForm.reset();

});

function displayTasks(){

taskList.innerHTML="";

let keyword = search.value.toLowerCase();

tasks
.filter(t=>t.name.toLowerCase().includes(keyword))
.forEach(task=>{

let card=document.createElement("div");

card.className="task";

if(task.completed){

card.classList.add("completed");

}

card.innerHTML=`

<div>

<h3>${task.name}</h3>

<p>Difficulty : ${task.difficulty}</p>

</div>

<div class="actions">

<button class="complete" onclick="completeTask(${task.id})">

✔

</button>

<button class="edit" onclick="editTask(${task.id})">

✏

</button>

<button class="delete" onclick="deleteTask(${task.id})">

🗑

</button>

</div>

`;

taskList.appendChild(card);

});

}

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

search.addEventListener("keyup",displayTasks);

displayTasks();
function completeTask(id){

tasks = tasks.map(task=>{

if(task.id===id && !task.completed){

task.completed=true;

happiness=Math.min(happiness+5,100);

if(task.difficulty==="Easy"){

xp+=10;

}

else if(task.difficulty==="Medium"){

xp+=20;

}

else{

xp+=30;

}

level=Math.floor(xp/100)+1;

updatePet();

}

return task;

});

saveTasks();

displayTasks();

}

function deleteTask(id){

tasks=tasks.filter(task=>task.id!==id);

happiness=Math.max(happiness-5,0);

updatePet();

saveTasks();

displayTasks();

}

function editTask(id){

let task=tasks.find(t=>t.id===id);

let newName=prompt("Edit Task",task.name);

if(newName!=null && newName.trim()!=""){

task.name=newName;

saveTasks();

displayTasks();

}

}

function updatePet(){

happyBar.style.width=happiness+"%";

xpBar.style.width=(xp%100)+"%";

levelText.innerText=level;

if(happiness>=80){

petMood.innerHTML="😄 Super Happy";

document.getElementById("pet").innerHTML="🐶";

}

else if(happiness>=50){

petMood.innerHTML="😊 Happy";

document.getElementById("pet").innerHTML="🐶";

}

else if(happiness>=20){

petMood.innerHTML="😐 Tired";

document.getElementById("pet").innerHTML="🐕";

}

else{

petMood.innerHTML="😢 Sad";

document.getElementById("pet").innerHTML="🐕‍🦺";

}

}

updatePet();
/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

themeBtn.innerHTML="☀️";

}else{

themeBtn.innerHTML="🌙";

}

});

/* ==========================
   PET MOTIVATION
========================== */

const pet=document.getElementById("pet");

const quotes=[

"🐶 Keep Going!",

"⭐ One task at a time!",

"💪 You can do it!",

"📚 Study now, relax later!",

"🏆 Productivity looks good on you!",

"🎯 Finish your goals today!",

"❤️ Buddy believes in you!"

];

pet.addEventListener("click",()=>{

let random=Math.floor(Math.random()*quotes.length);

alert(quotes[random]);

});

/* ==========================
   ENTER KEY SUPPORT
========================== */

taskInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

e.preventDefault();

taskForm.requestSubmit();

}

});

/* ==========================
   LEVEL UP MESSAGE
========================== */

let previousLevel=1;

function checkLevel(){

if(level>previousLevel){

alert("🎉 Congratulations!\nBuddy reached Level "+level);

previousLevel=level;

}

}

const oldUpdatePet=updatePet;

updatePet=function(){

oldUpdatePet();

checkLevel();

}

/* ==========================
   INITIAL LOAD
========================== */

displayTasks();

updatePet();