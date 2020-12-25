let svg;
let circles = {
    cir1: {
        cx: 150,
        cy: 140,
        r: 100,
        connectedIds: ["cir2", "cir3"],
    },
    cir2: {
        cx: 450,
        cy: 440,
        r: 45,
        connectedIds: [],
    },
    cir3: {
        cx: 650,
        cy: 440,
        r: 45,
        connectedIds: [],
    },
    cir4: {
        cx: 350,
        cy: 440,
        r: 79,
        connectedIds: ["cir2", "cir3"],
    },
};

let strokeWidth = 5;
let strokeColor = "white";

window.onload = () => {
    createSVG();
    // makeGrid();
    renderInteractive();
    UI.enableDragElement();
};
