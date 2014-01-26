tempmonitor
===========

Arduino temperature monitor

Simple temperature monitor using an Arduino sparkfun starter kit, it was my "hello world" app, done at nodebots of london 25-01-2014 @ uswitch

http://www.meetup.com/NodeBots-of-London/events/160405872/?_af_eid=160405872&a=uc1_vm&_af=event



What does it really do?
===========

It shows the current temperature on the lcd, and it creates 1 .json file per day with all the temperature variations of that day


Dependencies
===========

- Arduino 
- lcd display ( you can follow sparkfun circuit 11 )
- temperature sensor ( you can follow sparkfun circuit 7 )
- nodejs
- grunt
- johnny-five
- coffeescript


How to use it?
===========

assuming you have all the dependencies:
- $ cd tempmonitor
- $ npm install
- $ grunt 
- $ node node app/tempmonitor.js

note that you can leave grunt and node running in two separate tabs, if you have a mac just run this 1 liner inside tempmonitor folder:

    npm update && osascript -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' -e 'tell application "System Events" to tell process "terminal" to keystroke "grunt"' -e 'tell application "System Events" to tell process "terminal" to keystroke return' && node app/tempmonitor.js


How to tweak it?
===========

**on src/coffee/main.coffee**


change the pins array to the ones on you're circuit:

    lcd = new five.LCD( pins: [12, 11, 5, 4, 3, 2] )
    

This is the temperature in celcius, you can do the maths and make it fahrenheit:

    temperature = ((voltage - .5) * 100)


change **pin** to the analog pin you choose for your circuit,
change **freq** for the update time, it will only start the app after that interval:

    tempSensor = new five.Sensor(
      pin: "A0"
      freq: 900000 #15 minutes
    )
    
