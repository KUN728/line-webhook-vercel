// api/line.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const events = req.body.events;
  if (!events || events.length === 0) {
    return res.status(400).send('No events found');
  }

  const replyToken = events[0].replyToken;
  const userInput = events[0].message.text;

  const replyMessage = {
    replyToken,
    messages: [
      {
        type: 'text',
        text: `你說的是：${userInput}`
      }
    ]
  };

  await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LINE_ACCESS_TOKEN}`
    },
    body: JSON.stringify(replyMessage)
  });

  res.status(200).send('OK');
}
