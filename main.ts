datalogger.onLogFull(function () {
    logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    serial.writeLine("A")
    basic.showNumber(input.temperature())
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "temperature",
    "light",
    "rcvdserial",
    "temperature1",
    "light1"
    )
})
input.onButtonPressed(Button.B, function () {
    serial.writeLine("B")
    if (logging == false) {
        logging = true
        basic.showIcon(IconNames.Yes)
    } else {
        logging = false
        basic.showIcon(IconNames.No)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "temp") {
        temp1 = value
        rcvdserial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    } else if (name == "light") {
        light1 = value
        rcvdserial = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    }
})
let light1 = 0
let rcvdserial = 0
let temp1 = 0
let logging = false
radio.setGroup(2)
radio.setTransmitPower(7)
radio.setTransmitSerialNumber(true)
logging = false
datalogger.setColumnTitles(
"temperature",
"light",
"rcvdserial",
"temperature1",
"light1"
)
basic.showIcon(IconNames.Heart)
loops.everyInterval(60000, function () {
    if (logging == true) {
        serial.redirectToUSB()
        basic.showLeds(`
            . . . . #
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        datalogger.log(
        datalogger.createCV("temperature", input.temperature()),
        datalogger.createCV("light", input.lightLevel()),
        datalogger.createCV("light1", light1),
        datalogger.createCV("temperature1", temp1),
        datalogger.createCV("rcvdserial", rcvdserial)
        )
        serial.writeValue("temp", input.temperature())
        serial.writeValue("light", input.lightLevel())
        serial.writeValue("rcvdserial", rcvdserial)
        serial.writeValue("temp1", temp1)
        serial.writeValue("light1", light1)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . #
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        radio.sendValue("temp", input.temperature())
        radio.sendValue("light", input.lightLevel())
    }
})
