const fetch = require("node-fetch");

const url = "http://127.0.0.1:5000/users";
const data = {
  firstname: "celine",
  lastname: "yan",
  username: "cyan2",
  password: "idk123",
  creationdate: "2019-12-03"
};
const otherParams = {
  headers: {"content-type":"application/json; charset=UTF-8"},
  body: JSON.stringify(data),
  method: "POST"
};

console.log(otherParams)
fetch(url, otherParams)
.then(res => res.json())
.then(data => console.log(data.result))

// fetch(url)
// .then(res => res.json())
// .then(data => console.log(data.user_data[0]['user_password']))
// .catch(error => console.log(error));

// var MyDate = new Date();
// var MyDateString;

// MyDate.setDate(MyDate.getDate() + 20);

// var today = new Date();
// var date = today.getFullYear() + '-'
//              + ('0' + (today.getMonth()+1)).slice(-2) + '-'
//              + ('0' + (today.getDate())).slice(-2);

// console.log(date)        