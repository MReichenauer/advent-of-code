const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let treeCount = 0;
let rightSlopeCount = 0;
const calcRightSlopeIndex = (row, index) => {
	return row[index % row.length];
};
const countTreesOnRow = (indexToCheck) => {
	if (indexToCheck === "#") {
		treeCount++;
	}
	rightSlopeCount += 3;
};
lineReader.on("line", function (line) {
	if (line.length) {
		const indexToCheck = calcRightSlopeIndex(line, rightSlopeCount);
		countTreesOnRow(indexToCheck);
	}
});

lineReader.on("close", function () {
	console.log(`Result: ${treeCount}`);
});
