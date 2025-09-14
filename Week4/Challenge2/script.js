// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
function task1() {
    document.getElementById('result').style.backgroundColor = 'pink';
    document.getElementById('result').style.color = 'blue';
    document.getElementById('result').innerText = "Welcome to My Heart";
}

document.getElementById('justin-btn').addEventListener('mouseover', task1);

// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
function task2() {
    document.getElementById('result').style.backgroundColor = 'black';
    document.getElementById('result').style.color = 'red';
    document.getElementById('result').innerText = "Don't Leave Me Please";
}

document.getElementById('justin-btn').addEventListener('mouseout', task2);