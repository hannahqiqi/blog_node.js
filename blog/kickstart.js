var http = require("http");
var url = require("url");

function homeController(req, res) {
	res.end("home");
}

function userController(req, res) {
	res.end("user");
}

function notFoundController(req, res) {
	res.end("Not found");
}

const rules = [
{path: "/", controller: homeController},
{path: "/user", controller: userController}
];

function find(arr, match) {
	for (var i=0; i<arr.length; i++) {
		if(match(arr[i])) return arr[i];
	}
}

var server = http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	var rule = find(rules, function (rule) {
		return rule.path == pathname;
	});
	var controller = rule && rule.controller || notFoundController;
	controller(req, res);
	
});

server.listen(3000);