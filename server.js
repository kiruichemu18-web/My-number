const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/demo", async (req, res) => {
  console.log("Received DEMO request:", req.body);

  if (req.body.event !== "DEMO_PIN_ACCEPTED") {
    return res.status(400).json({
      success: false,
      error: "Invalid demo event"
    });
  }

  // Telegram notification is optional.
  // No phone number or PIN is accepted or transmitted.
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.log("Telegram environment variables are missing.");
    return res.json({
      success: true,
      telegram: false
    });
  }

  try {
    const telegramUrl =
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: "🧪 Demo verification completed successfully. No real credentials collected."
      })
    });

    console.log("Telegram response status:", response.status);

    if (!response.ok) {
      console.log("Telegram notification failed.");
      return res.json({
        success: true,
        telegram: false
      });
    }

    console.log("Telegram demo notification sent.");
    res.json({
      success: true,
      telegram: true
    });

  } catch (error) {
    console.error("Telegram request error:", error.message);

    res.json({
      success: true,
      telegram: false
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Demo running on port ${PORT}`);
});
