const reader = new FileReader();

const input = document.createElement('input');
input.type = 'file';
input.accept = "image/*";
input.addEventListener("input", (ev) => {
    reader.readAsDataURL(input.files[0]);
});

let editorCanvas = document.querySelector("canvas");
let editorCtx = editorCanvas.getContext("2d");


const overlayImage = document.createElement("img");
overlayImage.src = "overlay.png";

const loaderImage = document.createElement("img");

function selectImage() {
    input.click();
}

reader.addEventListener("load", (res) => {
    loaderImage.src = res.target.result;
    setTimeout(function() {
            editorCtx.drawImage(loaderImage, 0, 0, 500, 500)

        }, 200) // 200 ms bekletiyorum, lag fln oluyor bazen
})