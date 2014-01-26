App = (() ->
  fs     = require "fs"
  five   = require "johnny-five"
  moment = require "moment"
  board  = new five.Board()
  tempSensor
  jsonObj
  lcd
  loopCount = 0
 
  board.on "ready", ->
    lcd = new five.LCD( pins: [12, 11, 5, 4, 3, 2] )

    tempSensor = new five.Sensor(
      pin: "A0"
      freq: 900
    )
    
    lcd.on "ready", ->
      lcd.cursor 1, 0

    tempSensor.on "data", (err, reading) ->
      voltage = reading * .004882814
      temperature = ((voltage - .5) * 100)
      
      if !isNaN temperature
        lcd.clear().print "   " + parseInt(temperature) + " celsius"
        date = moment().format("DD-MM-YYYY HH:mm")
        filename = "app/json/" + moment().format("DD-MM-YYYY") + ".json"

        fs.readFile filename, 'utf8', (err, data) ->
          if !err || err.code == "ENOENT" 
            try  
              data = JSON.parse data 
            catch error 
              data = []

            jsonStr =
              time: date
              temperature: temperature

            data.push jsonStr

            fs.writeFile filename, JSON.stringify data, null, 4

          else           
            console.log err.code
    
    this.repl.inject 
      lcd: lcd
      sensor: tempSensor
)()
