

function getData(uId) {
    return  new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log("Fetched the data!");
        resolve("skc@gmail.com");
        }, 4000)})
    }
    
    
    async function f(){
        console.log("start");
        var email =await getData("skc");
        console.log(email)
        console.log("Email id of the user id is: " + email);
        console.log("end");
    }
   
   f(); 

// function getData(uId) {
//     return  new Promise((resolve,reject)=>{
//         setTimeout(() => {
//         console.log("Fetched the data!");
//         resolve("skc@gmail.com");
//         }, 4000)})
//     }
    
//     console.log("start");
//     var email = getData("skc");
//     email.then((email)=>{
//         console.log("Email id of the user id is: " + email);
//         console.log("end");
//     })






    





   

// function getData(uId,fun) {
//     let p=new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log("Fetched the data!");
//             resolve("skc@gmail.com")
//             }, 4000);
//     })
//     p.then((mail)=>fun(mail))
// }
// console.log("start");
// var email = getData("skc",fun);
// function fun(email){
//     console.log("Email id of the user id is: " + email);
//     console.log("end");
    
// }





// function getData(uId,fun) {

//         setTimeout(() => {
//             console.log("Fetched the data!");
//             fun("skc@gmail.com");
//             }, 4000);
//     }
// console.log("start");
// function fun(email){
//         console.log("Email id of the user id is: " + email);
//        console.log("end");  
//      }
// var email = getData("skc",fun);
// 
