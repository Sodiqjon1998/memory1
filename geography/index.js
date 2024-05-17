let dataBase = [], QN = 0, correctAnswers = 0, t = 0, limit = 4;
let i, cities, correct, flag, countries, population;
let box = document.getElementById("box")
let prev = document.getElementById("previousAnswer")

fetch("https://restcountries.com/v2/all?fields=name,capital,population,flag&language=uz")
    .then(handleErrors)
    .then(data => data.json())
    .then(result => { dataBase = result })
    .catch((error) => {
        prev.innerHTML = error + " <br> Qayta xarakat qilib ko'ring"
        console.log(error)
    });

function handleErrors(response) {
    if (!response.ok) {
        console.log(response.statusText)
        throw Error(response.statusText);
    }
    return response;
}

function rmv() {
    box.innerHTML = ""
}

function correctAudio() {
    new Audio("https://www.raphburk.com/wp-content/uploads/2020/03/message.wav").play()
}

function wrongAudio() {
    new Audio("https://www.raphburk.com/wp-content/uploads/2020/03/thunder.wav").play()
}

function finishAudio() {
    new Audio("https://www.raphburk.com/wp-content/uploads/2020/03/checkpoint.wav").play()
}

function capitals() {
    rmv()
    QN++
    i = Math.floor(Math.random() * dataBase.length)
    if (dataBase[i].capital === "") {
        cities = ["N/A"]
        correct = "N/A"
    } else {
        cities = [dataBase[i].capital]
        correct = dataBase[i].capital
    }


    while (cities.length < limit) {
        let choice = dataBase[Math.floor(Math.random() * dataBase.length)].capital
        if (!cities.includes(choice) || !cities.includes("N/A")) {
            if (choice === "") {
                cities.push("N/A")
            } else {
                cities.push(choice)
            }
        }
    }

    cities.sort()

    box.innerHTML += `
    <h1 style="color: #c4a80c;">Savol raqami: ${QN}</h1>
    <h2>Ushbu  <b>${dataBase[i].name} davlati poytaxti qaysi?</b></h2>
    <div id="buttons"></div>`

    cities.map(city => {
        document.getElementById("buttons").innerHTML += `
      <button onclick="testcapital(\`${city}\`)">${city}</button>`
    })
}

function testcapital(el) {
    rmv()
    if (el == correct) {
        correctAudio()
        prev.innerHTML = `<h2 class="correct"> Oldingi savol : <br>
                      YES! the Capital of <b>${dataBase[i]}</b> is <b>${correct}</b>!</h2>`
        correctAnswers++
        if (QN % 10 != 0) { capitals() }
        else { finish() }
    } else {
        wrongAudio()
        prev.innerHTML = `<h2 class ="wrong"> Oldingi savol : <br>
                      Xato, <b>${dataBase[i]}</b> ning poytaxti <b>${correct}</b></h2>`
        if (QN % 10 != 0) { capitals() }
        else { finish() }
    }
}

function flags() {
    rmv()
    QN++
    i = Math.floor(Math.random() * dataBase.length)
    countries = [dataBase[i].name]
    correct = dataBase[i].name

    while (countries.length < limit) {
        let choice = dataBase[Math.floor(Math.random() * dataBase.length)].name
        if (!countries.includes(choice)) { countries.push(choice) }
    }

    countries.sort()

    box.innerHTML += `
    <h1>Savol raqami: ${QN}</h1>
    <h2>Ushbu bayroq qaysi davlatga tegishli?</h2>
    <img src="${dataBase[i].flag}">
    <div id="buttons"></div>`

    countries.map(country => {
        document.getElementById("buttons").innerHTML += `
      <button onclick="testflag(\`${country}\`)">${country}</button>`
    })
}

function testflag(el) {
    rmv()
    if (el == correct) {
        correctAudio()
        prev.innerHTML = `
      <h2 class="correct"> Oldingi savol : <br>
      YES! it is the flag of <b>${dataBase[i].name}</b>!</h2>
      <img class="mini" src ="${dataBase[i].flag}"></img>`
        correctAnswers++
        if (QN % 10 != 0) { flags() }
        else { finish() }

    } else {
        wrongAudio()
        prev.innerHTML = `
      <h2 class ="wrong"> Oldingi savol : <br>
      NO, it was the flag of <b>${dataBase[i].name}</b></h2>
      <img class="mini" src ="${dataBase[i].flag}"></img>`
        if (QN % 10 != 0) { flags() }
        else { finish() }
    }
}

function populationNumber() {
    rmv()
    QN++
    i = Math.floor(Math.random() * dataBase.length)
    population = [`${Math.round(dataBase[i].population / 1000000).toLocaleString('en')}`]
    correct = `${Math.round(dataBase[i].population / 1000000).toLocaleString('en')}`

    while (true) {
        let idx = Math.floor(Math.random() * dataBase.length)
        let choice = `${Math.round(dataBase[idx].population / 1000000).toLocaleString('en')}`
        if (population.length == limit) { break }
        if (!population.includes(choice)) { population.push(choice) }
    }

    population.sort()

    box.innerHTML += `
    <h1>Savol raqami?: ${QN}</h1>
    <h2>Usbu davlat  ${dataBase[i].name}?<br> aholi soni qancha</h2>
    <div id="buttons"></div>`

    population.map(pop => {
        document.getElementById("buttons").innerHTML += `
    <button onclick="testpopulation(\`${pop}\`)">${pop}</button>`
    })
}

function testpopulation(el) {
    rmv()
    if (el == correct) {
        correctAudio()
        prev.innerHTML = `
      <h2 class="correct"> Oldingi savol : <br>
      YES! The population of <b>${dataBase[i].name} is ${dataBase[i].population.toLocaleString('en')}</b>!</h2>`
        correctAnswers++
        if (QN % 10 != 0) { populationNumber() }
        else { finish() }

    } else {
        wrongAudio()
        prev.innerHTML = `
      <h2 class ="wrong"> Oldingi savol : <br>
      NO, it was the flag of <b>${dataBase[i].name} is ${dataBase[i].population.toLocaleString('en')}</b></h2>`
        if (QN % 10 != 0) { populationNumber() }
        else { finish() }
    }
}

function finish() {
    finishAudio()
    box.innerHTML += `
    <h1>Bravo!<br>
    You finished the test!</h1>
    <h2>Your Score is <b>${correctAnswers}/${QN}</b></h2>
    <h3>Are you ready for 10 more questions?</h3>
    <button id="capitals" onclick="capitals()">Poytaxtlar</button>
    <button id="flags" onclick="flags()">Flags</button>
    <button id="population" onclick="populationNumber()">Population</button>`
    prev.innerHTML = ``

}

// box.style.background = "linear-gradient(#f2c7a1, #f6bb8f, #f2a65b, #f68d45, #f67e29)";
box.style.width = "700px";
box.style.padding = "20px";
box.style.margin = "0 auto";
box.style.backdropFilter = "blur(15px)";
box.style.boxShadow = "2px 4px 6px grey";
box.style.borderRadius = "10px";
box.style.background = "wheat";