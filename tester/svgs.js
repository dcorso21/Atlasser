let svg = d3
    .select("body")
    .append("svg")
    .attr("height", "500vh")
    .attr("width", "500vw");

let circles = [];

function gattr(el, attr) {
    return el._groups[0][0].getAttribute(attr);
}

function makeGrid() {
    [...Array.from(Array(15).keys())].map((num) => {
        num *= 100;
        console.log(num);
        makeLine(0, "100vw", num, num);
        makeLine(num, num, 0, "100vh");
    });

    function makeLine(x1, x2, y1, y2) {
        svg.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .attr("stroke", "black");
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

    let x1, y1, x2, y2, xbend, ybend;
    x1 = gattr(obj1, "cx");
    y1 = gattr(obj1, "cy");
    x2 = gattr(obj2, "cx");
    y2 = gattr(obj2, "cy");
    let qxi = Math.abs(x1 - x2) / 4,
        qyi = Math.abs(y1 - y2) / 4;
    let qx1 = Math.min(x1, x2) + qxi,
        qx2 = Math.min(x1, x2) + qxi * 2,
        qy1 = Math.min(y1, y2),
        qy2 = Math.min(y1, y2) + qyi *2;
    
    [qy1, qy2] = [qy1, qy2].sort();

    // console.log({ qx1, qx2, qy1, qy2 });
    svg.append("path")
        .attr("d", `M ${x1} ${y1} Q ${qx1},${qy1} ${qx2},${qy2}  T ${x2} ${y2}`)
        .attr("stroke", "blue")
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

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mouseMove(e) {
        let newX = prevX - e.clientX,
            newY = prevY - e.clientY;

        let cx = e.toElement.getAttribute("cx");
        let cy = e.toElement.getAttribute("cy");

        e.toElement.setAttribute("cx", cx - newX);
        e.toElement.setAttribute("cy", cy - newY);

        prevX = e.clientX;
        prevY = e.clientY;
        placePath(circles[0], circles[1], svg);
    }

    function mouseUp(e) {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    }
}
