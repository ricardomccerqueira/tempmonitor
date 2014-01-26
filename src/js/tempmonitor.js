var App;

App = (function() {
  var board, five, fs, loopCount, moment;
  fs = require("fs");
  five = require("johnny-five");
  moment = require("moment");
  board = new five.Board();
  tempSensor;
  jsonObj;
  lcd;
  loopCount = 0;
  return board.on("ready", function() {
    var lcd, tempSensor;
    lcd = new five.LCD({
      pins: [12, 11, 5, 4, 3, 2]
    });
    tempSensor = new five.Sensor({
      pin: "A0",
      freq: 900
    });
    lcd.on("ready", function() {
      return lcd.cursor(1, 0);
    });
    tempSensor.on("data", function(err, reading) {
      var date, filename, temperature, voltage;
      voltage = reading * .004882814;
      temperature = (voltage - .5) * 100;
      if (!isNaN(temperature)) {
        lcd.clear().print("   " + parseInt(temperature) + " celcius");
        date = moment().format("DD-MM-YYYY HH:mm");
        filename = "app/json/" + moment().format("DD-MM-YYYY") + ".json";
        return fs.readFile(filename, 'utf8', function(err, data) {
          var error, jsonStr;
          if (!err || err.code === "ENOENT") {
            try {
              data = JSON.parse(data);
            } catch (_error) {
              error = _error;
              data = [];
            }
            jsonStr = {
              time: date,
              temperature: temperature
            };
            data.push(jsonStr);
            return fs.writeFile(filename, JSON.stringify(data, null, 4));
          } else {
            return console.log(err.code);
          }
        });
      }
    });
    return this.repl.inject({
      lcd: lcd,
      sensor: tempSensor
    });
  });
})();
