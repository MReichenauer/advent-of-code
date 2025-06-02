const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let amountOfSafeReports = 0;

lineReader.on("line", function (line) {
	const report = line.split(" ").map(Number);

	if (isReportSafe(report)) {
		amountOfSafeReports++;
	} else if (isReportSafeWithProblemDampener(report)) {
		amountOfSafeReports++;
	}
});

const isReportSafe = (report) => {
	const firstTwoValuesAbs = Math.abs(report[0] - report[1]);
	const shouldIncrease = report[0] < report[1];

	if (firstTwoValuesAbs === 0 || firstTwoValuesAbs > 3) return false;

	for (let i = 0; i < report.length - 1; i++) {
		const currentValue = report[i];
		const nextValue = report[i + 1];
		const isDiffValid = Math.abs(currentValue - nextValue) >= 1 && Math.abs(currentValue - nextValue) <= 3;

		if (!isDiffValid) {
			return false;
		}

		if (shouldIncrease && nextValue < currentValue) {
			return false;
		}
		if (!shouldIncrease && nextValue > currentValue) {
			return false;
		}
	}
	return true;
};

const isReportSafeWithProblemDampener = (report) => {
	for (let i = 0; i < report.length; i++) {
		const newReport = report.slice(0, i).concat(report.slice(i + 1));
		if (isReportSafe(newReport)) {
			return true;
		}
	}
	return false;
};

lineReader.on("close", function () {
	console.log("Answer: ", amountOfSafeReports);
});
