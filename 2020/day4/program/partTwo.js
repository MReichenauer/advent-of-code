const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let allPassports = [];
let currentPassport = [];
const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const convertArrToObj = (arr) => {
	const keyVal = arr.join(" ").split(/\s+/);
	const obj = {};
	keyVal.forEach((pair) => {
		const [key, value] = pair.split(":");
		obj[key] = value;
	});
	return obj;
};

const isObjectKeysValid = (obj, required) => {
	return required.every((key) => key in obj);
};

const isHexCodeValid = (hexCode) => {
	const hexColor = String(hexCode).split("#")[1];
	const hexRegExp = /^[0-9a-fA-F]+$/;
	return hexRegExp.test(hexColor);
};

const isHgtValid = (hgt) => {
	const heightValue = Number(hgt.slice(0, -2));
	const heightUnit = hgt.slice(-2);
	if (heightUnit !== "cm" && heightUnit !== "in") return false;
	if (heightUnit === "cm" && (heightValue < 150 || heightValue > 193)) return false;
	if (heightUnit === "in" && (heightValue < 59 || heightValue > 76)) return false;
	return true;
};

const isPassportValid = {
	byr: (value) => Number(value) >= 1920 && Number(value) <= 2002,
	iyr: (value) => Number(value) >= 2010 && Number(value) <= 2020,
	eyr: (value) => Number(value) >= 2020 && Number(value) <= 2030,
	hgt: (value) => isHgtValid(value),
	hcl: (value) => isHexCodeValid(value),
	ecl: (value) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value),
	pid: (value) => !isNaN(Number(value)) && value.length === 9,
};

const validatePassport = (passport) => {
	for (const key of requiredKeys) {
		if (!isPassportValid[key](passport[key])) return false;
	}
	return true;
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
	let validPassports = 0;
	if (currentPassport.length > 0) {
		allPassports.push(convertArrToObj(currentPassport));
	}

	const passportsToValidate = allPassports.filter((passport) => isObjectKeysValid(passport, requiredKeys));
	for (let i = 0; i < passportsToValidate.length; i++) {
		if (validatePassport(passportsToValidate[i])) {
			validPassports++;
		}
	}
	console.log("Result: ", validPassports);
});
