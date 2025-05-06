const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let submarine = {
	horizontal: 0,
	depth: 0,
	aim: 0,
};

lineReader.on("line", function (line) {
	const [commandDirection, commandValue] = line.split(" ");

	switch (commandDirection) {
		case "forward":
			submarine.horizontal += Number(commandValue);
			submarine.depth += Number(commandValue) * submarine.aim;
			break;
		case "down":
			submarine.aim += Number(commandValue);
			break;
		case "up":
			submarine.aim -= Number(commandValue);
			break;
	}
});

lineReader.on("close", function () {
	const answer = submarine.horizontal * submarine.depth;

	console.log("Answer: ", answer);
});
