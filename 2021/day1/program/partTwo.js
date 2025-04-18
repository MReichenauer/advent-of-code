const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream("../data.txt")
  });
  
  let measurements = []
  let incCounter = 0
  let measurmentWindows = []

  lineReader.on('line', function (line) {
    currentval = Number(line)
    measurements.push(Number(line))
  });
  
  lineReader.on('close', function () {
    for(i = 0; i+3 <= measurements.length ; i++) {      
        currentWindow = measurements[i]+measurements[i+1]+measurements[i+2]
        measurmentWindows.push(currentWindow)
    } 
    for(i = 0; i < measurmentWindows.length - 1; i++) {
        if (measurmentWindows[i] < measurmentWindows[i+1]) incCounter++
    }
    console.log("Answer: ", incCounter)
  });
  