let input = document.querySelector("#znamky");

input.addEventListener('change', (evt) => {
    parseZnamky(evt.target.value)
});

input.addEventListener('keyup', (evt) => {
    parseZnamky(evt.target.value)
});

input.addEventListener('keydown', (evt) => {
    parseZnamky(evt.target.value)
});

input.addEventListener('paste', (evt) => {
    parseZnamky(evt.target.value)
});

document.addEventListener('paste', (evt) => {
    parseZnamky(evt.clipboardData.getData("text/plain"))
});

function parseZnamky(znamkySource) {
    const regex = /([a-zA-ZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ]{1,5})\t[0-9.]{8,10}\t([1-5]|A|N)\tZ([0-9]{1,2})/gm;
    if (znamkySource == "" || !znamkySource.match(regex)) {
        return;
    }
    var znamky = [];
    var m;
    do {
        m = regex.exec(znamkySource);
        if (m) {
            var hodnota;
            if (parseInt(m[2])) {
                hodnota = parseInt(m[2]);
            } else if (m[2] == "N") {
                hodnota = 5;
            } else {
                continue;
            }
            znamky.push({
                predmet: m[1],
                hodnota,
                vaha: parseInt(m[3])
            });
        }
    } while (m);
    document.querySelector("#matches").innerHTML = prumeryRows(prumery(znamky));
}

function prumer(znamky) {
    const soucetHodnot = znamky
        .reduce((soucet, znamka) => soucet += (znamka.hodnota * znamka.vaha), 0);
    const soucetVah = znamky
        .reduce((soucet, znamka) => soucet += znamka.vaha, 0);
    return soucetHodnot / soucetVah;
}

function prumery(znamky) {
    const predmety = Array.from(new Set(znamky.map((znamka) => znamka.predmet)));
    const result = predmety
        .map((predmet) => {
            const znamkyZPredmetu = znamky
                .filter((znamka) => znamka.predmet === predmet);
            const vazenySoucet = znamkyZPredmetu
                .reduce((soucet, curr) => {
                    return soucet + curr.hodnota * curr.vaha;
                }, 0);

            const soucetVah = znamkyZPredmetu
                .reduce((soucet, curr) => {
                    return soucet + curr.vaha;
                }, 0);

            const vazenyPrumer = vazenySoucet / soucetVah;
            return {
                vazenyPrumer: Number(vazenyPrumer.toFixed(2)),
                predmet
            };
        });

    return result;
}

function prumeryRows(vazenePrumery) {
    return vazenePrumery
        .map((prumer) => `<tr>
    <td>${prumer.predmet}</td>
    <td>${prumer.vazenyPrumer}</td>
</tr>`)
        .join("");
}
