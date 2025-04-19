const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const inputData = [];
lineReader.on("line", function (line) {
	inputData.push(Number(line));
});

lineReader.on("close", function () {
	for (let i = 0; i < inputData.length; i++) {
		const valueA = inputData[i];
		const prevValueB = new Set();

		for (let j = i + 1; j < inputData.length; j++) {
			const valueB = inputData[j];

			const valueC = 2020 - valueA - valueB;

			if (prevValueB.has(valueC)) {
				const answer = valueA * valueB * valueC;
				return console.log("Answer: ", answer);
			}
			prevValueB.add(valueB);
		}
	}
});
