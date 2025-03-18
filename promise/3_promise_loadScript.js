
function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Ошибка загрузки скрипта: ${src}`));

        document.head.append(script);
    })
}

loadScript("/promise/scripts/one.js")
    .then(script => loadScript("/promise/scripts/two.js"))
    .then(script => loadScript("/promise/scripts/three.js"))
    .then(script => {
        one();
        two();
        three();
    });