const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/mtn", async (req, res) => {
  try {
    // Demo event only.
    // No PIN, password, or authentication credential is accepted.
    const message =
      "🧪 MoMo DEMO\n\n" +
      "Event: Demo verification completed\n" +
      "Status: Test submission\n" +
      "No PIN or password was collected.";

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message
        })
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error("Telegram error:", errorText);

      return res.status(500).json({
        success: false
      });
    }

    res.json({
      success: true
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      success: false
    });
  }
});

app.listen(PORT, () => {
  console.log(`MoMo demo running on port ${PORT}`);
});
