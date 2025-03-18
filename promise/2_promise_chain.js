
// new Promise((resolve, reject) => {
//     setTimeout(() => resolve(1), 3000)
// })

//     .then((result) => {
//         console.log(result);
//         return result;
//     })

//     .then(function (result) {
//         result *= 2;
//         console.log(result);
//         return result;
//     })

//     .then(result => {
//         result *= 2;
//         console.log(result);
//         return result;
//     })

//     .then(result => console.log(result));


new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
})
    .then(result => {
        console.log(result);
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    })
    .then(result => {
        console.log(result);
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    })
    .then(result => console.log(result));