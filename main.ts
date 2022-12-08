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
    basic.showNumber(input.temperature())
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "temperature",
    "light",
    "sound"
    )
})
input.onButtonPressed(Button.B, function () {
    if (on == 0) {
        logging = true
        basic.showIcon(IconNames.Yes)
        on = 1
    } else {
        logging = false
        basic.showIcon(IconNames.No)
        on = 0
    }
})
let logging = false
let on = 0
on = 0
logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"temperature",
"light",
"sound"
)
loops.everyInterval(60000, function () {
    if (logging) {
        basic.showIcon(IconNames.Heart)
        datalogger.log(
        datalogger.createCV("temperature", input.temperature()),
        datalogger.createCV("light", input.lightLevel()),
        datalogger.createCV("sound", input.soundLevel())
        )
        basic.clearScreen()
    }
})
