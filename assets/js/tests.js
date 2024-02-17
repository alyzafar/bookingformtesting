require __DIR__ . '/vendor/autoload.php';

                                $client = new \Google_Client();
                                $client->setApplicationName('Google Sheets with Primo');
                                $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
                                $client->setAccessType('offline');
                                $client->setAuthConfig(__DIR__ . '/credentials.json');
                                
                                $service = new Google_Service_Sheets($client);
                                $spreadsheetId = "17m3553T5Aw7Q1MSWzWPTDWDvCyDsmbcuRWb63wu1aRM";
                                
                                $range = "data"; // Sheet name
                                
                                $values = [
                                    [$fullname, $email, $phoneNumber, $sessionDate, $sessionTime, $lengthHrs, $studio, $groupSize, $engineers],
                                ];
                                $body = new Google_Service_Sheets_ValueRange([
                                    'values' => $values
                                ]);
                                $params = [
                                    'valueInputOption' => 'RAW'
                                ];
                                
                                $result = $service->spreadsheets_values->append(
                                    $spreadsheetId,
                                    $range,
                                    $body,
                                    $params
                                );
                                
                                if($result->updates->updatedRows == 1){
                                  $client = new Google_Client();
                                  $client->setApplicationName('testoo');
                                  $client->setScopes(array(Google_Service_Calendar::CALENDAR));
                                  $client->setAuthConfig(__DIR__ . '/events_credentials.json');
                                  $client->setAccessType('offline');
                                  $service = new Google_Service_Calendar($client);
                                  $calendarId = 'ishkomannewsnetwork@gmail.com'; 
                                  try {
                                      $eventLink = setEvents($service, $calendarId);
                                      echo "done";
                                  } catch (Exception $e) {
                                      echo "Error inserting event: " . $e->getMessage();
                                  }
                                } else {
                                    echo "Fail";
                                }





                                Warning: require_once(/PHPMailer\PHPMailer/src/Exception.php): Failed to open stream: No such file or directory in C:\xampp\htdocs\BookingForm\php\sendFormData.php on line 5

                                Fatal error: Uncaught Error: Failed opening required '/PHPMailer\PHPMailer/src/Exception.php' (include_path='C:\xampp\php\PEAR') in C:\xampp\htdocs\BookingForm\php\sendFormData.php:5 Stack trace: #0 {main} thrown in C:\xampp\htdocs\BookingForm\php\sendFormData.php on line 5
                                Full Name
                                af
                                Email
                                muzaffaraly13@gmail.com
                                Phone Number



                                

Fatal error: Cannot redeclare composerRequire75c99737c5cdb6bc618c0440a1e15ebd() (previously declared in C:\xampp\htdocs\BookingForm\php\vendor\composer\autoload_real.php:68) in C:\xampp\htdocs\BookingForm\php\vendor_events\composer\autoload_real.php on line 68

api_key = "AIzaSyAy4e-f3F1G7WUiLQEI4HS8UxoEPadlFJo";

Client ID = 801723634638-e35rmqm7civqtojg7rm6sq4nbmlbghtj.apps.googleusercontent.com
Client secret = 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
AKfycbxnDyunNEFMIljMg3vXgzaaW5s17JjjsALQpzuAvvJ74ORuWIzgC3OmNxoPwIA9S_Rl

https://script.google.com/macros/s/AKfycbxnDyunNEFMIljMg3vXgzaaW5s17JjjsALQpzuAvvJ74ORuWIzgC3OmNxoPwIA9S_Rl/exec


document.addEventListener("DOMContentLoaded", function() {
    // const lengthInput = document.getElementById("length");
    // const studioSelect = document.getElementById("studio");
    // const engineerCheckboxes = document.querySelectorAll('input[name="engineer"]');
    // const promoCodeInput = document.getElementById("promo-code");
    // const applyButton = document.getElementById("apply-btn");
    // const responseDiv = document.getElementById("response");
    // const totalP = document.getElementById("total_p");
    // let fieldSets = document.querySelector(".chekboxes");
  
  
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
        if(totalP.textContent === "$00.00"){
            responseDiv.style.display = 'flex';
            responseDiv.innerHTML = '<span class="error">Please Select Studio and Enter Number of Hr & Engineers First!</span>';
          }else{          
        const totalCostElement = document.querySelector(".total > p > span > b");
        let totalCost = parseFloat(totalCostElement.textContent.replace("$", ""));
        const discount = totalCost * 0.15;
        totalCost -= discount;
  
        // Display promo code discount
        document.querySelector(".pricedisplay > p:nth-child(3) > span > b").textContent = "$" + discount.toFixed(2);
        
        // Update total cost
        totalCostElement.textContent = "$" + totalCost.toFixed(2);
        responseDiv.style.display = 'flex';
        responseDiv.innerHTML = '<span class="done">Promo code applied successfully!</span>';
    }
      } else {
        responseDiv.innerHTML = '<span class="error">Invalid Code Entered.</span>';
      }
    });  


    // Function to validate the form
    function validateForm() {
        function validateCheckboxes() {
            let isChecked = false;
          
            // Iterate through each checkbox
            engineerCheckboxes.forEach(function(checkbox) {
              if (checkbox.checked) {
                isChecked = true;
                return;
              }else{
    
              }
            });
          
            return isChecked;
          }
         
          function validateCheckboxeson(){
            const isCheckboxChecked = validateCheckboxes();
            if (!isCheckboxChecked) {
              fieldSets.style.borderColor = 'red';
            }else{
                fieldSets.style.borderColor = 'rgba(255,255,255,0.4)';
            }
          }
      let isValid = true;
      let errorMessage = "";
  
      // Validate each input field
      const inputs = form.querySelectorAll(".inputfields");
      inputs.forEach(function(input) {
        if (input.value.trim() === "") {
          isValid = false;
          errorMessage = "Please Fill The Required Field!";
          input.style.borderColor = 'red';
        }else{
            input.style.borderColor = "rgba(255,255,255,0.4)";
        }
      });
  
      // Display error message if form is not valid
      if (!isValid) {
        if (studioSelect.value == "Choose...") {
            studioSelect.style.borderColor = 'red';
          }else{
            studioSelect.style.borderColor = 'rgba(255,255,255,0.4)';
          }
        responseDiv.style.display = 'flex';
        responseDiv.innerHTML = `<span class="error">${errorMessage}</span>`;
        validateCheckboxeson();
      } else {
        let isCheckboxCheckedd = validateCheckboxes();
        if (studioSelect.value == "Choose...") {
            errorMessage = "Please Select a Studio!";
            responseDiv.style.display = 'flex';
            studioSelect.style.borderColor = 'red';
            responseDiv.innerHTML = `<span class="error">${errorMessage}</span>`;
          }else if (!isCheckboxCheckedd) {
            studioSelect.style.borderColor = 'rgba(255,255,255,0.4)';
            fieldSets.style.borderColor = 'red';
            errorMessage = "Please Checked any On Option!";
            responseDiv.style.display = 'flex';
            responseDiv.innerHTML = `<span class="error">${errorMessage}</span>`;
          }else{
              studioSelect.style.borderColor = 'rgba(255,255,255,0.4)';
              fieldSets.style.borderColor = 'rgba(255,255,255,0.4)';
              responseDiv.innerHTML = ""; 
              submitForm();
          }        
      }
    }
  
    
    // Function to submit form data
    function submitForm() {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(form);

        fetch("./php/sendFormData.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text(); // Assuming PHP script returns text response
        })
        .then(data => {
          const responseData = data.trim();
            if(responseData === "done"){
              responseDiv.style.display = 'flex';
              responseDiv.innerHTML = `<span class="done">${data}</span>`;
            }else{
              responseDiv.style.display = 'flex';
              responseDiv.innerHTML = `<span class="error">this ${data}</span>`;
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }
  
    // Event listener for form submission
    submitBtn.addEventListener("click", ()=> {
    submitForm();
    });
  });
  