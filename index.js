const reader = new FileReader();

const input = document.createElement('input');
input.type = 'file';
input.accept = "image/*";
input.addEventListener("input", (ev) => {
    reader.readAsDataURL(input.files[0]);
});

let editorCanvas = document.querySelector("canvas");
let editorCtx = editorCanvas.getContext("2d");


if (!window.localStorage.getItem("drawMode"))
    window.localStorage.setItem("drawMode", "squash");

let drawMode = window.localStorage.getItem("drawMode");


const overlayImage = document.createElement("img");
overlayImage.src = "overlay.png";

const originalImage = document.createElement("img");

function selectImage() {
    input.click();
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