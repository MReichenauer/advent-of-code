const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});
const endRoundWith = {
	X: "lose",
	Y: "draw",
	Z: "win",
};
const shapes = {
	rock: {
		value: "A",
		winsTo: "scissors",
		losesTo: "paper",
		score: 1,
	},
	paper: {
		value: "B",
		winsTo: "rock",
		losesTo: "scissors",
		score: 2,
	},
	scissors: {
		value: "C",
		winsTo: "paper",
		losesTo: "rock",
		score: 3,
	},
};

const findShape = (shapeValue) => {
	return Object.values(shapes).find((shape) => shape.value === shapeValue);
};

const roundResult = (opponentValue, endRoundWith) => {
	const opponentShape = findShape(opponentValue);
	switch (endRoundWith) {
		case "win":
			return shapes[opponentShape.losesTo].score + 6;
		case "lose":
			return shapes[opponentShape.winsTo].score;
		default:
			return opponentShape.score + 3;
	}
};

let playerScore = 0;

lineReader.on("line", function (line) {
	const [opponentValue, playerValue] = line.split(" ");
	const result = roundResult(opponentValue, endRoundWith[playerValue]);
	playerScore += result;
});

lineReader.on("close", function () {
	console.log("Answer: ", playerScore);
});
