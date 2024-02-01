import { setCrimeCodeList, crimeCodeList } from './index.js';
import { eventEmitter } from './event-emitter.js';

const crimeDictionary = {
    "0.0.0": "Totaal misdrijven",
    "1.1.1": "Diefstal/inbraak woning",
    "1.1.2": "Diefstal/inbraak box/garage/schuur",
    "1.2.1": "Diefstal uit/vanaf motorvoertuigen",
    "1.2.2": "Diefstal van motorvoertuigen",
    "1.2.3": "Diefstal van brom-, snor-, fietsen",
    "1.2.4": "Zakkenrollerij",
    "1.2.5": "Diefstal af/uit/van ov. voertuigen",
    "1.4.6": "Straatroof",
    "1.4.7": "Overval",
    "1.5.2": "Diefstallen (water)",
    "2.5.1": "Diefstal/inbraak bedrijven enz.",
    "2.5.2": "Winkeldiefstal"
};

function generateCheckboxes() {
    const ul = document.querySelector(".list-group");

    for (const key in crimeDictionary) {
        const li = document.createElement("li");
        li.className = "list-group-item p-2";

        const div = document.createElement("div");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = "check" + key;
        input.checked = crimeCodeList.includes(key);
        input.addEventListener("change", function () {
            if (input.checked) {
                if (key === '0.0.0') {
                    crimeCodeList.length = 0;
                    crimeCodeList.push(key);
                } else {
                    const zeroIndex = crimeCodeList.indexOf('0.0.0');
                    if (zeroIndex !== -1) {
                        crimeCodeList.splice(zeroIndex, 1);
                    }
                    if (!crimeCodeList.includes(key)) {
                        crimeCodeList.push(key);
                    }
                }
            } else {
                // Prevent unchecking if this is the last checkbox
                if (crimeCodeList.length === 1 && crimeCodeList.includes(key)) {
                    input.checked = true; // Re-check the checkbox
                    return; // Exit the function
                }
                const index = crimeCodeList.indexOf(key);
                if (index !== -1) {
                    crimeCodeList.splice(index, 1);
                }
            }
            setCrimeCodeList([...crimeCodeList]);
            updateCheckboxStates();
        });

        const label = document.createElement("label");
        label.className = "m-0 ml-2";
        label.htmlFor = "check" + key;
        label.textContent = crimeDictionary[key];

        div.appendChild(input);
        div.appendChild(label);
        li.appendChild(div);

        ul.appendChild(li);
    }
}

function updateCheckboxStates() {
    for (const key in crimeDictionary) {
        const checkbox = document.getElementById("check" + key);
        if (checkbox) {
            checkbox.checked = crimeCodeList.includes(key);
            // Disable the checkbox if it's the only one selected
            checkbox.disabled = crimeCodeList.length === 1 && crimeCodeList.includes(key);
        }
    }
}

// Initial call to generate checkboxes and set their state
generateCheckboxes();
updateCheckboxStates();

eventEmitter.on('update', () => {
    updateCheckboxStates();
});