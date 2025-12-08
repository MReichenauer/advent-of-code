const lineReader = require("readline").createInterface({
	input: require("fs").createReadStream("../data.txt"),
});

let tot = 0;
const findJolt = (str) => {
	let valOne = null;
	let valTwo = null;
	let firstFoundIndex = null;

	for (let i = 0; i < str.length - 1; i++) {
		if (Number(str[i]) > Number(valOne)) {
			firstFoundIndex = i;
			valOne = str[i];
		}
	}

	for (let i = firstFoundIndex + 1; i < str.length; i++) {
		if (Number(str[i]) > Number(valTwo)) valTwo = str[i];
	}

	tot += Number(valOne + valTwo);
};

lineReader.on("line", function (line) {
	findJolt(line);
});

lineReader.on("close", function () {
	console.log("Close part one", tot);
});
