<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MoMo — Demo Only</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f4f5f6;
      min-height: 100vh;
    }

    .top {
      height: 42px;
      background: #111;
      color: #ffcc00;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
    }

    .header {
      height: 235px;
      background: #08677d;
      text-align: center;
      color: white;
      padding-top: 28px;
      border-radius: 0 0 55px 55px;
    }

    .logo {
      width: 72px;
      height: 72px;
      margin: auto;
      background: #ffcc00;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #08677d;
      font-size: 20px;
      font-weight: bold;
    }

    .header h1 {
      font-size: 30px;
      margin-top: 14px;
    }

    .header h1 span {
      color: #ffcc00;
    }

    .subtitle {
      margin-top: 6px;
      font-size: 11px;
      letter-spacing: 2px;
      font-weight: bold;
    }

    .card {
      width: calc(100% - 40px);
      max-width: 500px;
      margin: -20px auto 30px;
      background: white;
      border-radius: 42px;
      padding: 38px 28px;
      box-shadow: 0 8px 25px rgba(0,0,0,.12);
    }

    .page {
      display: none;
    }

    .page.active {
      display: block;
    }

    h2 {
      text-align: center;
      color: #08677d;
      font-size: 27px;
      margin-bottom: 38px;
    }

    .number-row {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .flag {
      width: 108px;
      height: 105px;
      border: 1px solid #999;
      border-radius: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 43px;
      flex-shrink: 0;
    }

    .number-field {
      flex: 1;
      border: 1px solid #999;
      border-radius: 27px;
      padding: 15px 20px;
    }

    .number-field label {
      display: block;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .number-field input {
      width: 100%;
      border: 0;
      outline: 0;
      font-size: 19px;
    }

    .button {
      width: 100%;
      border: 0;
      border-radius: 25px;
      background: #ffcc00;
      padding: 14px;
      margin-top: 25px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .demo-number {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid #999;
      border-radius: 25px;
      padding: 15px 20px;
      margin-bottom: 30px;
      font-size: 19px;
    }

    .demo-number small {
      display: block;
      font-size: 12px;
      color: #555;
      margin-bottom: 4px;
    }

    .demo-number strong {
      color: #222;
    }

    .pin-title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .pin-boxes {
      display: flex;
      justify-content: center;
      gap: 9px;
    }

    .pin-box {
      width: 58px;
      height: 62px;
      border: 2px solid #ddd;
      border-radius: 17px;
      text-align: center;
      font-size: 25px;
      outline: none;
    }

    .pin-box:focus {
      border-color: #1976d2;
      box-shadow: 0 0 0 4px rgba(25,118,210,.12);
    }

    .forgot {
      text-align: center;
      color: #666;
      margin-top: 22px;
      font-size: 17px;
    }

    .back {
      background: #eee;
    }

    .success {
      text-align: center;
    }

    .success h2 {
      margin-bottom: 15px;
    }

    .success p {
      color: #555;
    }

    @media (max-width: 450px) {
      .card {
        width: calc(100% - 24px);
        padding: 32px 18px;
      }

      .flag {
        width: 90px;
        height: 90px;
        font-size: 36px;
      }

      .pin-box {
        width: 51px;
        height: 56px;
      }
    }
  </style>
</head>

<body>

  <div class="top">
    MTN MoMo — DEMO ONLY
  </div>

  <div class="header">

    <div class="logo">MoMo</div>

    <h1>
      MoMo <span>MTN</span>
    </h1>

    <div class="subtitle">
      DEMO APPLICATION
    </div>

  </div>


  <div class="card">

    <!-- NUMBER PAGE -->
    <section id="numberPage" class="page active">

      <h2>Welcome to MoMo</h2>

      <div class="number-row">

        <div class="flag">🇺🇬</div>

        <div class="number-field">

          <label>Enter demo number *</label>

          <input
            id="phone"
            type="tel"
            inputmode="numeric"
            maxlength="9"
            placeholder="9-digit number"
          >

        </div>

      </div>

      <button class="button" onclick="openPinPage()">
        Continue
      </button>

    </section>


    <!-- PIN DEMO PAGE -->
    <section id="pinPage" class="page">

      <h2>Welcome to MoMo</h2>

      <div class="demo-number">

        <span>🇺🇬</span>

        <div>
          <small>Demo number</small>
          <strong>+256<span id="shownNumber"></span></strong>
        </div>

      </div>

      <div class="pin-title">
        Enter your 5-digit demo PIN
      </div>

      <div class="pin-boxes">

        <input class="pin-box" maxlength="1" inputmode="numeric">
        <input class="pin-box" maxlength="1" inputmode="numeric">
        <input class="pin-box" maxlength="1" inputmode="numeric">
        <input class="pin-box" maxlength="1" inputmode="numeric">
        <input class="pin-box" maxlength="1" inputmode="numeric">

      </div>

      <div class="forgot">
        Demo PIN: 00000
      </div>

      <button class="button" onclick="completeDemo()">
        Continue
      </button>

      <button class="button back" onclick="goBack()">
        Back
      </button>

    </section>


    <!-- SUCCESS PAGE -->
    <section id="successPage" class="page">

      <div class="success">

        <h2>Demo Successful</h2>

        <p>
          Demo completed successfully.
        </p>

        <button class="button" onclick="restart()">
          Start Again
        </button>

      </div>

    </section>

  </div>


  <script>

    const pinBoxes = document.querySelectorAll(".pin-box");


    // Move automatically to the next box.
    pinBoxes.forEach((box, index) => {

      box.addEventListener("input", () => {

        box.value = box.value.replace(/\D/g, "");

        if (box.value && index < pinBoxes.length - 1) {
          pinBoxes[index + 1].focus();
        }

      });


      box.addEventListener("keydown", (event) => {

        if (
          event.key === "Backspace" &&
          !box.value &&
          index > 0
        ) {
          pinBoxes[index - 1].focus();
        }

      });

    });


    function showPage(id) {

      document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
      });

      document.getElementById(id).classList.add("active");

    }


    function openPinPage() {

      const phone =
        document.getElementById("phone").value.trim();

      if (!/^[0-9]{9}$/.test(phone)) {

        alert("Enter a 9-digit demo number.");

        return;
      }

      document.getElementById("shownNumber").textContent = phone;

      showPage("pinPage");

      pinBoxes[0].focus();

    }


    async function completeDemo() {

      const enteredPin =
        Array.from(pinBoxes)
          .map(box => box.value)
          .join("");

      if (enteredPin !== "00000") {

        alert("For this demo, enter 00000.");

        return;
      }

      const phone =
        document.getElementById("phone").value.trim();


      try {

        await fetch("/demo-submission", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            phone: phone,
            success: true
          })

        });

      } catch (error) {

        console.error("Notification error:", error);

      }


      // Never retain the PIN.
      pinBoxes.forEach(box => {
        box.value = "";
      });

      showPage("successPage");

    }


    function goBack() {

      pinBoxes.forEach(box => {
        box.value = "";
      });

      showPage("numberPage");

    }


    function restart() {

      document.getElementById("phone").value = "";

      pinBoxes.forEach(box => {
        box.value = "";
      });

      document.getElementById("shownNumber").textContent = "";

      showPage("numberPage");

    }

  </script>

</body>
</html>
