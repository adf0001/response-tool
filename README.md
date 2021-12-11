# response-tool
response tool

# Install
```
npm install response-tool
```

# Usage
```javascript
var response_tool = require("response-tool");

response_tool.text(res, "a1");		//.text()
response_tool.text(res, "a2", 201, { bbb: 1 });

response_tool.json(res, { bbb: 2 }, 202);		//.json()

response_tool.error(res, "err1", null, null);		//.error("string")
response_tool.error(res, Error("err2"), 501, null);		//.error(Error)
response_tool.error(res, { err: "err3" }, 502, null);		//.error(oject)

var err = "err5", data = null;
response_tool.errorOrData(res, err, data, err ? 503 : 200, null);		//.errorOrData( Error or data )
err = null; data = "data6";
response_tool.errorOrData(res, err, data, err ? 503 : 200, null);
err = null; data = { d: "data7" };
response_tool.errorOrData(res, err, data, err ? 503 : 200, { h: 7 });

console.log(rsl);

/*
var expect = [
	'200:{"Content-Type":"text/plain;charset=UTF-8"}', 'a1',
	'201:{"bbb":1}', 'a2',
	'202:{"Content-Type":"text/json;charset=UTF-8"}', '{"bbb":2}',
	'500:{"Content-Type":"text/plain;charset=UTF-8"}', 'err1',
	'501:{"Content-Type":"text/plain;charset=UTF-8"}', 'err2',
	'502:{"Content-Type":"text/plain;charset=UTF-8"}', '{"err":"err3"}',
	'503:{"Content-Type":"text/plain;charset=UTF-8"}', 'err5',
	'200:{"Content-Type":"text/json;charset=UTF-8"}', '"data6"',
	'200:{"h":7}', '{"d":"data7"}',
];
*/

```