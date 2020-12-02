const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

let over = select(".over");

let data = {
    header: "World History",
    explanation: "World History Explanation",
    topics: [
        {
            header: "Topic 1",
            explanation: "Topic 1 Explanation",
            topics: [
                {
                    header: "Topic 1 : A",
                    explanation: "Topic 1 : A  Explanation",
                    topics: [],
                },
            ],
        },
    ],
};

function populate(data, container) {
    let header = document.createElement("h1");
    let explanation = document.createElement("p");
    header.innerHTML = data.header;
    explanation.innerHTML = data.explanation;
    container.appendChild(header);
    container.appendChild(explanation);

    data.topics.map((t) => {
        container.appendChild(populate(t, document.createElement("div")));
    });

    return container;
}

populate(data, over);
