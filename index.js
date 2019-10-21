const moment = require('moment');

module.exports.templateTags = [{
  name: 'microtime',
  displayName: 'Microtime',
  description: 'Helper to deal with microtime content',
  args: [
    {
      displayName: 'Source time',
      type: 'enum',
      options: [{
        displayName: 'Now',
        value: 'now'
      }, {
        displayName: 'Timestamp entered below',
        value: 'timestamp'
      }],
    }, 
    {
      displayName: 'Timestamp (seconds) (only relevant when Source time is "Timestamp")',
      description: 'Timestamp used when selection above says "timestamp"',
      type: 'number',
      defaultValue: 0
    },
    {
      displayName: 'Offset', 
      description: 'Time added to value entered above (or Now)',
      type: 'enum',
      options: [
        { displayName: 'None', value: 0 },
        { displayName: '+1 Minute', value: 60 },
        { displayName: '+5 Minutes', value: 60 * 5 },
        { displayName: '+30 Minutes', value: 60 * 30 },
        { displayName: '+1 Hour', value: 60 * 60 },
        { displayName: '+12 Hours', value: 60 * 60 * 12 },
        { displayName: '+1 Day', value: 60 * 60 * 24 },
        { displayName: '+15 Days', value: 60 + 60 * 24 * 15 },
        { displayName: '+31 Days', value: 60 + 60 * 24 * 31 },
        { displayName: '+3 Months', value: 60 + 60 * 24 * 31 * 3 },
      ]
    },
    {
      help: 'moment.js format string',
      displayName: 'Custom Format Template',
      type: 'string',
      placeholder: 'MMMM Do YYYY, h:mm:ss a',
      hide: args => args[0].value !== 'custom',
    },
  ],
  
  async run(context, sourceOption = 'now', timestamp = 0, offset = 0) {
    switch (sourceOption) {
      case 'now': 
        return moment.utc().valueOf() + (offset * 1000);
      case 'timestamp':
        return moment.utc().unix(timestamp).valueOf() + (offset * 1000);
      default: 
        throw new Error(`Invalid selection "${sourceOption}"`);
    }
  }
}];
