// Nina Toolset webservice
// =======================

// _Copyright 2013 Nuance Communications Inc. All rights reserved._

// To register a new module
// ------------------------
// 1. write your module in a separate file.
// 2. load it here.
// 3. define the routes to your module

var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	sms = require('./sms'),
	phonecall = require('./phonecall'),
	ip = require('./ip');

// SMS service
app.get('/sms', sms.smsHandler);
app.post('/sms', sms.smsHandler);

// Phone Call service
app.get('/phonecall', phonecall.phoneCallHandler);
app.post('/phonecall', phonecall.phoneCallHandler);

// IP Address service
app.get('/whatsmyip', ip.ipHandler);

// Server initialization
app.listen(port);
console.log('Listening on port ' + port);