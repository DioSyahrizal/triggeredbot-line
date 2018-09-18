const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "Yi1YxkqGzvNlkAncTi/OuOGswDA10+a4APyDDbvIzwfQF8NiPfZ+2Ao4Zt/Ks3yq7WvoVtkNRkeW2/+tR13lDkbhlI63VlJbTvUNQPZ53KKgg9u3gP0ewAomGH93IfUMT2qk9aTyLjGRKIeMnz+giAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "f5b623b2548182fb3ddd5ad852ae7fcf",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {

    if(event.message.text == "meme"){
      const echo = { type: 'text', text: "go f yourself" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});