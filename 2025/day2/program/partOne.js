const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});
let sumOfInvalidIds = 0;
const idIsInvalid = (id) => {
	const idString = String(id);
	const midPoint = idString.length / 2;
	const firstPart = idString.slice(0, midPoint);
	const secondPart = idString.slice(midPoint);
	return firstPart === secondPart;
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
	console.log("Close part one", sumOfInvalidIds);
});
