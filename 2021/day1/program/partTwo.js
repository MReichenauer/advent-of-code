const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("../data.txt")
  });
  
  let list = []
  let inc = 0
  let numberOfValues = 0
  let currentWindowValue = 0
  lineReader.on('line', function (line) {
    numberOfValues++;
    if (numberOfValues >= 3) {
        currentWindowValue = 0;
        numberOfValues = 0;
        } else {

            currentWindowValue += Number(line);
        }
   
      list.push(currentWindowValue)
      console.log("Current Window Value: ", currentWindowValue)
      console.log("Current List: ", list)
     
  });
  
  lineReader.on('close', function () {
      for(i = 0; i < list.length - 1; i++) {      
          if (list[i] < list[i+1]) inc++
      } 
      console.log("Answer: ", inc)
  });
  