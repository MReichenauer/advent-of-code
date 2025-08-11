const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let allPassports = [];
let currentPassport = [];

const validateObjectKeys = (obj, required) => {
	return required.every((key) => key in obj);
};

const convertArrToObj = (arr) => {
	const keyVal = arr.join(" ").split(/\s+/);
	const obj = {};
	keyVal.forEach((pair) => {
		const [key, value] = pair.split(":");
		obj[key] = value;
	});
	return obj;
};

lineReader.on("line", function (line) {
	if (line.trim() === "") {
		if (currentPassport.length > 0) {
			allPassports.push(convertArrToObj(currentPassport));
			currentPassport = [];
		}
	} else {
		currentPassport.push(line.trim());
	}
});

lineReader.on("close", function () {
	if (currentPassport.length > 0) {
		allPassports.push(convertArrToObj(currentPassport));
	}

	const validPassports = allPassports.filter((passport) => validateObjectKeys(passport, requiredKeys));
	console.log("Result: ", validPassports.length);
});
