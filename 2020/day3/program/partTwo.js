const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let data = [];
let foundTrees = [];

const slopes = [
	{ right: 1, down: 1 },
	{ right: 3, down: 1 },
	{ right: 5, down: 1 },
	{ right: 7, down: 1 },
	{ right: 1, down: 2 },
];

const calcRightSlopeIndex = (row, rightSlope) => {
	return row[rightSlope % row.length];
};

const countTreesBySlope = (slope, data) => {
	let treeCount = 0;
	let rightSlopeCount = 0;
	for (let i = 0; i < data.length; i += slope.down) {
		const indexToCheck = calcRightSlopeIndex(data[i], rightSlopeCount);
		if (indexToCheck === "#") {
			treeCount++;
		}
		rightSlopeCount += slope.right;
	}
	foundTrees.push(treeCount);
};

lineReader.on("line", function (line) {
	if (line.length) {
		data.push(line);
	}
});

lineReader.on("close", function () {
	slopes.forEach((slope) => {
		countTreesBySlope(slope, data);
	});
	const result = foundTrees.reduce((a, b) => a * b, 1);
	console.log(`Result: ${result}`);
});
