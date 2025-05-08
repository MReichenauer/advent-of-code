const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

const shapes = {
	rock: {
		opponentValue: "A",
		playerValue: "X",
		score: 1,
	},
	paper: {
		opponentValue: "B",
		playerValue: "Y",
		score: 2,
	},
	scissors: {
		opponentValue: "C",
		playerValue: "Z",
		score: 3,
	},
};

const findShape = (shapeValue) => {
	return Object.values(shapes).find((shape) => shape.playerValue === shapeValue || shape.opponentValue === shapeValue);
};

const calculatePlayerScore = (opponentValue, playerValue) => {
	if (opponentValue === playerValue) {
		return 3 + playerValue;
	}

	switch (opponentValue) {
		case 1:
			return playerValue === 2 ? 6 + playerValue : playerValue;
		case 2:
			return playerValue === 3 ? 6 + playerValue : playerValue;
		case 3:
			return playerValue === 1 ? 6 + playerValue : playerValue;
	}
};

const roundResult = (opponentValue, playerValue) => {
	const opponentShape = findShape(opponentValue);
	const playerShape = findShape(playerValue);
	return calculatePlayerScore(opponentShape.score, playerShape.score);
};

let playerScore = 0;

lineReader.on("line", function (line) {
	const [opponentValue, playerValue] = line.split(" ");
	const result = roundResult(opponentValue, playerValue);
	playerScore += result;
});

lineReader.on("close", function () {
	console.log("Answer: ", playerScore);
});
