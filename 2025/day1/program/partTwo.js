const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});
let pointer = 50;
let zeroCounter = 0;
lineReader.on("line", function (line) {
	const [dir, val] = [line[0], Number(line.slice(1))];

	for (let i = 0; i < val; i++) {
		if (dir === "L") {
			pointer--;
			if (pointer < 0) {
				pointer += 100;
			}
			if (pointer === 0) zeroCounter++;
		} else {
			pointer++;
			if (pointer >= 100) {
				pointer -= 100;
			}
			if (pointer === 0) zeroCounter++;
		}
	}
});

lineReader.on("close", function () {
	console.log("Answer: ", zeroCounter);
});
