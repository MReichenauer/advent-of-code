const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const inputData = {
	horizontal: 0,
	up: 0,
	down: 0,
};

lineReader.on("line", function (line) {
	const [commandDirection, commandValue] = line.split(" ");

	switch (commandDirection) {
		case "forward":
			inputData.horizontal += Number(commandValue);
			break;
		case "down":
			inputData.down += Number(commandValue);
			break;
		case "up":
			inputData.up += Number(commandValue);
			break;
	}
});

lineReader.on("close", function () {
	const answer = inputData.horizontal * Math.abs(inputData.up - inputData.down);

	console.log("Answer: ", answer);
});
