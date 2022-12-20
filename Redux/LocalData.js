var LocalData = (function () {
  var getData = function (key) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) ? localStorage.getItem(key) : null;
    }
  };

  var setData = function (key, value) {
    localStorage.setItem(key, value);
  };

  return {
    getData: getData,
    setData: setData,
  };
})();

export default LocalData;
