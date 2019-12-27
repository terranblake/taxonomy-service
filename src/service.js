const { Events } = require('@postilion/events');

const subscriptions = require('./subscriptions');

const events = new Events(subscriptions);
module.exports = events;