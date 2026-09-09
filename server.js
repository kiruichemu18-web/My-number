const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post("/demo-complete", async (req, res) => {
  try {
    const message =
      "🧪 DEMO VERIFICATION\n\n" +
      "Status: Successful\n" +
      "Test PIN accepted: Yes\n" +
      "No real credentials collected.";

    const url =
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message
      })
    });

    if (!response.ok) {
      return res.status(500).json({ success: false });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Demo running on port ${PORT}`);
});
