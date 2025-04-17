const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("../data.txt")
  });
  
  let current = 0
  let weight = [];
  
  lineReader.on('line', function (line) {
    if (line.length > 0 ){
      current += Number(line)
     
    } else {
      weight.push(current);
      current = 0
    }
  });
  
  lineReader.on('close', function () {
      weight.sort((a, b) => b - a);
      console.log("Answer: ", weight.at(0)+weight.at(1)+weight.at(2));
  });