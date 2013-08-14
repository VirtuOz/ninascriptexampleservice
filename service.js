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

        if (response.city == 'san francisco') {
            response.temperature = 71;
            response.outlook = 'sunny';
            response.knownCity = true;
        }
        else if (response.city == 'edinburgh') {
            response.temperature = 40;
            response.outlook = 'rainy';
            response.knownCity = true;
        }
        else {
            response.knownCity = false;
        }

        res.send(response);
    }
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);