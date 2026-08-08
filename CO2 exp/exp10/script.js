/*==================================
LOADER
==================================*/

window.onload=function(){

setTimeout(function(){

document.getElementById("loader").style.display="none";

console.log("Application Loaded Successfully");

},1800);

};

/*==================================
VARIABLES
==================================*/

let bugs=5;

let fixed=0;

/*==================================
UPDATE DASHBOARD
==================================*/

function updateDashboard(){

document.getElementById("bugs").innerHTML=bugs;

document.getElementById("fixed").innerHTML=fixed;

let score=(fixed/5)*100;

document.getElementById("score").innerHTML=

score+"%";

}

/*==================================
CONSOLE
==================================*/

function addConsole(message,color){

let output=document.getElementById("consoleOutput");

output.innerHTML+=

`<p style="color:${color}">${message}</p>`;

output.scrollTop=output.scrollHeight;

console.log(message);

}

/*==================================
CLEAR CONSOLE
==================================*/

document.getElementById("clearConsole")

.onclick=function(){

document.getElementById("consoleOutput").innerHTML="";

console.clear();

};

/*==================================
START BUTTON
==================================*/

document.getElementById("startDebug")

.onclick=function(){

addConsole(

"🚀 Debugging Session Started",

"#58a6ff"

);

};
/*==================================
HTML BUG
==================================*/

function htmlBug(){

document.getElementById("htmlCode").innerHTML=

"&lt;button&gt;<br>Click Me";

document.getElementById("htmlStatus").innerHTML=

"❌ HTML Error";

document.getElementById("previewText").innerHTML=

"HTML Structure Broken";

addConsole(

"❌ HTML Error : Missing Closing Button Tag",

"#f85149"

);

}

/*==================================
FIX HTML
==================================*/

function fixHTML(){

document.getElementById("htmlCode").innerHTML=

"&lt;button&gt;<br>Click Me<br>&lt;/button&gt;";

document.getElementById("htmlStatus").innerHTML=

"✅ Fixed";

document.getElementById("previewText").innerHTML=

"Application Running Successfully ✅";

bugs--;

fixed++;

updateDashboard();

addConsole(

"✔ HTML Error Fixed",

"#3fb950"

);

}

/*==================================
CSS BUG
==================================*/

function cssBug(){

document.getElementById("cssCode").innerHTML=

`button{

background:red

color:white;

}`;

document.getElementById("cssStatus").innerHTML=

"❌ CSS Error";

document.getElementById("demoButton").style.background=

"red";

addConsole(

"❌ CSS Error : Missing Semicolon",

"#f85149"

);

}

/*==================================
FIX CSS
==================================*/

function fixCSS(){

document.getElementById("cssCode").innerHTML=

`button{

background:green;

color:white;

}`;

document.getElementById("cssStatus").innerHTML=

"✅ Fixed";

document.getElementById("demoButton").style.background=

"#238636";

bugs--;

fixed++;

updateDashboard();

addConsole(

"✔ CSS Error Fixed",

"#3fb950"

);

}
/*==================================
JAVASCRIPT BUG
==================================*/

function jsBug(){

document.getElementById("jsCode").innerHTML=

`function run(){

console.log(data);

}`;

document.getElementById("jsStatus").innerHTML=

"❌ JavaScript Error";

document.getElementById("previewText").innerHTML=

"JavaScript Execution Failed";

addConsole(

"❌ ReferenceError : data is not defined",

"#f85149"

);

}

/*==================================
FIX JAVASCRIPT
==================================*/

function fixJS(){

document.getElementById("jsCode").innerHTML=

`function run(){

let data="Application Running";

console.log(data);

}`;

document.getElementById("jsStatus").innerHTML=

"✅ Fixed";

document.getElementById("previewText").innerHTML=

"Application Running Successfully ✅";

bugs--;

fixed++;

updateDashboard();

addConsole(

"✔ JavaScript Error Fixed",

"#3fb950"

);

checkCompletion();

}

/*==================================
TRY...CATCH DEMO
==================================*/

function demoTryCatch(){

try{

debugger;

undefinedFunction();

}

catch(error){

addConsole(

"🛡 try...catch : "+error.message,

"#f7b731"

);

console.log(error);

}

}

demoTryCatch();

/*==================================
CHECK COMPLETION
==================================*/

function checkCompletion(){

if(fixed>=3){

document.getElementById("overallStatus").innerHTML=

"🏆 Debug Master";

addConsole(

"🎉 All Bugs Fixed Successfully!",

"#3fb950"

);

}

}

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
THEME BUTTON
==================================*/

document.getElementById("theme")

.onclick=function(){

document.body.classList.toggle("light");

addConsole(

"🎨 Theme Changed",

"#58a6ff"

);

};

/*==================================
END
==================================*/

updateDashboard();

console.log(

"CodeFix Studio Ready"

);