"use strict";

window.onload = () => {
    let darkmodeBtn = document.querySelector(".darkmode");
    darkmodeBtn.onclick = () => {
        let doc = document.querySelector("body");
        console.log("hello");
        doc.classList.toggle('dark');
    };
};
