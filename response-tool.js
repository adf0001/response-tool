
// response-tool @ npm
// response tool

var outputText = function (res, text, status, header) {
	res.writeHead(status || 200, header || { 'Content-Type': 'text/plain;charset=UTF-8' });
	//console.log("text: " + text);
	res.end(text);
}

var outputJson = function (res, json, status, header) {
	outputText(res, JSON.stringify(json), status, header || { 'Content-Type': 'text/json;charset=UTF-8' });
}

var outputError = function (res, error, status, header) {
	var err;

	if (typeof error !== "object") { err = error; }
	else if (error instanceof Error) { err = error.message; }
	else { err = JSON.stringify(error); }

	outputText(res, err, status || 500, header);
}

var outputErrorOrData = function (res, error, data, status, header) {
	if (error) outputError(res, error, status, header);
	else outputJson(res, data, status, header);
}

//module

module.exports = {
	text: outputText,
	json: outputJson,
	error: outputError,
	errorOrData: outputErrorOrData,
}
