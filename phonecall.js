// Phone Call module
// ==================

// phoneCallHandler
// ----------------

function phoneCallHandler (req, res) {
    var twilio = require('twilio');
    var resp = new twilio.TwimlResponse();

    var textToSay = req.query.textToSay || "Hi, this is Nina! Thanks for requesting a call back. I'm connecting you " +
        "with your live agent.";

    resp.say(textToSay, {
        voice: 'woman',
        language: 'en-us'
    });

    var liveAgentPhoneNumber = req.query.liveAgentPhoneNumber;
    var phoneNumber = req.query.phoneNumber;

    // Connect with the live agent operator.
    if (liveAgentPhoneNumber && liveAgentPhoneNumber != phoneNumber) {
        resp.dial(liveAgentPhoneNumber);
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
}

exports.phoneCallHandler = phoneCallHandler;