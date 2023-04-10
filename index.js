const express = require('express');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const ngrok = require('ngrok');

const app = express();
const port = process.env.PORT || 3034;
const authToken = '50d801c5c3a7e238-cc70f0e32bfee0ec-574658554e676f6a';

const bot = new ViberBot({
  authToken: authToken,
  name: 'EchoBot',
  avatar: 'http://viber.com/avatar.jpg',
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  console.log(message, '++++++++++++++++++++++++++++++++++++');
  response.send(message);
});

app.use('/viber/webhook', bot.middleware());

app.get('/', (req, res) => {
  res.send('Hello, worsl!');
});

(async function () {
  const url = await ngrok.connect({
    addr: port,
    // subdomain: 'https://f6b0-178-127-45-203.ngrok.io', // Add your own subdomain here.
    authtoken: '2N6FFhn6UNK8LZdmS8huf2TJjjm_6ZBoKc1f5c2L5nvtjeN5z', // Add your own auth token here.
    // region: 'us', // Use the ngrok server closest to you.
  });

  console.log(`Ngrok URL: ${url}`);

  app.listen(port, () => {
    console.log(`Express app listening on port ${port}!`);
    bot.setWebhook(`${url}/viber/webhook`);
  });
})();
