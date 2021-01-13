// Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('SW registrado', reg))
    .catch(err => console.warn('Error al registrar SW', err))
}