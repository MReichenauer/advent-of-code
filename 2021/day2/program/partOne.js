const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const submarine = {
	horizontal: 0,
	up: 0,
	down: 0,
};

lineReader.on("line", function (line) {
	const [commandDirection, commandValue] = line.split(" ");

	switch (commandDirection) {
		case "forward":
			submarine.horizontal += Number(commandValue);
			break;
		case "down":
			submarine.down += Number(commandValue);
			break;
		case "up":
			submarine.up += Number(commandValue);
			break;
	}
});

lineReader.on("close", function () {
	const answer = submarine.horizontal * Math.abs(submarine.up - submarine.down);

	console.log("Answer: ", answer);
});
