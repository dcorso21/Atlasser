function createSVG() {
    svg = d3
        .select("body")
        .append("svg")
        .attr("height", "100vh")
        .attr("width", "100vw")
        .attr("class", "wind");
}

function gattr(el, attr) {
    return el._groups[0][0].getAttribute(attr);
}

function makeGrid() {
    [...Array.from(Array(15).keys())].map((num) => {
        num *= 100;
        makeLine(0, "100vw", num, num);
        makeLine(num, num, 0, "100vh");
    });
}

function makeLine(x1, x2, y1, y2) {
    svg.append("line")
        .attr("x1", x1)
        .attr("x2", x2)
        .attr("y1", y1)
        .attr("y2", y2)
        .attr("stroke", "rgba(0, 0, 0, .2)");
}

function makeCircles() {
    Object.keys(circles).map((id) => {
        let cir = circles[id];
        makeCircle(cir, id);
    });
}

function makeCircle(cir, id) {
    d3.select(`#${id}`).remove();

    svg.append("circle")
        .attr("cx", cir.cx)
        .attr("cy", cir.cy)
        .attr("r", cir.r)
        .attr("id", id)
        .attr("class", "top")
        .attr("fill", "white")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth);
}

function placePath(conn1, conn2, id1, id2) {
    let pathID = `${id1}_to_${id2}`;
    console.log(pathID);
    d3.select(`#${pathID}`).remove();

    let [x1, y1] = [conn1.cx, conn1.cy],
        [x2, y2] = [conn2.cx, conn2.cy],
        zys = [y1, y2],
        mx = (Number(x1) + Number(x2)) / 2,
        x = `M ${x1} ${y1} C ${mx},${zys[0]} ${mx},${zys[1]} ${x2},${y2}`;

    svg.append("path")
        .attr("d", x)
        .attr("stroke", strokeColor)
        .attr("fill", "transparent")
        .attr("stroke-width", strokeWidth)
        .attr("id", pathID);
}

function makePaths() {
    Object.keys(circles).map((id) => {
        let connections = circles[id].connectedIds;
        // If the circle has connection IDs
        if (!!connections.length) {
            connections.map((cid) => {
                placePath(circles[id], circles[cid], id, cid);
            });
        }
    });
}

class UI {
    static enableDragElement() {
        let circs = document.querySelectorAll(".top");
        console.log(circs);
        [...circs].map((el) => {
            addEventListener("mousedown", UI.mouseDown);
        });
    }
    static mouseDown(e) {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);

        // Mouse Position
        let prevX = e.clientX;
        let prevY = e.clientY;
        let clickedID = e.toElement.id;

        function mouseMove(e) {
            let deltaX = prevX - e.clientX,
                deltaY = prevY - e.clientY;

            circles[clickedID].cx -= deltaX;
            circles[clickedID].cy -= deltaY;
            prevX = e.clientX;
            prevY = e.clientY;
            renderInteractive();
        }

        function mouseUp(e) {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
        }
    }
}

function renderInteractive() {
    makePaths();
    makeCircles();
}
