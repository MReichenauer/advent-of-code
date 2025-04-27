const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});
const leftList = [];
const rightList = [];
const sortList = (listToSort) => listToSort.sort((a, b) => a - b);
const getDifference = (a, b) => Math.abs(a - b);
const getTotalDistance = (leftList, rightList) => {
	const leftListSorted = sortList(leftList);
	const rightListSorted = sortList(rightList);
	let totalDifference = 0;

	for (let i = 0; i < leftListSorted.length; i++) {
		totalDifference += getDifference(leftListSorted[i], rightListSorted[i]);
	}
	return totalDifference;
};

lineReader.on("line", function (line) {
	const currentLine = line.split(" ").filter((numberString) => numberString.length > 0);
	leftList.push(Number(currentLine[0]));
	rightList.push(Number(currentLine[1]));
});

lineReader.on("close", function () {
	console.log("answer: ", getTotalDistance(leftList, rightList));
});
