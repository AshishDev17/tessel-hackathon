'use strict';
const path = require('path');
const av = require('./node_modules/tessel-av/lib/index');
const mp31 = path.join(__dirname, 'yoda-mudhole.mp3');
const mp32 = path.join(__dirname, 'baby.mp3');
const mp33 = path.join(__dirname, 'GetToDaChoppa.mp3');
const mp34 = path.join(__dirname, 'YouSonOfABitch.mp3');
const mp35 = path.join(__dirname, 'over9000.mp3');
const mp36 = path.join(__dirname, 'NotATumah.mp3');
const mp37 = path.join(__dirname, 'Stop_Whining.mp3');
const mp38 = path.join(__dirname, 'DoItNow3.mp3');
const mp311 = path.join(__dirname, 'IAmThePartyPoopah.mp3');
const mp312 = path.join(__dirname, 'sob.mp3');





const sound = new av.Player();

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']);

rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {

    var num = Math.floor(Math.random() * 9);

    const mp31 = path.join(__dirname, 'yoda-mudhole.mp3');
    const soundFileArray = [
      mp32,
      mp33,
      mp34,
      mp35,
      mp36,
      mp37,
      mp38,
      mp311,
      mp312
    ]
    console.log('UID:', card.uid.toString('hex'));
    sound.play(soundFileArray[num], "0");
  });
});

rfid.on('error', function (err) {
  console.error(err);
});



var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['B']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.05, 0.12, function () {
    servo.move(servo1, 0);

    setInterval(function() {
      servo.move(16, 0);
      setTimeout(function() {
        servo.move(16, 1);
      }, 500)
    }, 1000)


    function playSound () {
      servo.move(servo1, 0.7);
      setTimeout(function() {
        servo.move(servo1, 0);
      }, 500);
      const wait = Math.floor(Math.random() * 10) + 4000;
      setTimeout(function() {
        playSound();
      }, wait)
    }
    playSound();
    // setInterval(function () {
    //   console.log('Position (in range 0-1):', position);
    //   //  Set servo #1 to position pos.
    //   servo.move(servo1, position);

    //   // Increment by 10% (~18 deg for a normal servo)
    //   position += 0.1;
    //   if (position > 1) {
    //     position = 0; // Reset servo position
    //   }
    // }, 500); // Every 500 milliseconds
  });
});
