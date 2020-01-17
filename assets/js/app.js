document.addEventListener("DOMContentLoaded", function () {
    let player = document.querySelector("#player"),
        audio = player.querySelector("#audio"),
        control = player.querySelector("#control"),
        playBtn = control.querySelector("#playBtn>svg>path");

    playBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playBtn.setAttribute("d", "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26")
        } else {
            audio.pause();
            playBtn.setAttribute("d", "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28")
        }
    })
})