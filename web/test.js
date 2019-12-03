const fetch = require("node-fetch");

const url = 'http://127.0.0.1:5000/keywords?site=facebook&company=alaska%20airlines&sentiment=positive';
// const data = {
//   site: "facebook",
//   company: " alaska airlines"
// };

// const otherParams = {
//   headers: {'content-type':'application/json; charset=UTF-8'},
//   body: data,
//   method: 'POST'
// };

fetch(url)
.then(res => res.json())
.then(data => console.log(data.keywords))
.catch(error => console.log(error));