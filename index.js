let input = document.querySelector("#znamky");

input.addEventListener('change', (evt) => {
    parseZnamky(evt.target.value)
});
input.addEventListener('keyup', (evt) => {
    parseZnamky(evt.target.value)
});
input.addEventListener('paste', (evt) => {
    parseZnamky(evt.target.value)
});

function parseZnamky(znamkySource) {
    if (znamky == "") {
        return;
    }
    const regex = /([0-5]|A|N)\tZ([1-9])/gm;
    let matches = regex.exec(znamky);
    var znamky = [];
    var m;
    do {
        m = regex.exec(znamkySource);
        if (m) {
            znamky.push({
                hodnota: isNaN(parseInt(m[1])) ? 5 : parseInt(m[1]),
                vaha: parseInt(m[2])
            });
        }
    } while (m);
    document.querySelector("#matches").innerHTML = prumer(znamky);
}

function prumer(znamky) {
    const soucetHodnot = znamky
        .reduce((soucet, znamka) => soucet += znamka.hodnota * znamka.vaha, 0);
    const soucetVah = znamky
        .reduce((soucet, znamka) => soucet += znamka.vaha, 0);
    return soucetHodnot / soucetVah;
}