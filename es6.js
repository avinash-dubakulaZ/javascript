const printName = (name) => "Hii" + name;
console.log(printName('Avinash'));
const printBill = (name, bill) => {
    return `Hi ${name}, please pay: ${bill}`;
}
console.log(printBill("avi",500));
const person = {
    name: "Noam Chomsky",
    age: 92
}
let {name:n,age:a}=person;
console.log(n);
console.log(a);
