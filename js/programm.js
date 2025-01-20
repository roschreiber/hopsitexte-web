const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    ä: 27,
    ö: 28,
    ü: 29,
    ß: 30,
};

const regex = /[^a-zäöüß]/g;

function checkHopsitext(text) {
    const cleanText = text.toLowerCase().replace(regex, '');
    const jumpValues = [...cleanText].map(char => values[char] || 0);

    const words = text.split(/\s+/);
    let wordPositions = [];
    let currentIndex = 0;

    words.forEach(word => {
        const start = currentIndex;
        wordPositions.push({ word, start });
        currentIndex += word.length + 1;
    });

    let belaPos = 0;
    let AmiraPos = 1;
    let positions = [];

    while (true) {
        let oldBelaPos = belaPos;
        belaPos += jumpValues[belaPos];
        jumpValues[oldBelaPos] = -1;

        if (jumpValues[AmiraPos] === -1) {
            positions.push(oldBelaPos);
            break;
        }

        let oldAmiraPos = AmiraPos;
        AmiraPos += jumpValues[AmiraPos];
        jumpValues[oldAmiraPos] = -2;

        if (jumpValues[belaPos] === -2) {
            positions.push(oldAmiraPos);
            break;
        }
    }

    let result = "Der Text ist ein Hopsitext.";
    positions.forEach(pos => {
        let i = 0;
        for (const { word } of wordPositions) {
            for (let j = 0; j < word.length; j++) {
                const currentLetter = word[j];
                if (values[currentLetter]) {
                    if (i === pos) {
                        result = "Das Wort " + word + " macht den Text zu keinem Hopsitext, da beide Spieler auf dem Buchstaben " + currentLetter + " irgendwann aufkommen.";
                        return;
                    }
                }
                i++;
            }
        }
    });

    return result;
}

document.getElementById('textInput').addEventListener('input', function () {
    const text = this.value;
    const result = checkHopsitext(text);
    const resultElement = document.getElementById('result');
    resultElement.innerText = result;
    resultElement.style.color = result === "Der Text ist ein Hopsitext." ? 'green' : 'red';
});