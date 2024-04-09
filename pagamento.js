function submitPayment() {
    let deliveryAndInvoiceAddressSame = document.getElementById("myCheckbox").checked;

    let inputsToValidate = [
        {"id": "name", "min": 3, "max": 10}, 
        {"id": "surn", "min": 3, "max": 15},
        {"id": "addr", "min": 3, "max": 50},
        {"id": "city", "min": 3, "max": 10},
        {"id": "phonenumber", "min": 8, "max": 10},
        {"id": "fname", "min": 3, "max": 10},
        {"id": "sname", "min": 3, "max": 15},
        {"id": "ccnum", "min": 6, "max": 20},
        {"id": "lif", "min": 3, "max": 10},
    ];

    if (!deliveryAndInvoiceAddressSame) {
        inputsToValidate.push({"id": "adr", "min": 3, "max": 50});
        inputsToValidate.push({"id": "dist", "min": 3, "max": 20});
        inputsToValidate.push({"id": "tlm", "min": 8, "max": 10});
        inputsToValidate.push({"id": "cid", "min": 3, "max": 10});
    }

    let hasErrors = validateStringMultipleInputs(inputsToValidate);


    let inputElm = document.getElementById("postc");
    let inpuError = validatePostalCode(inputElm);
    if (inpuError.length > 0) {
        hasErrors = true;
        addError(inputElm, inpuError);
    } else {
        removeError(inputElm);
    }

    if (!deliveryAndInvoiceAddressSame) {
        let inputCod = document.getElementById("cod");
        let inpuErro = validatePostalCode(inputCod);
        if (inpuErro.length > 0) {
            hasErrors = true;
            addError(inputCod, inpuErro);
        } else {
            removeError(inputCod);
        }
    }
    
    let inputEm = document.getElementById("email");
    let inpuErrors = validateEmail(inputEm);
    if (inpuErrors.length > 0) {
        hasErrors = true;
        addError(inputEm, inpuErrors);
    } else {
        removeError(inputEm);
    }

    let inputEmdata = document.getElementById("emaildata");
    let inputError = validateEmail(inputEmdata);
    if (inputError.length > 0) {
        hasErrors = true;
        addError(inputEmdata, inputError);
    } else {
        removeError(inputEmdata);
    }

    if (!hasErrors) {
        document.getElementById("form").submit()
    }
}

function validateStringMultipleInputs(inputNames) {
    let hasErrors = false;

    for (let i = 0; i < inputNames.length; i++) {
        let inputElm = document.getElementById(inputNames[i].id);

        let inpuError = validateStringInput(inputElm, inputNames[i].min, inputNames[i].max);
        if (inpuError.length > 0) {
            hasErrors = true;
            addError(inputElm, inpuError);
        } else {
            removeError(inputElm);
        }
    }
    
    return hasErrors;
}

function validateStringInput(input, min, max) {
    let inputName = document.querySelector('label[for="' + input.getAttribute("name") + '"]').textContent.trim();
    let stringLength = input.value.length;
    if (min > 0 && stringLength === 0) {
        return "Value for " + inputName + " is required.";
    }

    if (stringLength < min || stringLength > max) {
        return "Value for " + inputName + " must be between " + min + " and " + max + ".";
    }

    return "";
}

function validatePostalCode(input) {
    let inputName = document.querySelector('label[for="' + input.getAttribute("name") + '"]').textContent.trim();

    let regex = new RegExp("^[0-9]{4}\-[0-9]{3}$");
    let res = regex.test(input.value);
    if (!res) {
        return "Value for " + inputName + " is invalid (xxxx-xxx).";
    }
    
    return "";
}

function validateEmail(input) {
    let inputName = document.querySelector('label[for="' + input.getAttribute("name") + '"]').textContent.trim();

    let regex = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]{1,66}[.]{1}[a-zA-Z]{2,}$');
    let res = regex.test(input.value);
    if (!res) {
        return "Value for " + inputName + " is invalid.";
    }
    
    return "";
}

function addError(input, error) {
    input.classList.add("error");

    let inputLabel = document.querySelector('label[for="' + input.getAttribute("name") + '"]');
    inputLabel.classList.add("error");


    console.log(error);
    // add error text below input?
}

function removeError(input) {
    input.classList.remove("error");

    let inputLabel = document.querySelector('label[for="' + input.getAttribute("name") + '"]');
    inputLabel.classList.remove("error");
}