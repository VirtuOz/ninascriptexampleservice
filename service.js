/**
 * Copyright 2013 Nuance Communications Inc. All rights reserved.
 */
var express = require('express');
var app = express();

app.get('/weather', function (req, res)
{
    var apiKey = req.query.apiKey;
    if (!apiKey)
    {
        res.send(401);
    }
    else
    {
        var response = {
            city: req.query.city
        };

        if (response.city == 'san francisco')
        {
            response.temperature = 71;
            response.outlook = 'sunny';
            response.knownCity = true;
        }
        else if (response.city == 'edinburgh')
        {
            response.temperature = 40;
            response.outlook = 'rainy';
            response.knownCity = true;
        }
        else
        {
            response.knownCity = false;
        }

        res.send(response);
    }
});

var phoneCallHandler = function (req, res)
{
    var twilio = require('twilio');
    var resp = new twilio.TwimlResponse();

    resp.say("Hi, this is Nina, calling from Citibank! Thanks for requesting a call back. Your live agent will be with you shortly.", {
        voice: 'woman',
        language: 'en-us'
    });

    var liveAgentPhoneNumber = req.query.liveAgentPhoneNumber;
    var phoneNumber = req.query.phoneNumber;

    // Connect with the live agent operator.
    if (liveAgentPhoneNumber && liveAgentPhoneNumber != phoneNumber)
    {
        resp.dial(liveAgentPhoneNumber);
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(resp.toString());
};
app.get('/phonecall', phoneCallHandler);
app.post('/phonecall', phoneCallHandler);

var smsHandler = function (req, res)
{
    var twilio = require('twilio');
    var client = new twilio.RestClient('AC7b9b6eb19ff245fca1bf37fae1505147', 'ae87da74a5cfd04e53e91d0d3306d0cc');
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
};
app.get('/sms', smsHandler);
app.post('/sms', smsHandler);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);