const form = document.getElementById("gpa-form");
const gpaValue = document.getElementById("gpa-value");

// Function to add a new row
const addRow = function() {
    const newRow = document.createElement("div");
    newRow.classList.add("row");

    const courseLabel = document.createElement("label");
    const courseInput = document.createElement("input");

    const gradeLabel = document.createElement("label");
    const gradeInput = document.createElement("input");

    const creditLabel = document.createElement("label");
    const creditInput = document.createElement("input");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Row";
    removeButton.type = "button";
    removeButton.classList.add("remove-row");

    // Set attributes
    courseLabel.textContent = "Course: ";
    gradeLabel.textContent = "Grade: ";
    creditLabel.textContent = "Credits: ";

    courseInput.setAttribute("type", "text");
    courseInput.className = "course";
    gradeInput.setAttribute("type", "text");
    gradeInput.className = "grade";
    creditInput.setAttribute("type", "number");
    creditInput.className = "credit";
    creditInput.setAttribute("min", "0");

    // Append to the new row
    newRow.appendChild(courseLabel);
    newRow.appendChild(courseInput);
    newRow.appendChild(gradeLabel);
    newRow.appendChild(gradeInput);
    newRow.appendChild(creditLabel);
    newRow.appendChild(creditInput);
    newRow.appendChild(removeButton);

    // Append new row to form
    form.insertBefore(newRow, document.getElementById("add-class"));
    
    // Add event listener to the remove button
    removeButton.addEventListener("click", function() {
        newRow.remove();
    });
}

// Function to calculate GPA
const calculateGPA = function() {
    let totalPoints = 0;
    let totalCredits = 0;

    const courses = document.querySelectorAll(".course");
    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");

    for (let i = 0; i < courses.length; i++) {
        const gradePoint = convertGradeToPoints(grades[i].value.trim().toUpperCase());
        const creditHours = parseFloat(credits[i].value) || 0;

        if (gradePoint !== null) {
            totalPoints += gradePoint * creditHours;
            totalCredits += creditHours;
        }
    }

    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    gpaValue.textContent = gpa;
}

// Function to convert letter grades to grade points
const convertGradeToPoints = function(grade) {
    switch (grade) {
        case 'A+': return 4.0;
        case 'A': return 4.0;
        case 'A-': return 3.7;
        case 'B+': return 3.3;
        case 'B': return 3.0;
        case 'B-': return 2.7;
        case 'C+': return 2.3;
        case 'C': return 2.0;
        case 'C-': return 1.7;
        case 'D+': return 1.3;
        case 'D': return 1.0;
        case 'F': return 0.0;
        default: return null; // for invalid grades
    }
}

// Function to reset the form
const resetForm = function() {
    // Clear all the input fields
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => row.remove());
    gpaValue.textContent = "0.00"; // Reset GPA display

    // Add a new initial row
    addRow();
}

// Initial setup
addRow(); // Add the first row on page load

// Event listeners
document.getElementById("add-class").addEventListener("click", addRow);
document.getElementById("calculate-gpa").addEventListener("click", calculateGPA);
document.getElementById("reset-form").addEventListener("click", resetForm);
