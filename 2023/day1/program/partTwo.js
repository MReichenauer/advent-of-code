const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});
const convertToNumber = (line, i) => {
	return (
		evenTwoDigitNumbers.find((number) => number.key === line.slice(i, i + number.key.length)) ||
		oddTwoDigitNumbers.find((number) => number.key === line.slice(i, i + number.key.length)) ||
		oneDigitNumbers.find((number) => number.key === line.slice(i, i + number.key.length)) ||
		false
	);
};
let digits = [];
let chardigits = [];
let totalSum = 0;
let iteration = 0;
const oneDigitNumbers = [
	{ key: "one", value: 1 },
	{ key: "two", value: 2 },
	{ key: "three", value: 3 },
	{ key: "four", value: 4 },
	{ key: "five", value: 5 },
	{ key: "six", value: 6 },
	{ key: "seven", value: 7 },
	{ key: "eight", value: 8 },
	{ key: "nine", value: 9 },
];
const oddTwoDigitNumbers = [
	{ key: "eleven", value: 11 },
	{ key: "twelve", value: 12 },
	{ key: "thirteen", value: 13 },
	{ key: "fourteen", value: 14 },
	{ key: "fifteen", value: 15 },
	{ key: "sixteen", value: 16 },
	{ key: "seventeen", value: 17 },
	{ key: "eighteen", value: 18 },
	{ key: "nineteen", value: 19 },
];
const evenTwoDigitNumbers = [
	{ key: "ten", value: 10 },
	{ key: "twenty", value: 20 },
	{ key: "thirty", value: 30 },
	{ key: "forty", value: 40 },
	{ key: "fifty", value: 50 },
	{ key: "sixty", value: 60 },
	{ key: "seventy", value: 70 },
	{ key: "eighty", value: 80 },
	{ key: "ninety", value: 90 },
];
lineReader.on("line", function (line) {
	for (let i = 0; i < line.length; i++) {
		if (!isNaN(line[i])) {
			digits.push({ value: line[i], index: i, iteration });
		} else {
			const foundNumber = convertToNumber(line, i);
			if (foundNumber) {
				chardigits.push({ value: foundNumber.value, index: i, iteration });
			}
		}
	}
	iteration++;
	const calibrationValue = `${digits[1]}${digits[digits.length - 1]}`;
	totalSum += Number(calibrationValue);
});

lineReader.on("close", function () {
	console.log("Answer: ", totalSum);
	console.log("digits", digits);
	console.log("char", chardigits);
});
