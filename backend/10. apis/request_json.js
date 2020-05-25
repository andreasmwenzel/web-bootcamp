const axios = require("axios")
// Make a request for a user with a given ID
axios.get('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400')
  .then(function (response) {
    eval(require("locus"))
    // handle success
    console.log(response.data.results.sunset);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });