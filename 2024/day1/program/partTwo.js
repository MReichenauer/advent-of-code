const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const leftList = [];
const rightList = [];

lineReader.on("line", function (line) {
	const currentLine = line.split(" ").filter((numberString) => numberString.length > 0);
	leftList.push(Number(currentLine[0]));
	rightList.push(Number(currentLine[1]));
});

const getSimilarityScore = (leftList, rightList) => {
	const leftListSet = new Set(leftList);
	const similarityTrackerMap = new Map();

	for (let i = 0; i < rightList.length; i++) {
		const value = rightList[i];
		if (!leftListSet.has(value)) continue;

		if (similarityTrackerMap.has(value)) {
			similarityTrackerMap.set(value, similarityTrackerMap.get(value) + 1);
		} else {
			similarityTrackerMap.set(value, 1);
		}
	}

	return leftList.reduce((accumulator, current) => accumulator + current * (similarityTrackerMap.get(current) ?? 0), 0);
};

lineReader.on("close", function () {
	console.log("answer: ", getSimilarityScore(leftList, rightList));
});
