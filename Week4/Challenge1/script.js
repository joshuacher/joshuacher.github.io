function calculate() {

    // YOUR CODE GOES HERE
    let num1 = document.getElementById('number1').value;
    let num2 = document.getElementById('number2').value;
    
    num1 = Number(num1);
    num2 = Number(num2);

    let indextotal = 0;
    for (let index = num1; index <= num2; index++) {
        indextotal += index;
    }
    
    console.log(document.getElementById('result').innerText = "The sum is: " + indextotal);
}



