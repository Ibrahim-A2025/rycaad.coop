const twilio = require('twilio');
const config = require('./config');

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

function sendWhatsAppMessage(message) {
  client.messages.create({
    body: message,
    from: config.twilio.from,
    to: config.twilio.to
  })
  .then(message => console.log('WhatsApp sent:', message.sid))
  .catch(err => console.error(err));
}

module.exports = sendWhatsAppMessage;