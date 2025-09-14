// console.log("Week 4 - Hello World");

// Document Object Model

let greeting = document.getElementById('greeting');
console.log(greeting);

// Task
// Get all instances of <p>
let paras = document.getElementsByTagName('p')
console.log(paras)

for(para of paras) {
    console.log(para.innerText);
    para.innerText = "Booyah";
}