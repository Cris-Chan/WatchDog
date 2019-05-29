const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = 'enter twilio info';
const authToken = 'enter twilio info';
const client = require('twilio')(accountSid, authToken);
const app = express();
var maybedead = false;


function sendSms(targetNumber, message){
  client.messages
    .create({
       body: message,
       from: 'Twilio number',
       to: targetNumber
     })
    .then(message => console.log(message.sid));
}


app.post('/sms', (req, res) => { //handle response (any response is fine)
  const twiml = new MessagingResponse();

  twiml.message('ok cool');
  maybedead = false;
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  console.log("status reset");
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});


function checkStatus(){
  if (maybedead == false) {
    sendSms(13252011334, "you good?")
    console.log("asking for status, hmmm");
  }else {
    dangHesGone()
  }
  maybedead = true

}

function dangHesGone(){ // triggered when user cannot respond to second message
  clearInterval(checkup);
  console.log("dang, took him too soon");
  sendSms(13252011334, "Assuming your missing lol, info released");
  //**ssend info here**
  // Whatever you like here
}

var checkup = setInterval(checkStatus,2147483546);
