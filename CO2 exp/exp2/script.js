document.getElementById("studentForm").addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();

let reg=document.getElementById("regno").value.trim();

let dept=document.getElementById("dept").value;

let year=document.getElementById("year").value;

let dob=document.getElementById("dob").value;

let email=document.getElementById("email").value.trim();

let phone=document.getElementById("phone").value.trim();

let address=document.getElementById("address").value.trim();

let city=document.getElementById("city").value.trim();

let state=document.getElementById("state").value.trim();

let pin=document.getElementById("pin").value.trim();

let password=document.getElementById("password").value;

let confirm=document.getElementById("confirm").value;

let terms=document.getElementById("terms").checked;

let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let phonePattern=/^[0-9]{10}$/;

let pinPattern=/^[0-9]{6}$/;

let gender=document.querySelector('input[name="gender"]:checked');

if(name==""||reg==""||dept==""||year==""||dob==""||email==""||phone==""||address==""||city==""||state==""||pin==""||password==""||confirm==""){

alert("Please fill all mandatory fields");

return;

}

if(!gender){

alert("Select Gender");

return;

}

if(!emailPattern.test(email)){

alert("Invalid Email");

return;

}

if(!phonePattern.test(phone)){

alert("Phone Number must contain 10 digits");

return;

}

if(!pinPattern.test(pin)){

alert("PIN Code must contain 6 digits");

return;

}

if(password.length<6){

alert("Password must be at least 6 characters");

return;

}

if(password!=confirm){

alert("Passwords do not match");

return;

}

if(!terms){

alert("Accept Terms & Conditions");

return;

}

document.getElementById("message").style.color="green";

document.getElementById("message").innerHTML="🎉 Registration Successful!";

});