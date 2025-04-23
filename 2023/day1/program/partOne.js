const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let digits = 0;
let totalSum = 0;

lineReader.on("line", function (line) {
	for (let i = 0; i < line.length; i++) {
		if (!isNaN(line[i])) {
			digits += line[i];
		}
	}

	const calibrationValue = `${digits[1]}${digits[digits.length - 1]}`;
	totalSum += Number(calibrationValue);
	digits = 0;
});

lineReader.on("close", function () {
	console.log("Answer: ", totalSum);
});
