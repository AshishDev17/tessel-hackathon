'use strict';
const path = require('path');
const av = require('./node_modules/tessel-av/lib/index');
const mp3 = path.join(__dirname, 'yoda-mudhole.mp3');
const sound = new av.Player();

// Play the mp3, starting at the 10 second mark.
sound.play(mp3, "0");

sound.on('ended', function() {
  console.log('This is not the end!');
  sound.play();
});


