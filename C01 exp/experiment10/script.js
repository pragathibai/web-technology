// ================================
// COLLEGE WEBSITE JAVASCRIPT
// ================================

// Highlight Active Navigation Link
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// ================================
// REGISTRATION FORM VALIDATION
// ================================

const form = document.getElementById("registrationForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let department = document.getElementById("department").value;
        let password = document.getElementById("password").value;

        if (name === "") {
            alert("Please enter your name.");
            return;
        }

        if (email === "") {
            alert("Please enter your email.");
            return;
        }

        if (!email.includes("@")) {
            alert("Enter a valid email address.");
            return;
        }

        if (phone.length !== 10 || isNaN(phone)) {
            alert("Phone number must contain 10 digits.");
            return;
        }

        if (department === "") {
            alert("Please select a department.");
            return;
        }

        if (password.length < 6) {
            alert("Password should contain at least 6 characters.");
            return;
        }

        alert("🎉 Registration Successful!");

        form.reset();

    });

}

// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit",function(e){

e.preventDefault();

alert("📩 Your message has been sent successfully!");

contactForm.reset();

});

}

// ================================
// SCROLL ANIMATION
// ================================

const cards = document.querySelectorAll(".card");

function revealCards(){

const trigger = window.innerHeight * 0.85;

cards.forEach(card=>{

const top = card.getBoundingClientRect().top;

if(top<trigger){

card.style.opacity="1";
card.style.transform="translateY(0px)";

}

});

}

cards.forEach(card=>{

card.style.opacity="0";
card.style.transform="translateY(40px)";
card.style.transition="0.8s";

});

window.addEventListener("scroll",revealCards);

revealCards();

// ================================
// HERO BUTTON EFFECT
// ================================

const buttons=document.querySelectorAll(".btn");

buttons.forEach(button=>{

button.addEventListener("mouseenter",function(){

button.style.transform="scale(1.08)";

});

button.addEventListener("mouseleave",function(){

button.style.transform="scale(1)";

});

});

// ================================
// FOOTER YEAR
// ================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}