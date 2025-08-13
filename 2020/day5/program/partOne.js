const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

// F means "front", B means "back", L means "left", and R means "right"
// rows 0 through 127
// columns 0 - 7
// Each char, split current row/column count in half and keep half indicated by char

const boardingPasses = [];
const rows = 128;
const columns = 8;
lineReader.on("line", function (line) {
	if (line.trim() !== "") boardingPasses.push(line);
});

const splitBpData = (boardingPass) => {
	const rows = boardingPass.slice(0, 6);
	const columns = boardingPass.slice(7);
	return [rows, columns];
};
const createArrayOfIntergens = (uppTo) => {
	const arrOfIntergens = [];
	for (let i = 0; i < uppTo; i++) {
		arrOfIntergens.push(i);
	}
	console.log("arrOfIntergens", arrOfIntergens);
};

lineReader.on("close", function () {
	createArrayOfIntergens(8);
	const firsBp = boardingPasses[0];
	const [rows, columns] = splitBpData(firsBp);
	console.log("firstBp: ", firsBp);
	console.log("rows, columns", rows, columns);
	console.log("Boarding passes:", boardingPasses);
	console.log("Close: Part one");
});
