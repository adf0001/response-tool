// global, for html page
response_tool = require("../response-tool.js");

module.exports = {

	"response_tool()": function (done) {
		var rsl = [];

		var res = {		//response simulator
			writeHead: function (statusCode, headers) {
				rsl.push(statusCode + ":" + JSON.stringify(headers));
			},
			end: function (data) {
				rsl.push(data);
			},
		};

		response_tool.text(res, "a1");		//.text()
		response_tool.text(res, "a2", 201, { bbb: 1 });

		response_tool.json(res, { bbb: 2 }, 202);		//.json()

		response_tool.error(res, "err1", null, null, true);		//.error("string")
		response_tool.error(res, Error("err2"), 501, null, true);		//.error(Error)
		response_tool.error(res, { err: "err3" }, 502, null, true);		//.error(oject)

		var err = "err5", data = null;
		response_tool.errorOrData(res, err, data, err ? 503 : 200, null, true);		//.errorOrData( Error or data )
		err = null; data = "data6";
		response_tool.errorOrData(res, err, data, err ? 503 : 200, null, true);
		err = null; data = { d: "data7" };
		response_tool.errorOrData(res, err, data, err ? 503 : 200, { h: 7 }, true);

		console.log(rsl);

		var expect = [
			'200:{"Content-Type":"text/plain;charset=UTF-8"}', 'a1',
			'201:{"bbb":1}', 'a2',
			'202:{"Content-Type":"text/json;charset=UTF-8"}', '{"bbb":2}',
			'500:{"Content-Type":"text/plain;charset=UTF-8"}', 'err1',
			'501:{"Content-Type":"text/plain;charset=UTF-8"}', 'err2',
			'502:{"Content-Type":"text/plain;charset=UTF-8"}', '{"err":"err3"}',
			'503:{"Content-Type":"text/plain;charset=UTF-8"}', 'err5',
			'200:{"Content-Type":"text/json;charset=UTF-8"}', '{"data":"data6"}',
			'200:{"h":7}', '{"data":{"d":"data7"}}',
		];


		done(!(rsl.join("") === expect.join("")));
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
