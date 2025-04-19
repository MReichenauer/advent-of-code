const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const inputData = [];
lineReader.on("line", function (line) {
	inputData.push(Number(line));
});

lineReader.on("close", function () {
	const prevValueA = new Set();
	for (i = 0; i < inputData.length; i++) {
		const valueA = inputData[i];
		const valueB = 2020 - valueA;

		if (prevValueA.has(valueB)) {
			const answer = valueA * valueB;
			return console.log("Answer: ", answer);
		}
		prevValueA.add(valueA);
	}
});
