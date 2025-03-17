// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Done!'), 3000);
// })

//     .finally(() => console.log('Promise завершен!'))

//     .then(
//         result => console.log(result),
//         error => console.log(error)
//     );

//////////////////////////////////////////////

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`));

        document.head.append(script);
    })
}

let promise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js');

promise.then(
    script => console.log(`${script.src} download!`),
    error => console.log(`Ошибка: ${error.message}`)
);

promise.then(script => console.log('Ещё один обработчик...'));