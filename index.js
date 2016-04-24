'use strict'

const five = require("johnny-five")
const Raspi = require("raspi-io")
const Selfup = require("selfup-rejs")
const rejs = new Selfup

const board = new five.Board({
  io: new Raspi()
})

board.on("ready", function() {
  let led = new five.Led("P1-13")
  recurBlinkLogLoop(led)
})

const ledOn = led => {
  setTimeout( () => {
    led.on()
  }, 1000)
}

const ledOff = led => {
  setTimeout( () => {
    led.off()
  }, 5000)
}

const onLogOff = led => {
  rejs.createTable('blinkLog')
  ledOn(led)
  rejs.newData('blinkLog', {LED: "on"})
  ledOff(led)
  rejs.newData('blinkLog', {LED: "off"})
}

const recurBlinkLogLoop = (led) => {
  setTimeout ( () => {
    onLogOff(led)
    recurBlinkLogLoop(led)
  }, 6000)
}
