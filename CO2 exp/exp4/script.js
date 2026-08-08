/*=========================================
 LOADING SCREEN
=========================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},700);

},1800);

});

/*=========================================
 DARK MODE
=========================================*/

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

};

/*=========================================
 SCROLL PROGRESS BAR
=========================================*/

window.addEventListener("scroll",()=>{

let scrollTop=document.documentElement.scrollTop;

let scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

let progress=(scrollTop/scrollHeight)*100;

document.getElementById("progressBar").style.width=progress+"%";

});

/*=========================================
 BACK TO TOP
=========================================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

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

/*=========================================
 MOBILE MENU
=========================================*/

const menu=document.querySelector(".menu");

const nav=document.querySelector(".nav-links");

menu.onclick=()=>{

nav.classList.toggle("show");

};

/*=========================================
 START BUTTON
=========================================*/

document.getElementById("startBtn").onclick=()=>{

document.getElementById("student").scrollIntoView({

behavior:"smooth"

});

};

/*=========================================
 RESET BUTTON
=========================================*/

document.getElementById("resetBtn").onclick=()=>{

location.reload();

};
/*=========================================
 ADD SUBJECT ROW
=========================================*/

const tableBody=document.getElementById("tableBody");

document.getElementById("addRow").onclick=function(){

let row=document.createElement("tr");

row.innerHTML=`

<td>

<input type="text" placeholder="Subject Name">

</td>

<td>

<input type="number" class="internal" min="0" max="40">

</td>

<td>

<input type="number" class="external" min="0" max="60">

</td>

<td>

<input type="number" class="credits" min="1" max="5">

</td>

<td>

<input type="text" class="total" readonly>

</td>

<td>

<button class="deleteRow">

🗑

</button>

</td>

`;

tableBody.appendChild(row);

};

/*=========================================
 DELETE SUBJECT ROW
=========================================*/

document.addEventListener("click",function(e){

if(e.target.classList.contains("deleteRow")){

e.target.parentElement.parentElement.remove();

}

});

/*=========================================
 CALCULATE RESULT
=========================================*/

document.getElementById("calculate").onclick=function(){

const rows=document.querySelectorAll("#tableBody tr");

let marks=[];

let resultBody=document.getElementById("resultBody");

resultBody.innerHTML="";

let totalMarks=0;

rows.forEach(row=>{

let subject=row.cells[0].querySelector("input").value;

let internal=parseFloat(row.querySelector(".internal").value)||0;

let external=parseFloat(row.querySelector(".external").value)||0;

let total=internal+external;

row.querySelector(".total").value=total;

marks.push(total);

totalMarks+=total;

/* Grade */

let grade="";

let status="PASS";

if(total>=91){

grade="O";

}

else if(total>=81){

grade="A+";

}

else if(total>=71){

grade="A";

}

else if(total>=61){

grade="B+";

}

else if(total>=50){

grade="B";

}

else{

grade="RA";

status="FAIL";

}

/* Result Table */

resultBody.innerHTML+=`

<tr>

<td>${subject}</td>

<td>${total}</td>

<td>${grade}</td>

<td>${status}</td>

</tr>

`;

});
/*=========================================
 FINAL CALCULATIONS
=========================================*/

let subjectCount=marks.length;

let average=0;
let percentage=0;
let highest=0;
let lowest=0;
let cgpa=0;
let grade="-";
let achievement="";
let rank="";

if(subjectCount>0){

average=totalMarks/subjectCount;

percentage=average;

highest=Math.max(...marks);

lowest=Math.min(...marks);

cgpa=(average/10).toFixed(2);

/* Overall Grade */

if(average>=91){

grade="O";
achievement="🏆 Gold Medal Candidate";
rank="Excellent - College Rank Possible";

}

else if(average>=81){

grade="A+";
achievement="🥇 Outstanding Performer";
rank="Excellent";

}

else if(average>=71){

grade="A";
achievement="🥈 Distinction";
rank="Very Good";

}

else if(average>=61){

grade="B+";
achievement="🥉 First Class";
rank="Good";

}

else if(average>=50){

grade="B";
achievement="📘 Pass";
rank="Average";

}

else{

grade="RA";
achievement="⚠ Improvement Required";
rank="Needs Improvement";

}

/* Dashboard */

document.getElementById("totalMarks").innerHTML=totalMarks;

document.getElementById("avgMarks").innerHTML=average.toFixed(2);

document.getElementById("percent").innerHTML=percentage.toFixed(2)+"%";

document.getElementById("overallGrade").innerHTML=grade;

document.getElementById("highest").innerHTML=highest;

document.getElementById("lowest").innerHTML=lowest;

document.getElementById("cgpa").innerHTML=cgpa;

document.getElementById("achievementText").innerHTML=achievement;

document.getElementById("rankPrediction").innerHTML=rank;

document.getElementById("resultStatus").innerHTML=
average>=50?"✅ PASS":"❌ FAIL";

/* Top Dashboard */

document.getElementById("totalSubjects").innerHTML=subjectCount;

document.getElementById("average").innerHTML=
average.toFixed(2);

document.getElementById("percentage").innerHTML=
percentage.toFixed(2)+"%";

document.getElementById("grade").innerHTML=grade;

/* Progress Bar */

document.getElementById("progressFill").style.width=
percentage+"%";

document.getElementById("progressFill").innerHTML=
percentage.toFixed(1)+"%";

/* Save Data */

localStorage.setItem("StudentName",
document.getElementById("studentName").value);

localStorage.setItem("RegisterNo",
document.getElementById("registerNo").value);

localStorage.setItem("Department",
document.getElementById("department").value);

localStorage.setItem("Semester",
document.getElementById("semester").value);

localStorage.setItem("Marks",
JSON.stringify(marks));

}

};

/*=========================================
 CLEAR ALL
=========================================*/

document.getElementById("clearAll").onclick=function(){

if(confirm("Clear all entered data?")){

location.reload();

}

};

/*=========================================
 LOAD SAVED DATA
=========================================*/

window.addEventListener("load",()=>{

if(localStorage.getItem("StudentName")){

document.getElementById("studentName").value=
localStorage.getItem("StudentName");

}

if(localStorage.getItem("RegisterNo")){

document.getElementById("registerNo").value=
localStorage.getItem("RegisterNo");

}

if(localStorage.getItem("Department")){

document.getElementById("department").value=
localStorage.getItem("Department");

}

if(localStorage.getItem("Semester")){

document.getElementById("semester").value=
localStorage.getItem("Semester");

}

});

/*=========================================
 FEEDBACK BUTTON
=========================================*/

document.getElementById("sendBtn").onclick=function(){

alert("✅ Thank you for your feedback!");

};

/*=========================================
 END OF SCRIPT
=========================================*/