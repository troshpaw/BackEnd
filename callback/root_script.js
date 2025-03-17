// console.log('This is root script BEGIN');

// function loadScript(src, callback) {
//     let script = document.createElement('script');
//     console.log('This is loadScript function_1');

//     script.src = src;
//     console.log('This is loadScript function_2');

//     document.head.append(script);
//     console.log('This is loadScript function_3');

//     script.onload = () => { callback(); }
//     console.log('This is loadScript function_4');
// }

// function callbackFunction() {
//     console.log('This is callbackFunction');
// }

// loadScript('./promise/extra_script.js', callbackFunction);

// console.log('This is root script END');



function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Здорово, скрипт ${script.src} загрузился`);
    alert(_); // функция, объявленная в загруженном скрипте
});