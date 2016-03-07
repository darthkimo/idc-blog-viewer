(function(window){
  var _service = {};

  _service.getJSONP = function(url, options){
    var onSuccess = options.onSuccess || function(){},
      onTimeout = options.onTimeout || function(){},
      timeout = options.timeout || 10,//seconds
      callback = 'dataLoaded';

    var callTimeoutFunc = window.setTimeout(function () {
      window[callback] = function(){};
      onTimeout();
    }, timeout*1000);

    window[callback] = function(data){
      window.clearTimeout(callTimeoutFunc);
      onSuccess(data);
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url + '&callback='+callback;

    document.getElementsByTagName('head')[0].appendChild(script);
  };

  _service.getQueryString = function(stringName) {
    var href = window.location.href;
    var reg = new RegExp( '[?&]' + stringName + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };

  _service.formatDate = function(date) {

    var dateData = date.split("-"),
      year = dateData[0],
      month = dateData[1],
      day = dateData[2].slice(0,2),
      months = {
        "01": "Jan",
        "02": "Feb",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
      };
    return months[month] + ' ' + day + ', ' + year;
  }

  window.Services = _service;
})(window);