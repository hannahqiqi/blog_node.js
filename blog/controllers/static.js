const joinPath = require("path").join;
const publicPath = joinPath(__dirname, "../public");

module.exports = function(req, res) {
	console.log("params", req.params);
	var path = req.params[1];
	path = joinPath(publicPath, path);
	console.log(path);
	sendFile(path, res);
	//var path = getMatchGroup(req)
	//readFileContent(path)
	//sendContentToRes(res)
	//res.end("static");
}
