const fetch = require("node-fetch");
// this call gets total number of reviews for an airline company
let url = "http://127.0.0.1:5000/reviews/statistics?company=" + encodeURIComponent('jetblue')
console.log(url)
fetch(url)
.then(res => res.json())
.then((data) => console.log(data))

// this call gets number of airvisual reviews
url += "&site=airvisuals"
fetch(url)
.then(res => res.json())
.then(data => console.log(data))

// const url = "http://127.0.0.1:5000/reviews/statistics?site=kdjf;kj&company=alaska%20airlines";
// const data = {
//   firstname: "celine",
//   lastname: "yan",
//   username: "cyan2",
//   password: "idk123",
//   creationdate: "2019-12-03"
// };
// const otherParams = {
//   headers: {"content-type":"application/json; charset=UTF-8"},
//   body: JSON.stringify(data),
//   method: "POST"
// };

// console.log(otherParams)
// fetch(url, otherParams)
// .then(res => res.json())
// .then(data => console.log(data.result))

// this call gets total number of reviews for an airline company
let url = "http://127.0.0.1:5000/reviews/statistics?company=" + encodeURIComponent('jetblue')
console.log(url)
fetch(url)
.then(res => res.json())
.then((data) => console.log(data))

// this call gets number of airvisual reviews
url += "&site=airvisuals"
fetch(url)
.then(res => res.json())
.then(data => console.log(data))

// need to store the api results in these two variables
// return specific / total

// fetch(url)
// .then(res => res.json())
// .then(data => console.log(data))

// var MyDate = new Date();
// var MyDateString;

// MyDate.setDate(MyDate.getDate() + 20);

// var today = new Date();
// var date = today.getFullYear() + '-'
//              + ('0' + (today.getMonth()+1)).slice(-2) + '-'
//              + ('0' + (today.getDate())).slice(-2);

// console.log(date)        

