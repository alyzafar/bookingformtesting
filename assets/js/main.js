console.log("Connected!");

const form = document.getElementById("formMain");
const submitBtn = document.getElementById("continueBtn");
const responseDiv = document.getElementById("response");
const lengthInput = document.getElementById("length");
    const studioSelect = document.getElementById("studio");
    const engineerCheckboxes = document.querySelectorAll('input[name="engineer[]"]');
    const promoCodeInput = document.getElementById("promo-code");
    const applyButton = document.getElementById("apply-btn");
    const totalP = document.getElementById("total_p");
    let fieldSets = document.querySelector(".chekboxes");

form.onsubmit = (e) => {
    e.preventDefault();
}

submitBtn.onclick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/sendFormData.php", true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let data = xhr.response;
                if (data === "done") {
                  form.reset();
                  responseDiv.style.display = 'flex';
                  responseDiv.innerHTML = `<span class="done">Form Submited Successfully</span>`;
                } else {
                    responseDiv.style.display = 'flex';
                    responseDiv.innerHTML = `<span class="error">${data}</span>`;
                }
            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}
 // Calculate total cost
 function calculateTotal() {
  let totalStudioCost = 0;
  let engineersCost = 0;

  // Calculate studio cost
  const lengthHours = parseInt(lengthInput.value);
  if (!isNaN(lengthHours) && studioSelect.value !== "Choose...") {
    totalStudioCost = lengthHours * 35;
  }

  // Calculate engineers cost
engineerCheckboxes.forEach(function(checkbox) {
if (checkbox.checked) {
    if (checkbox.value === "No Engineer") {
        // If "No Engineer" is checked, uncheck Engineer 1 and Engineer 2 if they were checked
        engineerCheckboxes.forEach(function(engineerCheckbox) {
            if (engineerCheckbox !== checkbox && engineerCheckbox.checked) {
                engineerCheckbox.checked = false;
                engineersCost -= 15;
            }
        });
    } else {
        engineersCost += 15;
    }
}
});

  // Display total studio cost
  document.querySelector(".pricedisplay > p:nth-child(1) > span > b").textContent = "$" + totalStudioCost.toFixed(2);

  // Display engineers cost
  document.querySelector(".pricedisplay > p:nth-child(2) > span > b").textContent = "$" + engineersCost.toFixed(2);

  // Calculate total cost
  const totalCost = totalStudioCost + engineersCost;
  document.querySelector(".total > p > span > b").textContent = "$" + totalCost.toFixed(2);
}

// Event listeners for input changes
lengthInput.addEventListener("input", calculateTotal);
studioSelect.addEventListener("change", calculateTotal);
engineerCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", calculateTotal);
});
// Event listener for promo code application
applyButton.addEventListener("click", function(event) {
  event.preventDefault();
  const promoCode = promoCodeInput.value.trim();
  if (promoCode === "") {
    responseDiv.style.display = 'flex';
    responseDiv.innerHTML = '<span class="error">Please Enter a Promo Code First.</span>';
    return;
  }

  // You can add your promo code validation logic here
  // For simplicity, I'm just checking if the promo code is 'DISCOUNT'
  if (promoCode === "123") {
    if(totalP.textContent === "$0.00"){
        responseDiv.style.display = 'flex';
        responseDiv.innerHTML = '<span class="error">Please Select Studio and Enter Number of Hr & Engineers First!</span>';
      }else{          
    const totalCostElement = document.querySelector(".total > p > span > b");
    let totalCost = parseFloat(totalCostElement.textContent.replace("$", ""));
    const discount = totalCost * 0.15;
    totalCost -= discount;

    // Display promo code discount
    document.querySelector(".pricedisplay > p:nth-child(3) > span > b").textContent = "-$" + discount.toFixed(2);
    
    // Update total cost
    totalCostElement.textContent = "$" + totalCost.toFixed(2);
    responseDiv.style.display = 'flex';
    responseDiv.innerHTML = '<span class="done">Promo code applied successfully!</span>';
    applyButton.style.display = 'none';
}
  } else {
    responseDiv.innerHTML = '<span class="error">Invalid Code Entered.</span>';
  }
});  
calculateTotal();