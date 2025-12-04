const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let sumOfInvalidIds = 0;

const idIsInvalid = (id) => {
	const idString = String(id);
	const midPoint = idString.length / 2;
	for (let i = 1; i <= midPoint; i++) {
		const chunk = idString.slice(0, i);
		const timesToRepeat = idString.length / chunk.length;
		if (chunk.repeat(timesToRepeat) === idString) return true;
	}
	return false;
};

lineReader.on("line", function (line) {
	line.split(",").forEach((currentRange) => {
		const [from, to] = currentRange.split("-").map(Number);
		for (let i = from; i <= to; i++) {
			if (idIsInvalid(i)) {
				sumOfInvalidIds += i;
			}
		}
	});
});

lineReader.on("close", function () {
	console.log("Close part two", sumOfInvalidIds);
});
