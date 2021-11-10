var http = require('http');

const TelegramBot = require('node-telegram-bot-api');
const token = '2123064625:AAHi01l4sA-MqrK0oky5MANE1jUaog9xP7E';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});

bot.on('message', (message) => {
    var chat_id = message.from.id;
    //console.log(message)
    if (message.text === "/start") {
        bot.sendMessage(chat_id, `Hello ${message.from.first_name}`)
        bot.sendMessage(chat_id, `send me your location or city name to show your weather situation :)`)
    }
    if (message.text !== null) {
        city = message.text;
        var cityOptions = {
            host: 'api.openweathermap.org',
            path: `/data/2.5/weather?q=${city}&appid=${weather_APIKEY}&units=metric`
        };
        http.request(cityOptions, callback).end();
    }
})

let weather_APIKEY = '13a49ece254b7f95e3e56d715eddedbe';
var city;



callback = function (response) {
    var str = '';

    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
        str = JSON.parse(str);
    });

    //the whole response has been received, so we just print it out here
    response.on('end', function () {
        bot.on("message", (message) => {
            bot.sendMessage(message.from.id, `location: ${str.name}\nweather tempratur: ${str.main.temp}\nfeels like: ${str.main.feels_like}\nweather situation: ${str.weather[0].main}`)
        })
    });
}