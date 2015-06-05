"use strict";
require("es5-shim")
require("babel/register")

var Promise = require('es6-promise').Promise
var $ = require('jquery')
var key = '2d0dd6268e175524fdb995975edfd96b'

var GPS = new Promise((res, rej) => {
    // if gps successful, resolve with coordinates
    // else reject with error
    navigator.geolocation.getCurrentPosition(
        (gpsData) => res({
            lat: gpsData.coords.latitude,
            lon: gpsData.coords.longitude
        }), (error) => rej(error.message)
    )
})

GPS.then((ll) => {

    function qs(selector) {
        return document.querySelector(selector)
    }

    var url = `https:/api.forecast.io/forecast/${key}/${ll.lat},${ll.lon}?callback=?`

    var x = $.getJSON(url).then((r) => {
        

        var current_data = r.currently
        var temp_current = current_data.temperature
        var appTemp_current = current_data.apparentTemperature
        var precProb_current = `${current_data.precipProbability*100}%`
        var summary_current = current_data.summary
        var visibility = current_data.visibility
        var humidity_current = current_data.humidity
        qs(".current").innerHTML += temp_current
        qs(".current").innerHTML += appTemp_current
        qs(".current").innerHTML += precProb_current
        qs(".current").innerHTML += summary_current
        qs(".current").innerHTML += visibility
        qs(".current").innerHTML += humidity_current



        //Daily forecast data
        var daily_data = r.daily.data[0] //array
        var highLow = `${Math.round(daily_data.temperatureMax)}${Math.round(daily_data.temperatureMin)}\xB0`
        var feelsLike = `Feels like: ${Math.round(daily_data.apparentTemperatureMax)}\xB0/${Math.round(daily_data.apparentTemperatureMin)}\xB0`
        var chance_of_precipitation = `Chance of precipitation: ${daily_data.precipProbability*100}%`
        var summary = `${daily_data.summary}`
        var weather_icon_url = function(daily_data) {}

        var weather_icon_tag = `<img src="${weather_icon_url(daily_data)}">`

        qs(".daily").innerHTML = weather_icon_tag + `${qs(".daily").innerHTML}`
        qs("#hiLo").innerHTML = highLow
        qs("#apparentHiLo").innerHTML = feelsLike
        qs("#chancePrecip").innerHTML = chance_of_precipitation
        qs("#overview").innerHTML = summary

        days.forEach((day) => {})


    })

})

