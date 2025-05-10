const webview = document.getElementById("webview");
const backButton = document.getElementById("back");
const forwardButton = document.getElementById("forward");
const reloadButton = document.getElementById("reload");
const urlBar = document.getElementById("url-bar");
const kaplanexHome = document.getElementById("kaplanex-home");
const progressBar = document.getElementById("progress-bar");
let blankCounter = 0;


// İlk açılışta ana menüyü göster

webview.style.display = "none";
kaplanexHome.style.display = "flex";







// Webview hazır olduğunda olayları dinle
webview.addEventListener("dom-ready", () => {
    updateNavButtons();
});





webview.addEventListener("did-navigate", () => {
    urlBar.value = webview.getURL();
    kaplanexHome.style.display = "none";
    webview.style.display = "flex";
    updateNavButtons();
});

webview.addEventListener("did-navigate-in-page", () => {
    updateNavButtons();
});

// Geri ve İleri düğmelerini güncelle
function updateNavButtons() {
    backButton.disabled = !webview.canGoBack();
    forwardButton.disabled = !webview.canGoForward();
}

// Geri gitme
backButton.addEventListener("click", () => {
    if (webview.canGoBack()) {
        webview.goBack();
    }
});

// İleri gitme
forwardButton.addEventListener("click", () => {
    if (webview.canGoForward()) {
        webview.goForward();
    }
});

// Sayfayı yenile
reloadButton.addEventListener("click", () => {
    webview.reload();
});

// Adres çubuğuna URL veya arama girildiğinde işle
urlBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let query = urlBar.value.trim();

        if (query === "") {
            // Adres çubuğu boşsa ana menüye dön
            webview.style.display = "none";
            kaplanexHome.style.display = "flex";
            return;
        }

        if (query.includes(".") || query.startsWith("http")) {
            if (!query.startsWith("http")) {
                query = "https://" + query;
            }
        } else {
            query = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }

        webview.src = query;
        kaplanexHome.style.display = "none";
        webview.style.display = "flex";
    }
});

// Ana sayfada arama çubuğunu kullanma
function performSearch() {
    const query = document.getElementById("search").value.trim();
    if (query) {
        webview.src = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        kaplanexHome.style.display = "none";
        webview.style.display = "flex";
    }
}

// Yüklenme çubuğunu kontrol et
webview.addEventListener("did-start-loading", () => {
    progressBar.style.width = "0%";
    progressBar.style.opacity = "1";
});

webview.addEventListener("did-stop-loading", () => {
    progressBar.style.width = "100%";
    setTimeout(() => { progressBar.style.opacity = "0"; }, 500);
    updateNavButtons();
});
