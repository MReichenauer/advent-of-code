const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

lineReader.on("line", function (line) {});

lineReader.on("close", function () {
	console.log("Close: Part one");
});
