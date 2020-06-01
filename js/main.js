// Make sure Service working is supported

if ('serviceWorker' in navigator) {
  console.log('Services Worker Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then((reg) => {
        console.log('Services Worker : Registered');
      })
      .catch((err) => console.log(`Services Worker Error : ${er}`));
  });
}
