const producer = function(){
    return new Promise((resolve, reject) => {
        let rejectTimer;
        const resolveTimer = setTimeout(() => {
            clearTimeout(rejectTimer);
            resolve("yay! fulfilled");
        }, 4000);
    
        const randomTimer = Math.round(Math.random() * 10);
        console.log(randomTimer);
         rejectTimer = setTimeout(() => {
            clearTimeout(resolveTimer);
            reject("oops! rejected");
        }, randomTimer * 1000);
    })
}


/**
 * Method 1: consuming promises using .then(successCb, failureCb) pattern
 */

const consumerOne = (resolvedData) => console.log(`wohoo! consumer one proceeding further`);
const consumerTwo = (resolvedData) => console.log(`wohoo! consumer two proceeding further`);
const failureCb = (rejectErrMessage) => console.log(`Oups! ${rejectErrMessage}`);

const p1 = producer();
p1.then(consumerOne, failureCb);
p1.then(consumerTwo, failureCb);

/** 
 * Method 2: consuming promises by passing as an argument
 */


function consumer1(promise) {
    promise
    .then(data => console.log("Got the data, updating service 2"))
    .catch(err => console.log(err));
}

function consumer2(promise) {
    promise
    .then(data => console.log("Got the data, updating service 3"))
    .catch(err => console.log(err));
}

const p2 = producer();
consumer1(p2);
consumer2(p2);
