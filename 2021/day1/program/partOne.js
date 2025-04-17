const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("../data.txt")
  });
  
  let list = []
  let inc = 0
  lineReader.on('line', function (line) {
      list.push(Number(line))
  });
  
  lineReader.on('close', function () {
      for(i = 0; i < list.length - 1; i++) {      
          if (list[i] < list[i+1]) inc++
      } 
      console.log("Answer: ", inc)
  });
  