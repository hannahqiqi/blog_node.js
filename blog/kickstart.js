var http = require("http");
var url = require("url");
var controllers = require("./controllers");

const rules = [
{path: "/", controller: controllers.home},
{path: "/user", controller: controllers.user},
{path: /^\/static(\/.*)/, controller: controllers.static}
];

function notFoundController(req, res) {
	res.end("Not found");
}

function find(arr, match) {
	for (var i=0; i<arr.length; i++) {
		if(match(arr[i])) return arr[i];
	}
}

var server = http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	var rule = find(rules, function (rule) {
		if (rule.path instanceof RegExp) {
			return pathname.match(rule.path);
		}
		return rule.path == pathname;
	});
	var controller = rule && rule.controller || notFoundController;
	controller(req, res);
	
});

server.listen(3000);