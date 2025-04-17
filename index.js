const cron = require('node-cron');
const path = require('path');

// يشغل الكود يومياً الساعة 8 صباحاً
cron.schedule('0 8 * * *', () => {
  require('./notifier');
});

console.log('Notifier started. It will check daily at 8AM.');