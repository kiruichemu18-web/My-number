const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));


// Demo submission endpoint
app.post("/demo-submission", async (req, res) => {

  const { phone, success } = req.body;

  // Validate the demo request
  if (
    typeof phone !== "string" ||
    typeof success !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid demo submission"
    });
  }

  /*
    IMPORTANT:
    This demo deliberately does NOT accept or transmit
    any real PIN, OTP, password, or banking credential.
  */

  console.log("DEMO SUBMISSION");
  console.log("Phone:", phone);
  console.log("Result:", success ? "Successful" : "Failed");

  // Optional Telegram notification
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {

    const message =
`🧪 MTN MoMo DEMO

📱 Demo number: ${phone}

✅ Result: ${success ? "Demo successful" : "Demo failed"}

🔐 No PIN or OTP was collected.
`;

    try {

      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message
          })
        }
      );

      if (!telegramResponse.ok) {
        console.error(
          "Telegram error:",
          await telegramResponse.text()
        );
      }

    } catch (error) {
      console.error("Telegram request failed:", error);
    }
  }

  return res.json({
    success: true,
    message: "Demo submission received"
  });
});


// Serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
  console.log(`Demo server running on port ${PORT}`);
});
