
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

var outputError = function (res, error, status, header, noTimestamp) {
	var err = noTimestamp ? {} : { tm: (new Date()).getTime() };

	if (typeof error !== "object") { err.error = error; }
	else if (error instanceof Error) { err.error = error.message; }
	else { err.error = error; }

	outputJson(res, err, status || 500, header);
}

var outputErrorOrData = function (res, error, data, status, header, noTimestamp) {
	if (error) outputError(res, error, status, header, noTimestamp);
	else {
		data = { data: data };
		if (!noTimestamp) data.tm = (new Date()).getTime();

		outputJson(res, data, status, header);
	}
}

//module

module.exports = {
	text: outputText,
	json: outputJson,
	error: outputError,
	errorOrData: outputErrorOrData,
}
