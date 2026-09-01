/* =========================================================
   SIMATS STUDENT PORTAL - COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   1. COURSE DATA
========================================================= */

const courses = [

    // CSE - Semester 1
    {
        code: "CSE101",
        name: "Programming Fundamentals",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 1"
    },

    {
        code: "MAT101",
        name: "Engineering Mathematics I",
        credits: 4,
        type: "Foundation",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 1"
    },

    {
        code: "PHY101",
        name: "Engineering Physics",
        credits: 3,
        type: "Foundation",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 1"
    },

    {
        code: "ENG101",
        name: "Communication Skills",
        credits: 2,
        type: "Foundation",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 1"
    },


    // CSE - Semester 2
    {
        code: "CSE201",
        name: "Data Structures",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 2"
    },

    {
        code: "CSE202",
        name: "Object Oriented Programming",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 2"
    },


    // CSE - Semester 3
    {
        code: "CSE301",
        name: "Database Management Systems",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 3"
    },

    {
        code: "CSE302",
        name: "Operating Systems",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 3"
    },

    {
        code: "CSE303",
        name: "Computer Networks",
        credits: 3,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 3"
    },

    {
        code: "CSE304",
        name: "Algorithms",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 3"
    },

    {
        code: "CSE305",
        name: "Statistics for Computing",
        credits: 3,
        type: "Foundation",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 3"
    },


    // CSE - Semester 4
    {
        code: "CSE401",
        name: "Web Technology",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 4"
    },

    {
        code: "CSE402",
        name: "Software Engineering",
        credits: 3,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 4"
    },


    // CSE - Semester 5
    {
        code: "CSE501",
        name: "Artificial Intelligence",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 5"
    },

    {
        code: "CSE502",
        name: "Machine Learning",
        credits: 4,
        type: "Core",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 5"
    },


    // CSE - Semester 6
    {
        code: "CSE601",
        name: "Cloud Computing",
        credits: 3,
        type: "Elective",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 6"
    },


    // CSE - Semester 7
    {
        code: "CSE701",
        name: "Cyber Security",
        credits: 3,
        type: "Elective",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 7"
    },


    // CSE - Semester 8
    {
        code: "CSE801",
        name: "Project Work",
        credits: 8,
        type: "Project",
        department: "CSE",
        departmentName: "Computer Science & Engineering",
        semester: "Semester 8"
    },


    // ECE
    {
        code: "ECE101",
        name: "Basic Electronics",
        credits: 4,
        type: "Core",
        department: "ECE",
        departmentName: "Electronics & Communication Engineering",
        semester: "Semester 1"
    },

    {
        code: "ECE201",
        name: "Digital Electronics",
        credits: 3,
        type: "Core",
        department: "ECE",
        departmentName: "Electronics & Communication Engineering",
        semester: "Semester 2"
    },

    {
        code: "ECE301",
        name: "Signals and Systems",
        credits: 4,
        type: "Core",
        department: "ECE",
        departmentName: "Electronics & Communication Engineering",
        semester: "Semester 3"
    },


    // EEE
    {
        code: "EEE101",
        name: "Basic Electrical Engineering",
        credits: 4,
        type: "Core",
        department: "EEE",
        departmentName: "Electrical & Electronics Engineering",
        semester: "Semester 1"
    },

    {
        code: "EEE201",
        name: "Circuit Theory",
        credits: 4,
        type: "Core",
        department: "EEE",
        departmentName: "Electrical & Electronics Engineering",
        semester: "Semester 2"
    },


    // Mechanical
    {
        code: "ME101",
        name: "Engineering Mechanics",
        credits: 4,
        type: "Core",
        department: "MECH",
        departmentName: "Mechanical Engineering",
        semester: "Semester 1"
    },

    {
        code: "ME201",
        name: "Thermodynamics",
        credits: 4,
        type: "Core",
        department: "MECH",
        departmentName: "Mechanical Engineering",
        semester: "Semester 2"
    }

];


/* =========================================================
   2. DISPLAY COURSES IN HTML TABLE
========================================================= */

function displayCourses(list = courses) {

    const tableBody = document.getElementById("courseTableBody");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    if (list.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No courses found.
                </td>
            </tr>
        `;

        return;
    }


    list.forEach(course => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="course-code">
                    ${course.code}
                </span>
            </td>

            <td>
                ${course.name}
            </td>

            <td>
                <span class="credit">
                    ${course.credits}
                </span>
            </td>

            <td>
                ${course.type}
            </td>

            <td>
                ${course.departmentName}
            </td>

            <td>
                ${course.semester}
            </td>
        `;

        tableBody.appendChild(row);

    });

}


/* =========================================================
   3. COURSE FILTER
========================================================= */

function filterCourses() {

    const departmentElement =
        document.getElementById("departmentFilter");

    const semesterElement =
        document.getElementById("semesterFilter");

    const searchElement =
        document.getElementById("searchCourse");


    const department =
        departmentElement
            ? departmentElement.value
            : "all";

    const semester =
        semesterElement
            ? semesterElement.value
            : "all";

    const search =
        searchElement
            ? searchElement.value.toLowerCase().trim()
            : "";


    const filteredCourses = courses.filter(course => {

        const departmentMatch =
            department === "all" ||
            course.department === department;


        const semesterMatch =
            semester === "all" ||
            course.semester === semester;


        const searchMatch =
            course.code.toLowerCase().includes(search) ||
            course.name.toLowerCase().includes(search) ||
            course.departmentName.toLowerCase().includes(search);


        return (
            departmentMatch &&
            semesterMatch &&
            searchMatch
        );

    });


    displayCourses(filteredCourses);

}


/* =========================================================
   4. REGISTRATION COURSE MAPPING
========================================================= */

function updateRegistrationCourses() {

    const departmentElement =
        document.getElementById("registrationDepartment");

    const semesterElement =
        document.getElementById("registrationSemester");

    const container =
        document.getElementById("registrationCourses");


    if (!departmentElement ||
        !semesterElement ||
        !container) {

        return;
    }


    const department =
        departmentElement.value;

    const semester =
        semesterElement.value;


    const matchingCourses = courses.filter(course =>

        course.department === department &&
        course.semester === semester

    );


    container.innerHTML = "";


    if (matchingCourses.length === 0) {

        container.innerHTML = `
            <p style="color:#8997ad; padding:15px;">
                No courses available for this department
                and semester.
            </p>
        `;

        updateSummary();

        return;
    }


    matchingCourses.forEach(course => {

        const label =
            document.createElement("label");

        label.className = "course-option";


        label.innerHTML = `

            <input
                type="checkbox"
                value="${course.code}"
                data-credit="${course.credits}"
                onchange="updateSummary()"
            >

            <div>

                <strong>
                    ${course.code} — ${course.name}
                </strong>

                <small>
                    ${course.type} • ${course.semester}
                </small>

            </div>

            <span class="course-credit">
                ${course.credits} Cr
            </span>

        `;


        container.appendChild(label);

    });


    updateSummary();

}


/* =========================================================
   5. CALCULATE TOTAL COURSES + CREDITS
========================================================= */

function calculateTotals() {

    const selected =
        document.querySelectorAll(
            '#registrationCourses input[type="checkbox"]:checked'
        );


    let totalCourses = 0;
    let totalCredits = 0;


    selected.forEach(course => {

        totalCourses++;

        totalCredits +=
            Number(course.dataset.credit);

    });


    return {
        totalCourses,
        totalCredits
    };

}


/* =========================================================
   6. UPDATE REGISTRATION SUMMARY
========================================================= */

function updateSummary() {

    const totals =
        calculateTotals();


    const selectedCount =
        document.getElementById("selectedCount");

    const summaryCourses =
        document.getElementById("summaryCourses");

    const totalCredits =
        document.getElementById("totalCredits");

    const summaryMessage =
        document.getElementById("summaryMessage");


    if (selectedCount) {

        selectedCount.textContent =
            `${totals.totalCourses} Selected`;

    }


    if (summaryCourses) {

        summaryCourses.textContent =
            totals.totalCourses;

    }


    if (totalCredits) {

        totalCredits.textContent =
            totals.totalCredits;

    }


    if (summaryMessage) {

        if (totals.totalCourses === 0) {

            summaryMessage.textContent =
                "No courses selected yet.";

        } else {

            summaryMessage.textContent =
                `${totals.totalCourses} course(s) selected successfully.`;

        }

    }


    updateProgress();

}


/* =========================================================
   7. UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const name =
        document.getElementById("studentName");

    const email =
        document.getElementById("email");

    const register =
        document.getElementById("registerNumber");

    const department =
        document.getElementById("registrationDepartment");

    const semester =
        document.getElementById("registrationSemester");


    let progress = 0;


    if (register && register.value.trim() !== "") {

        progress += 20;

    }


    if (name && name.value.trim() !== "") {

        progress += 20;

    }


    if (email && email.value.trim() !== "") {

        progress += 20;

    }


    if (department && department.value !== "") {

        progress += 20;

    }


    const selectedCourses =
        document.querySelectorAll(
            '#registrationCourses input:checked'
        );


    if (
        semester &&
        semester.value !== "" &&
        selectedCourses.length > 0
    ) {

        progress += 20;

    }


    const progressBar =
        document.getElementById("progress");

    const progressText =
        document.getElementById("progressText");


    if (progressBar) {

        progressBar.style.width =
            progress + "%";

    }


    if (progressText) {

        progressText.textContent =
            progress + "%";

    }

}


/* =========================================================
   8. UPDATE STUDENT SUMMARY
========================================================= */

function updateStudentSummary() {

    const name =
        document.getElementById("studentName");

    const register =
        document.getElementById("registerNumber");


    const summaryStudent =
        document.getElementById("summaryStudent");

    const summaryRegister =
        document.getElementById("summaryRegister");


    if (name && summaryStudent) {

        summaryStudent.textContent =
            name.value.trim() || "-";

    }


    if (register && summaryRegister) {

        summaryRegister.textContent =
            register.value.trim() || "-";

    }


    updateProgress();

}


/* =========================================================
   9. UPDATE DEPARTMENT + SEMESTER SUMMARY
========================================================= */

function updateDepartmentSummary() {

    const department =
        document.getElementById("registrationDepartment");

    const summaryDepartment =
        document.getElementById("summaryDepartment");


    if (department && summaryDepartment) {

        const selectedOption =
            department.options[
                department.selectedIndex
            ];


        summaryDepartment.textContent =
            selectedOption.text;

    }


    updateProgress();

}


function updateSemesterSummary() {

    const semester =
        document.getElementById("registrationSemester");

    const summarySemester =
        document.getElementById("summarySemester");


    if (semester && summarySemester) {

        summarySemester.textContent =
            semester.value;

    }


    updateProgress();

}


/* =========================================================
   10. FORM VALIDATION
========================================================= */

function submitRegistration() {

    const registerNumber =
        document.getElementById("registerNumber");

    const studentName =
        document.getElementById("studentName");

    const email =
        document.getElementById("email");

    const department =
        document.getElementById("registrationDepartment");

    const semester =
        document.getElementById("registrationSemester");


    /* Register number */

    if (
        !registerNumber ||
        registerNumber.value.trim() === ""
    ) {

        alert("Please enter Register Number.");

        registerNumber.focus();

        return;

    }


    /* Student name */

    if (
        !studentName ||
        studentName.value.trim() === ""
    ) {

        alert("Please enter Student Name.");

        studentName.focus();

        return;

    }


    /* Email */

    if (
        !email ||
        email.value.trim() === ""
    ) {

        alert("Please enter Email.");

        email.focus();

        return;

    }


    /* Proper email validation */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email.value.trim())) {

        alert(
            "Please enter a valid email address."
        );

        email.focus();

        return;

    }


    /* Department */

    if (
        !department ||
        department.value === ""
    ) {

        alert("Please select Department.");

        return;

    }


    /* Semester */

    if (
        !semester ||
        semester.value === ""
    ) {

        alert("Please select Semester.");

        return;

    }


    /* Course selection */

    const selected =
        document.querySelectorAll(
            '#registrationCourses input[type="checkbox"]:checked'
        );


    if (selected.length === 0) {

        alert(
            "Please select at least one course."
        );

        return;

    }


    /* Successful registration */

    const totals =
        calculateTotals();


    alert(
        "Registration Successful!\n\n" +
        "Student: " +
        studentName.value.trim() +
        "\nRegister Number: " +
        registerNumber.value.trim() +
        "\nCourses Selected: " +
        totals.totalCourses +
        "\nTotal Credits: " +
        totals.totalCredits
    );

}


/* =========================================================
   11. CLEAR FORM
========================================================= */

function clearForm() {

    const studentName =
        document.getElementById("studentName");

    const email =
        document.getElementById("email");

    const mobile =
        document.getElementById("mobile");


    if (studentName) {

        studentName.value = "";

    }


    if (email) {

        email.value = "";

    }


    if (mobile) {

        mobile.value = "";

    }


    const checkboxes =
        document.querySelectorAll(
            '#registrationCourses input[type="checkbox"]'
        );


    checkboxes.forEach(box => {

        box.checked = false;

    });


    updateStudentSummary();

    updateSummary();

}


/* =========================================================
   12. NAVIGATION
========================================================= */

function goToCourses() {

    const section =
        document.getElementById("courses");


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


function goToRegistration() {

    const section =
        document.getElementById("registration");


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   13. DARK / LIGHT MODE
========================================================= */

function toggleTheme() {

    document.body.classList.toggle("light-mode");


    const button =
        document.querySelector(".theme-btn");


    if (button) {

        if (
            document.body.classList.contains(
                "light-mode"
            )
        ) {

            button.textContent = "🌙";

        } else {

            button.textContent = "☀";

        }

    }

}


/* =========================================================
   14. LIVE FORM LISTENERS
========================================================= */

document.addEventListener("DOMContentLoaded", function() {


    /* Display course table */

    displayCourses();


    /* Display registration courses */

    updateRegistrationCourses();


    /* Student name */

    const studentName =
        document.getElementById("studentName");


    if (studentName) {

        studentName.addEventListener(
            "input",
            updateStudentSummary
        );

    }


    /* Register number */

    const registerNumber =
        document.getElementById("registerNumber");


    if (registerNumber) {

        registerNumber.addEventListener(
            "input",
            updateStudentSummary
        );

    }


    /* Email */

    const email =
        document.getElementById("email");


    if (email) {

        email.addEventListener(
            "input",
            updateProgress
        );

    }


    /* Department */

    const department =
        document.getElementById(
            "registrationDepartment"
        );


    if (department) {

        department.addEventListener(
            "change",
            function() {

                updateDepartmentSummary();

                updateRegistrationCourses();

            }
        );

    }


    /* Semester */

    const semester =
        document.getElementById(
            "registrationSemester"
        );


    if (semester) {

        semester.addEventListener(
            "change",
            function() {

                updateSemesterSummary();

                updateRegistrationCourses();

            }
        );

    }


});


/* =========================================================
   END OF SCRIPT
========================================================= */