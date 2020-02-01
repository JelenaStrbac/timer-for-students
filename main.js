// globalne varijable
const numbers = [];
const pickedQuestions = document.getElementById("pulledQ");

const starter = document.getElementById("questionButton");
starter.addEventListener("click", changeQuestion);


// f-ja za unos broja pitanja


function unesiBroj() {
    const br = Number(document.getElementById("iBrojPitanja").value);

    document.getElementById("isPit").style.display = "flex";
    document.getElementById("isPit").style.flexDirection = "column";

    document.getElementById("unosniTaster").style.display = "none";

    for (let n = 1; n < (br + 1); n++) {
        var g = document.createElement("div");
        g.innerHTML = n;
        g.setAttribute('id', n);
        g.setAttribute('class', 'item');
        document.getElementById("qs").appendChild(g);
    }
    console.log(br);
    startIt();
};





// Funkcija koja pravi nasumicnu kombinaciju svih ispitnih pitanja (brojevi pitanja se ne ponavljaju)
function startIt() {
    const br = document.getElementById("iBrojPitanja").value;
    while (numbers.length < br) {
        let randomNumber = Math.ceil(Math.random() * br);
        if (numbers.indexOf(randomNumber) === -1) {
            numbers.push(randomNumber);
        }
    }
    console.log(numbers)
};


// funkcija koja na klik bira pitanje (ide kroz niz-odabranu kombinaciju); na kraju se ubacuje natpis i slika
let i = 0;
function changeQuestion() {
    if (i < numbers.length - 1) {
        pickedQuestions.innerHTML = `<div style="color: white; font-size: 100px; border-radius: 50%; 
        background-color: #E8730C; border: 1px solid #E8730C; padding: 50px; width: 100px; 
        height: 100px; text-align: center">${numbers[i]}</div>`;
        document.getElementById(`${numbers[i]}`).style.opacity = "0.4";
        document.getElementById(`${numbers[i]}`).style.textDecoration = "line-through";

        let newQuestion = document.createElement("div");
        newQuestion.innerHTML = `<div style="display: flex; justify-content: space-between">
        <div>Pitanje ${numbers[i]}:</div>
        <div id="clock${numbers[i]}">00:00:00</div>
        </div>`;
        document.getElementById("lap").appendChild(newQuestion);
        totalms = 0;
        status = "stopped";
        document.getElementById("iStart").innerHTML = "Pokreni";
        i++;

    } else {
        pickedQuestions.innerHTML = `<div style="color: white; font-size: 40px; display: flex; flex-direction: column; 
        align-content: space-between; justify-content: space-between">K R A J!!!<br>
        Cestitam, spreman si za ispit!<br>
        <img src="goku.png" style="width: 100px"></div>`;
        document.getElementById(`${numbers[i]}`).style.opacity = "0.4";
        document.getElementById(`${numbers[i]}`).style.textDecoration = "line-through";
    }
    timestrToSec()
}


// stoperica
// deo 1 - stoperica - start & stop
let totalms = 0;
let status = "stopped";

function start() {
    totalms += 10;

    let h = Math.floor(totalms / (1000 * 60 * 60));
    let m = Math.floor(totalms % (1000 * 60 * 60) / (1000 * 60));
    let s = Math.floor(totalms % (1000 * 60) / 1000);


    (h) < 10 ? h = `0${h}` : h;
    (m) < 10 ? m = `0${m}` : m;
    (s) < 10 ? s = `0${s}` : s;

    document.getElementById(`clock${numbers[i - 1]}`).innerHTML = `<div name="vreme" id=clock${numbers[i - 1]}>${h}:${m}:${s}</div>`;

}

function startStop() {
    if (status === "stopped") {
        myStart = setInterval(start, 10);
        document.getElementById("iStart").innerHTML = "Stop";
        status = "started";
    } else {
        clearInterval(myStart);
        document.getElementById("iStart").innerHTML = "Nastavi";
        status = "stopped";
    }
}

// deo 2 - stoperica - clear
function clearWatch() {
    clearInterval(myStart);
    totalms = 0;
    h = 0;
    m = 0;
    s = 0;
    ms = 0;

    document.getElementById(`clock${numbers[i - 1]}`).innerHTML = `<div id=clock${numbers[i - 1]}>00:00:00</div>`;
    document.getElementById("iStart").innerHTML = "Pokreni";

    status = "stopped";
}

// deo 3 - stoperica - ukupno vreme
let kolekcijaMerenja = document.getElementsByName("vreme");
let ukVremeSekunde = 0;

function timestrToSec() {

    function spliting(domNode) {
        var splitedPart = domNode.innerHTML.split(":"); // za podelu jednog clana niza
        return parseInt(splitedPart[0] * 3600) +  // sekunde za jednog clana niza
            parseInt(splitedPart[1] * 60) +
            parseInt(splitedPart[2]);
    }

    for (let j = 0; j < kolekcijaMerenja.length; j++) {
        ukVremeSekunde += spliting(kolekcijaMerenja[j])
    }
    console.log(ukVremeSekunde);


    thh = Math.floor((ukVremeSekunde / 3600));
    tmm = Math.floor((ukVremeSekunde - thh * 3600) / 60);
    tss = Math.floor((ukVremeSekunde - thh * 3600 - tmm * 60));

    (thh) < 10 ? thh = `0${thh}` : thh;
    (tmm) < 10 ? tmm = `0${tmm}` : tmm;
    (tss) < 10 ? tss = `0${tss}` : tss;


    document.getElementById("idZaUkVreme").innerHTML = `${thh}:${tmm}:${tss}`;
    ukVremeSekunde = 0;
}


console.log(kolekcijaMerenja); // za test



// adding date to footer
let myDate = setInterval(myTimer, 1000);
function myTimer() {
    var d = new Date();
    document.getElementById("current-date").innerHTML = d.toLocaleString();
}


