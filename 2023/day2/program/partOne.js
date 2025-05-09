const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let answer = 0;
const restrictions = {
	red: 12,
	green: 13,
	blue: 14,
};
const isPossible = (game) => {
	return game.rounds.every(
		(round) => round.red <= restrictions.red && round.blue <= restrictions.blue && round.green <= restrictions.green,
	);
};

lineReader.on("line", function (line) {
	const game = line.split(";");
	const firstRound = game[0].split(":")[1];
	const rounds = [firstRound, ...game.slice(1)];
	const formatedGame = { id: Number(game[0].split(":")[0].split(" ")[1]), rounds: [] };

	for (let i = 0; i < rounds.length; i++) {
		const round = {
			red: 0,
			blue: 0,
			green: 0,
		};
		rounds[i].split(",").forEach((reveal) => {
			const [quantity, color] = reveal.trim().split(" ");
			round[color] = Number(quantity);
		});
		formatedGame.rounds.push(round);
	}
	if (isPossible(formatedGame)) {
		answer += formatedGame.id;
	}
});

lineReader.on("close", function () {
	console.log("Answer: ", answer);
});
