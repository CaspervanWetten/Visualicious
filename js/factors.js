import {setHousingFactor, setEducationFactor} from "./index.js";

let educationActive = false;
let housingActive = false;

document.getElementById("education-option").addEventListener("click", function () {
    educationActive = !educationActive;
    housingActive = false;
    updateSelection();
});

document.getElementById("housing-option").addEventListener("click", function () {
    housingActive = !housingActive;
    educationActive = false;
    updateSelection();
});

function updateSelection() {
    const educationOption = document.getElementById("education-option");
    const housingOption = document.getElementById("housing-option");

    educationOption.classList.toggle("active", educationActive);
    housingOption.classList.toggle("active", housingActive);

    document.getElementById("education-option").checked = educationActive;
    document.getElementById("housing-option").checked = housingActive;

    setEducationFactor(educationActive);
    setHousingFactor(housingActive);
}