// 🇹🇷🇹🇷🇹🇷🇹🇷🇹🇷🇹🇷

const reader = new FileReader();

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = "image/*";
fileInput.addEventListener("input", (ev) => {
    reader.readAsDataURL(fileInput.files[0]);
});

const editorCanvas = document.querySelector("canvas");
const editorCtx = editorCanvas.getContext("2d");


if (!window.localStorage.getItem("drawMode"))
    window.localStorage.setItem("drawMode", "squash");

let drawMode = window.localStorage.getItem("drawMode");


const overlayImage = document.createElement("img");
overlayImage.src = "overlay.png";

const originalImage = document.createElement("img");

const root = document.querySelector(":root");

const themeInput = document.getElementById("themeInput");
themeInput.checked = window.localStorage.getItem("theme") === "d";

function selectImage() {
    fileInput.click();
}

reader.addEventListener("load", (res) => {
    originalImage.src = res.target.result;
    setTimeout(function() {
            let drawSize;
            switch (drawMode) {
                case "squash":
                    drawSize = [500, 500]
                    break;
                case "center":
                    drawSize = [originalImage.width * 500 / originalImage.height, 500]
                    break;
                default:
                    drawSize = [500, 500]
                    break;
            }
            editorCtx.drawImage(originalImage, (drawSize[0] - 500) / -2, 0, drawSize[0], drawSize[1]);
            editorCtx.drawImage(overlayImage, 0, 0, 500, 500);
        }, 200) // 200 ms bekletiyorum, lag fln oluyor bazen
})

function downloadCanvas() {
    let link = document.createElement('a');
    link.download = 'taşşaklı.png';
    link.href = editorCanvas.toDataURL();
    link.click();
}

function syncSettings() {
    switch (window.localStorage.getItem("theme")) {
        case "l":
            root.style.setProperty("--background-color", "#fff");
            root.style.setProperty("--primary-color", "#000");
            root.style.setProperty("--secondary-color", "lightblue");
            break;
        case "d":
            root.style.setProperty("--background-color", "#262626");
            root.style.setProperty("--primary-color", "#fff");
            root.style.setProperty("--secondary-color", "#2F4081");
            break;
        default:
            window.localStorage.setItem("theme", "l");
            break;
    }
}

syncSettings();
setInterval(syncSettings, 500);