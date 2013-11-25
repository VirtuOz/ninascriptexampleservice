// IP Address module
// =================

// ipHandler
// ---------
// This function returns the client's IP Address.
//
// It supports **plain text** &amp; **JSON-Padding**.  
// If the `callback` parameter is set, JSON-P will be enabled.

// ### Examples:
// * http://localhost:3000/whatsmyip
// ```
// 127.0.0.1
// ```
// * http://localhost:3000/whatsmyip?callback=myFunction
// ```
// myFunction && myFunction('127.0.0.1');
// ```

function ipHandler (req, res){
    var ip = req.connection.remoteAddress;

    if(req.query && req.query.callback){
        res.jsonp(ip);
    }else{
        res.header('Content-Type', 'text/plain');
        res.send(ip);
    }
}

exports.ipHandler = ipHandler;