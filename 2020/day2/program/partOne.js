const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const inputData = [];
lineReader.on("line", function (line) {
	const [passwordPolicy, password] = line.split(":");
	const [minMaxValues, letter] = passwordPolicy.split(" ");
	const [minValue, maxValue] = minMaxValues.split("-").map((value) => Number(value));
	inputData.push({ passwordPolicy: { minValue, maxValue, letter }, password: password.trim() });
});

lineReader.on("close", function () {
	let approvedPasswords = 0;
	for (const controll of inputData) {
		let counter = 0;
		for (let i = 0; i < controll.password.length; i++) {
			if (controll.password[i] === controll.passwordPolicy.letter) {
				counter++;
			}
		}
		if (counter >= controll.passwordPolicy.minValue && counter <= controll.passwordPolicy.maxValue) {
			approvedPasswords++;
		}
	}

	console.log("Answer: ", approvedPasswords);
});
