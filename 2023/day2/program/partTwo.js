const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let answer = 0;

lineReader.on("line", function (line) {
	const game = line.split(";");
	const firstRound = game[0].split(":")[1];
	const rounds = [firstRound, ...game.slice(1)];

	const cubesUsed = {
		red: 0,
		blue: 0,
		green: 0,
	};

	for (let i = 0; i < rounds.length; i++) {
		rounds[i].split(",").forEach((reveal) => {
			const [quantity, color] = reveal.trim().split(" ");
			if (cubesUsed[color] < Number(quantity)) {
				cubesUsed[color] = Number(quantity);
			}
		});
	}
	answer += cubesUsed.red * cubesUsed.blue * cubesUsed.green;
});

lineReader.on("close", function () {
	console.log("Answer: ", answer);
});
