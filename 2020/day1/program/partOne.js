const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("../data.txt")
  });
  
  let inputData = []
  let answer = 0
  lineReader.on('line', function (line) {
      inputData.push(Number(line))
  });
  
  lineReader.on('close', function () {
    for(i = 0; i < inputData.length; i++) {
        const valueA = inputData[i]
        inputData.forEach((valueB) => {
            if (valueA+valueB === 2020) answer = valueA*valueB
            
        });
    };
      console.log("Answer: ", answer)
  });
  