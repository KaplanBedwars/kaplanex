const { app, BrowserWindow, Menu, session } = require("electron"); // session EKLENDİ

let mainWindow;
let blankCounter = 0;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            sandbox: false
        }
    });



    mainWindow.loadFile("index.html");
    Menu.setApplicationMenu(null); // Menü kaldırıldı

    // İlk açılışta about:blank yerine ana menüyü göster
    mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.executeJavaScript(`
            document.getElementById("webview").style.display = "none";
            document.getElementById("kaplanex-home").style.display = "flex";
        `);
    });

    

    // Reklam Engelleyici
    fetch("https://raw.githubusercontent.com/hl2guide/All-in-One-Customized-Adblock-List/refs/heads/master/adfilters_urls.txt")
        .then(response => response.text())
        .then(data => {
            const blockedSites = data.split("\n").filter(line => line.trim() !== "");
            session.defaultSession.webRequest.onBeforeRequest({ urls: blockedSites }, (details, callback) => {
                console.log("⛔ Engellendi: " + details.url);
                callback({ cancel: true });
            });
            console.log(`✔ ${blockedSites.length} site engellendi!`);
        })
        .catch(err => console.error("Reklam engelleme listesi yüklenirken hata oluştu:", err));
});



app.on("window-all-closed", () => {
    app.quit();
});
