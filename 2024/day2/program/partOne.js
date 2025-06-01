const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let amountOfSafeReports = 0;

lineReader.on("line", function (line) {
	const report = line.split(" ").map(Number);
	const firstTwoValuesAbs = Math.abs(report[0] - report[1]);
	const shouldIncrease = report[0] < report[1];

	if (firstTwoValuesAbs === 0 || firstTwoValuesAbs > 3) return;
	let isRaportSafe = true;

	for (let i = 0; i < report.length - 1; i++) {
		const currentValue = report[i];
		const nextValue = report[i + 1];
		const isDiffValid = Math.abs(currentValue - nextValue) >= 1 && Math.abs(currentValue - nextValue) <= 3;

		if (!isDiffValid) {
			isRaportSafe = false;
			break;
		}

		if (shouldIncrease && nextValue < currentValue) {
			isRaportSafe = false;
			break;
		}
		if (!shouldIncrease && nextValue > currentValue) {
			isRaportSafe = false;
			break;
		}
	}
	if (isRaportSafe) {
		amountOfSafeReports++;
	}
});

lineReader.on("close", function () {
	console.log("Answer: ", amountOfSafeReports);
});
