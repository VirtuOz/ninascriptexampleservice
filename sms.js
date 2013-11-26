// SMS Handler module
// ==================

// smsHandler
// ----------
// This function sends 2 SMS when called:
// * one to the phone number set in `phoneNumber`
// * one to the live agent number set in `liveAgentPhoneNumber`

// ### Example:
// * http://localhost:3000/sms?phoneNumber=12345678901&liveAgentPhoneNumber=12345678902

function smsHandler (req, res) {
    var twilio = require('twilio');
    var client = new twilio.RestClient('AC7b9b6eb19ff245fca1bf37fae1505147',
        'ae87da74a5cfd04e53e91d0d3306d0cc');
    var twilioSms = {
        to: req.query.phoneNumber,
        from: '15107358626',
        body: 'Thanks for taking part in this demo - Nina'
    };
    client.sms.messages.create(twilioSms);

    twilioSms = {
        to: req.query.liveAgentPhoneNumber,
        from: '15107358626',
        body: 'Thanks for taking part in this demo. You were a great live agent! - Nina'
    };
    client.sms.messages.create(twilioSms);

    res.send(200);
}

exports.smsHandler = smsHandler;