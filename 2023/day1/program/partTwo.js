const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const extractSum = (digits) => {
	let firstAndLastDigit = `${digits[0]}${digits[digits.length - 1]}`;
	if (firstAndLastDigit.length > 2) {
		firstAndLastDigit = firstAndLastDigit[0] + firstAndLastDigit[firstAndLastDigit.length - 1];
	}
	return Number(firstAndLastDigit);
};

const convertToNumber = (line, i) => {
	return (
		twoDigitNumbers.find((number) => number.key === line.slice(i, i + number.key.length)) ||
		oneDigitNumbers.find((number) => number.key === line.slice(i, i + number.key.length)) ||
		null
	);
};
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
const twoDigitNumbers = [
	{ key: "ten", value: 10 },
	{ key: "eleven", value: 11 },
	{ key: "twelve", value: 12 },
	{ key: "thirteen", value: 13 },
	{ key: "fourteen", value: 14 },
	{ key: "fifteen", value: 15 },
	{ key: "sixteen", value: 16 },
	{ key: "seventeen", value: 17 },
	{ key: "eighteen", value: 18 },
	{ key: "nineteen", value: 19 },
	{ key: "twenty", value: 20 },
	{ key: "thirty", value: 30 },
	{ key: "forty", value: 40 },
	{ key: "fifty", value: 50 },
	{ key: "sixty", value: 60 },
	{ key: "seventy", value: 70 },
	{ key: "eighty", value: 80 },
	{ key: "ninety", value: 90 },
];
let totalSum = 0;
lineReader.on("line", (line) => {
	const digits = [];
	for (let i = 0; i < line.length; i++) {
		if (!isNaN(line[i])) {
			digits.push(Number(line[i]));
		} else {
			const foundSpelledOutDigit = convertToNumber(line, i);
			if (foundSpelledOutDigit) {
				digits.push(foundSpelledOutDigit.value);
			}
		}
	}
	totalSum += extractSum(digits);
});

lineReader.on("close", () => {
	console.log("Answer:", totalSum);
});
