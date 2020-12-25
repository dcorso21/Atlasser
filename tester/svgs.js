let svg = d3
    .select("body")
    .append("svg")
    .attr("height", "100vh")
    .attr("width", "100vw")
    .attr("class", "wind");

let circles = [];

function gattr(el, attr) {
    return el._groups[0][0].getAttribute(attr);
}

function makeGrid() {
    [...Array.from(Array(15).keys())].map((num) => {
        num *= 100;
        makeLine(0, "100vw", num, num);
        makeLine(num, num, 0, "100vh");
    });

    function makeLine(x1, x2, y1, y2) {
        svg.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .attr("stroke", "rgba(0, 0, 0, .2)");
    }
}

function makeCircle(cx, cy, r) {
    circles.push(
        svg
            .append("circle")
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", r)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("class", "top")
    );
}

function placePath(obj1, obj2, svg) {
    d3.select("path").remove();
    d3.selectAll(".cubic").remove();

    let x1 = gattr(obj1, "cx"),
        y1 = gattr(obj1, "cy"),
        x2 = gattr(obj2, "cx"),
        y2 = gattr(obj2, "cy");

    let zys = [y1, y2];
    if (y1 <= y2) {
       zys = zys.reverse();
    }
    let mx = (Number(x1) + Number(x2)) / 2;

    

    let x = `M ${x1} ${y1} C ${mx},${zys[0]} ${mx},${zys[1]} ${x2},${y2}`
    console.log(x);

    svg.append("path")
        .attr("d", x)
        .attr("stroke", "white")
        .attr("fill", "transparent");
}

makeGrid();
makeCircle(150, 150, 45);
makeCircle(450, 450, 45);
placePath(circles[0], circles[1], svg);

var circs = document.querySelectorAll(".top");
[...circs].map((el) => {
    addEventListener("mousedown", mouseDown);
});

function mouseDown(e) {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    // Mouse Position
    let prevX = e.clientX;
    let prevY = e.clientY;

    let target = e.toElement;

    function mouseMove(e) {
        // Delta
        let newX = prevX - e.clientX,
            newY = prevY - e.clientY;

        let cx = target.getAttribute("cx");
        let cy = target.getAttribute("cy");

        target.setAttribute("cx", cx - newX);
        target.setAttribute("cy", cy - newY);

        prevX = e.clientX;
        prevY = e.clientY;
        placePath(circles[0], circles[1], svg);
    }

    function mouseUp(e) {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    }
}
