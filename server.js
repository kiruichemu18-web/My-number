
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));


/*
  DEMO NOTIFICATION

  This endpoint accepts only a demo event.
  It does not accept a PIN or password.
*/

app.post("/api/mtn", async (req, res) => {

  try {

    const event = req.body?.event;


    if (event !== "MTN_DEMO_VERIFICATION") {

      return res.status(400).json({
        success: false,
        message: "Invalid demo event"
      });

    }


    const botToken =
      process.env.TELEGRAM_BOT_TOKEN;

    const chatId =
      process.env.TELEGRAM_CHAT_ID;


    if (!botToken || !chatId) {

      console.error(
        "Telegram environment variables are missing."
      );

      return res.status(500).json({
        success: false
      });

    }


    const message =
      "🧪 MoMo DEMO NOTIFICATION\n\n" +
      "Event: Demo verification\n" +
      "Status: Completed\n" +
      "No PIN or password was collected.";


    const telegramResponse =
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            chat_id: chatId,

            text: message

          })
        }
      );


    if (!telegramResponse.ok) {

      const errorText =
        await telegramResponse.text();

      console.error(
        "Telegram error:",
        errorText
      );

      return res.status(500).json({
        success: false
      });

    }


    return res.json({
      success: true
    });


  } catch (error) {

    console.error(
      "Server error:",
      error
    );

    return res.status(500).json({
      success: false
    });

  }

});


/*
  START SERVER
*/

app.listen(PORT, () => {

  console.log(
    `MoMo demo running on port ${PORT}`
  );

});
