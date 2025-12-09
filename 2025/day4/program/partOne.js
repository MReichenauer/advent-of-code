const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let grid = [];

lineReader.on("line", function (line) {
	console.log("line", line);
	grid.push([...line]);
});

const findAccesibleRolls = (grid) => {
	const positionsToCheck = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	let accesibleRolls = 0;
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] !== "@") continue;
			let neighborRollsCounter = 0;

			for (const [row, col] of positionsToCheck) {
				const neighborRow = i + row;
				const neighborCol = j + col;

				if (neighborRow >= 0 && neighborRow < grid[i].length && neighborCol >= 0 && neighborCol < grid[j].length) {
					if (grid[neighborRow][neighborCol] === "@") {
						neighborRollsCounter++;
					}
				}
			}

			if (neighborRollsCounter < 4) {
				accesibleRolls++;
			}
		}
	}
	return accesibleRolls;
};
lineReader.on("close", function () {
	const totalAccesibleRolls = findAccesibleRolls(grid);
	console.log("Close part one", totalAccesibleRolls);
});
