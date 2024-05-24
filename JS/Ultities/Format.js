let time = new Date();
console.log(time);

let date = time.getDate();
let month = time.getMonth() + 1;
let year = time.getFullYear();
let hours = time.getHours();
let minutes = time.getMinutes();

let total = `${hours}:${minutes} ${date}/${month}/${year}`;
console.log(total);
