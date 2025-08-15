const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let seatIds = [];

const decodeSplittedBpData = (data, maxRange) => {
	const range = { min: 0, max: maxRange - 1 };
	for (let i = 0; i < data.length; i++) {
		const midpoint = Math.ceil((range.min + range.max) / 2);
		if (data[i] === "F" || data[i] === "L") {
			range.max = midpoint - 1;
		} else {
			range.min = midpoint;
		}
	}
	return range.min;
};

const splitBinaryBpData = (binaryBp) => {
	const rows = binaryBp.slice(0, 7);
	const columns = binaryBp.slice(7);
	return [rows, columns];
};

const decodeBinaryBpData = (data) => {
	const [rowsData, columnsData] = splitBinaryBpData(data);
	const decodedSeat = { row: decodeSplittedBpData(rowsData, 128), column: decodeSplittedBpData(columnsData, 8) };
	return decodedSeat;
};

const calculateSeatId = (seat) => {
	return seat.row * 8 + seat.column;
};

const getMySeatId = (seatIds) => {
	const sortedIds = seatIds.sort((a, b) => a - b);
	for (let i = 0; i < sortedIds.length; i++) {
		if (sortedIds[i] + 1 !== sortedIds[i + 1]) {
			return sortedIds[i] + 1;
		}
	}
};

lineReader.on("line", function (line) {
	if (line.trim() !== "") {
		const seat = decodeBinaryBpData(line);
		const currentSeatId = calculateSeatId(seat);
		seatIds.push(currentSeatId);
	}
});

lineReader.on("close", function () {
	const mySeatId = getMySeatId(seatIds);
	console.log("Result: ", mySeatId);
});
