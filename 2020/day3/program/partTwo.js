const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const inputData = [];
lineReader.on("line", function (line) {
	const [passwordPolicy, password] = line.split(":");
	const [allowedPossitions, letter] = passwordPolicy.split(" ");
	const [firstPosition, secondPosition] = allowedPossitions.split("-").map((value) => Number(value) - 1);
	inputData.push({ passwordPolicy: { firstPosition, secondPosition, letter }, password: password.trim() });
});

lineReader.on("close", function () {
	let approvedPasswords = 0;
	for (const controll of inputData) {
		const isFirstCharacter =
			controll.password[controll.passwordPolicy.firstPosition] === controll.passwordPolicy.letter ? true : false;
		const isLastCharacter =
			controll.password[controll.passwordPolicy.secondPosition] === controll.passwordPolicy.letter ? true : false;

		if (isFirstCharacter === true && isLastCharacter === true) {
			continue;
		} else if (isFirstCharacter === true || isLastCharacter === true) {
			approvedPasswords++;
		}
	}

	console.log("Answer: ", approvedPasswords);
});
