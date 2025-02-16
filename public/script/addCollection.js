function showNextStep() {
    const selectedType = document.getElementById("collectionType").value;
    if (!selectedType) {
        alert("Please select a type first.");
        return;
    }

    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");

    document.querySelectorAll(".type-specific").forEach(div => div.classList.add("hidden"));
    document.getElementById(selectedType + "Inputs").classList.remove("hidden");
}

function addInput(containerId, inputName, type = "file", accept = "") {
    const container = document.getElementById(containerId);

    // Create input field
    const newInput = document.createElement(type === "textarea" ? "textarea" : "input");
    newInput.setAttribute("name", inputName);
    newInput.classList.add("dynamic-input");

    if (type === "file") {
        newInput.setAttribute("type", "file");
        if (accept) newInput.setAttribute("accept", accept);
    } else {
        newInput.setAttribute("rows", "3");
    }

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
    removeBtn.type = "button";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = function () {
        container.removeChild(newInput);
        container.removeChild(removeBtn);
    };

    // Append new input and remove button
    container.appendChild(newInput);
    container.appendChild(removeBtn);
}