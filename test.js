var http = require('http');

//The url we want is: 'http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric'
var options = {
  host: 'api.openweathermap.org',
  path: '/data/2.5/weather?q=london&appid=13a49ece254b7f95e3e56d715eddedbe&units=metric'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
    str = JSON.parse(str);
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();