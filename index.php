<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Form</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./assets/css/style.css">
</head>
<body>
    <div class="container main_con">
        <div class="col-12 heading">
            <h4>Booking Details</h4>
        </div>
        <div class="col-12 response" id="response"></div>
        <form class="row g-3" id="formMain" method="POST">
            <div class="col-md-4">
                <label for="cname" class="form-label">Full Name</label>
                <input type="text" class="form-control inputfields" name="cname" id="cname" placeholder="Enter Your Name...">
              </div>
              <div class="col-md-4">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control inputfields" name="email" id="email" placeholder="Enter Your Email...">
              </div>
              <div class="col-md-4">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="number" min="1" class="form-control inputfields" name="phone" id="phone" placeholder="Enter Your Phone Number...">
              </div>
            <div class="col-md-4">
              <label for="date" class="form-label">Session Date</label>
              <input type="date" class="form-control inputfields" name="date" id="date" placeholder="Enter Session Date...">
            </div>
            <div class="col-md-4">
              <label for="time" class="form-label">Session Time</label>
              <input type="time" class="form-control inputfields" name="time" id="time">
            </div>
            <div class="col-md-4">
              <label for="length" class="form-label">Length (Hrs)</label>
              <input type="number" min="1" class="form-control inputfields" name="length" id="length" placeholder="Enter Number of Length (Hrs)...">
            </div>
            <div class="col-md-4">
              <label for="studio" class="form-label">Studio Room</label>
              <select id="studio" class="form-select inputfields" name="studio">
                <option disabled selected>Choose...</option>
                <option value="A">Studio A</option>
                <option value="B">Studio B</option>
              </select>
            </div>
            <div class="col-md-2">
                <label for="size" class="form-label">Group Size</label>
                <input type="number" min="1" class="form-control inputfields" name="size" id="size" placeholder="Enter Your Number of Group Members...">
              </div>
            <div class="col-md-6">
                <fieldset>
                    <label>Do you need an engineer to run your session? Who?</label>
                    <div class="chekboxes">
                        <div>
                            <input type="checkbox" id="engineer1" class="engineer" name="engineer[]" value="Mighty Meech">
                            <label for="engineer1">Mighty Meech</label>
                        </div>
                        <div>
                            <input type="checkbox" id="engineer2" class="engineer" name="engineer[]" value="VBcookin">
                            <label for="engineer2">VBcookin</label>
                        </div>
                        <div>
                            <input type="checkbox" id="engineer3" class="engineer" name="engineer[]" value="No Engineer">
                            <label for="engineer3">No Engineer</label>
                        </div>
                    </div>
                </fieldset>
                                
            </div>
            <div class="col-12 pricedisplay">
              <p>Total Studio Cost = <span><b>$00.00</b></span></p>
              <p>Engineers Cost = <span><b>$00.00</b></span></p>
              <p>Promo Code Discont % = <span><b>-$00.00</b></span></p>
              <div class="total">
                <p>Total Cost = <span><b id="total_p">$00.00</b></span></p>
              </div>
            </div>

            <div class="col-12">
              <div class="row">
                <div class="col-8">
                  <label for="promo-code" class="form-label">Promo Code</label>
                  <input type="text" class="form-control" id="promo-code" name="promocode" placeholder="Enter Promo Code...">
                </div>
                <div class="col-4 code_btn" id="code_btn">
                  <button type="button" id="apply-btn" class="btn">Apply</button>
                </div>             
              </div>
            </div>
           
            <div class="col-12 submitBtn">
              <button type="button" class="btn" id="continueBtn">Continue</button>
            </div>
          </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./assets/js/main.js"></script>

</body>
</html>