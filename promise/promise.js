let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('done');
    }, 1000);
});

console.log(promise);