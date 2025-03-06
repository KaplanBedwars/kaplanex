// Tarayıcı bilgilerini al
const browserName = navigator.appName;
const browserVersion = navigator.appVersion;

// Bilgileri sayfaya yaz
document.getElementById('browser-name').textContent = browserName;
document.getElementById('browser-version').textContent = browserVersion;
const { remote } = require('electron');
        function closeWindow() {
            let window = remote.getCurrentWindow();
            window.close();
        }