const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let tot = 0;
const findJolt = (str) => {
	let jolt = "";
	let startIndex = 0;

	for (let i = 0; i < 12; i++) {
		let val = null;
		let foundIndex = null;

		for (let j = startIndex; j <= str.length - (12 - i); j++) {
			if (Number(str[j]) > Number(val)) {
				val = str[j];
				foundIndex = j;
			}
		}

		jolt += val;
		startIndex = foundIndex + 1;
	}

	tot += Number(jolt);
};

lineReader.on("line", function (line) {
	findJolt(line);
});

lineReader.on("close", function () {
	console.log("Close part two", tot);
});
