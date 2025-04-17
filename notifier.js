const fs = require('fs');
const path = require('path');
const sendEmail = require('./emailService');
const sendWhatsAppMessage = require('./whatsappService');

const events = JSON.parse(fs.readFileSync(path.join(__dirname, 'events.json'), 'utf8'));
const today = new Date();
const checkDate = new Date(today);
checkDate.setDate(today.getDate() + 2);

const targetDate = ('0' + (checkDate.getMonth() + 1)).slice(-2) + '-' + ('0' + checkDate.getDate()).slice(-2);

events.forEach(event => {
  if (event.date === targetDate) {
    const message = `تذكير: ${event.name} بعد يومين.`;
    sendEmail('تنبيه مناسبة قادمة', message);
    sendWhatsAppMessage(message);
  }
});