// const request = require("request");

// request('http://www.google.com', function(error, response, body){
//     if(!error && response.statusCode == 200){
//         console.log(body)
//     }
// })

const axios = require('axios');
 
// Make a request for a user with a given ID
axios.get('http://google.com')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });