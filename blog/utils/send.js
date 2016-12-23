var fs = require("fs");
var mime = require("mime");

exports.sendFile = function(path, res) {
		fs.readFile(path, function(err, data) {
			if (err) {
				if (err.code == "ENOENT") {
					res.writeHead(404);
					res.end("Not found");
					return;
				} else {
					res.writeHead(500);
					res.end(err.message);
				}	
			} else {
				var mimeType = mime.lookup(path);
				var charset = mime.charsets.lookup(mimeType);
				console.log("mimeType: ", mimeType, "charset: ", charset);
				res.setHeader("Content-Type", mimeType + (charset ? "; charset="+charset : ""));
				res.end(data);
			}			
		});
	}