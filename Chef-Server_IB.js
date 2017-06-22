/*
 * This is used in the Inbound IB script editor to parse the incoming JSON payload from Chef.  This script
 parses the information, sets it to the xMatters form format and creates a xMatters Event.
 */

var data;

// If your data is posted as JSON
data = JSON.parse(request.body);
console.log('Body from Chef' + JSON.stringify(data));


// Parse data from incoming payload and construct the trigger object
trigger.properties.host = data.host;
trigger.properties.ip = data.ip;
trigger.properties.status = data.status
trigger.properties.cookbook = data.cookbook;


// Define recipients
var recipients = [];
// Add a recipient targeting a user or group
recipients.push({
    'targetName': 'chef'
});

trigger.recipients = recipients;

// Post trigger to form
form.post(trigger);
