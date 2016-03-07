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

  _service.numberWithCommas = function(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  window.Services = _service;
})(window);