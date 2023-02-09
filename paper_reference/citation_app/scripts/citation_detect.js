// npm install citation-js
// npm install -g browserify
// browserify citation_detect.js -o bundle.js

const one_auth_pattern1 = /(?<!and\s| &\s)([A-Z][a-z]+),\s(\d{4})/g;
const one_auth_pattern2 = /(?<!and\s| &\s)([A-Z][a-z]+)\s\((\d{4})\)/g;
const two_auth_pattern1 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+), (\d{4})/g;
const two_auth_pattern2 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+) \((\d{4})\)/g;
const multi_auth_pattern = /([A-Z][a-z]+ et al\., \d{4})/g;

// console.log(string.match(two_auth_pattern2));
let fullText;
let authorList = [];
let doiData;

// console.log(string.match(one_auth_pattern2));
const cleanData = () => {
    localStorage.clear();
    location.reload();
}
const loadPaper = () => {
    let citation = {};
    fullText = document.querySelector("#paper").value;
    if (fullText.match(one_auth_pattern1)) {
        console.log(fullText.match(one_auth_pattern1));
        fullText.match(one_auth_pattern1).forEach(element => {
            authorList.push(element);
        });
    }
    if (fullText.match(one_auth_pattern2)) {
        fullText.match(one_auth_pattern2).forEach(element => {
            authorList.push(element);
        });
    }
    if (fullText.match(two_auth_pattern1)) {
        fullText.match(two_auth_pattern1).forEach(element => {
            authorList.push(element);
        });
    }
    if (fullText.match(two_auth_pattern2)) {
        fullText.match(two_auth_pattern2).forEach(element => {
            authorList.push(element);
        });
    }
    if (fullText.match(multi_auth_pattern)) {
        fullText.match(multi_auth_pattern).forEach(element => {
            authorList.push(element);
        });
    }
    authorList.forEach(element => {
        if (localStorage.getItem(element) === null || localStorage.getItem(element) === '') {
            localStorage.setItem(element, '');
        }
    });
    authorList.forEach(element => {
        citation[element] = localStorage.getItem(element);
    });
    // drop unused citation
    if (localStorage.getItem('dic')) {
        if (JSON.stringify(citation) != localStorage.getItem('dic')) {
            for (let i = 0; i < localStorage.length; i++) {
                if (citation[localStorage.getItem(localStorage.key(i))] === null && localStorage.key(i) != 'dic') {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    }
    localStorage.setItem('dic', JSON.stringify(citation));
    document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
}

const loadDOI = () => {
    localStorage.clear();
    doiData = JSON.parse(document.querySelector("#doiinput").value);
    let newObject = {};
    for (const auth in doiData) {
        localStorage.setItem(auth, doiData[auth]);
        newObject[auth] = doiData[auth];
    }
    localStorage.setItem('dic', JSON.stringify(newObject));
    document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
}

if (localStorage.getItem('dic')) {
    setTimeout(() => {
        document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
    }, 1000*2);
}

const exportLocalData = async() => {
    let copyText = document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent;
    await navigator.clipboard.writeText(copyText);
    alert("The author-DOI data has been copied to your clipboard!");
}

let index = 0;
let intervalFunc;
const getEmptyCite = () => {
    if (localStorage.getItem(localStorage.key(index)) === '') {
        document.querySelector("#authname").textContent = localStorage.key(index);
    } else {
        index++;
        document.querySelector("#authname").textContent = '';
    }
    if (index >= (localStorage.length-1)) {
        index = 0;
    }
}
setInterval(getEmptyCite, 1000);

const nextPaper = () => {
    index++;
}

const addDOI = () => {
    let thisAuthname = document.querySelector("#authname").textContent;
    let thisDOI = document.querySelector("#doi").value;
    let newObject = {};
    if (localStorage.getItem(thisAuthname) === '') {
        localStorage.setItem(thisAuthname, thisDOI);
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) != 'dic') {
                newObject[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
            }
        }
        localStorage.setItem('dic', JSON.stringify(newObject));
        document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
    }
}

const retriveData = () => {
    const thisPaper = document.querySelector("#removedoi").value;
    console.log(thisPaper);
    if (localStorage.getItem(thisPaper) != "" && localStorage.getItem(thisPaper)) {
        window.open(`https://doi.org/${localStorage.getItem(thisPaper)}`);
    } else if (localStorage.getItem(thisPaper) === "") {
        alert("Please add DOI to this paper before looking up the abstract!");
    } else if (thisPaper === "") {
        alert("Please set in-text citation!");
    }
}

const removeData = () => {
    let thisPaper = document.querySelector("#removedoi").value;
    let newObject = {};
    localStorage.removeItem(thisPaper);
    localStorage.removeItem('dic');
    for (let i = 0; i < localStorage.length; i++) {
        newObject[localStorage.key(i)] = localStorage.getItem(localStorage.key(i)); 
    }
    localStorage.setItem('dic', JSON.stringify(newObject));
    document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
}

const renderCitation = () => {
    alert("Bibgraphy has been rendered!")
    location.reload();
}

let isDark = false;
const switchMode = async() => {
    if (!isDark) {
        document.querySelector("body > h1").style.color = "rgb(176, 176, 176)";
        document.querySelector("body > h2").style.color = "rgb(176, 176, 176)";
        document.querySelector("#paper").style.backgroundColor = "#ccc";
        document.querySelector("#doiinput").style.backgroundColor = "#ccc";
        document.querySelector("body > div:nth-child(2) > div").style.backgroundColor = "rgb(120, 120, 120)";
        document.querySelector("body").style.backgroundColor = "rgb(83, 83, 83)";
        document.querySelector("body > div:nth-child(2) > div > div.box2 > div").style.backgroundColor = "rgb(176, 176, 176)";
        const allBs = document.querySelectorAll("b");
        allBs.forEach(b => {
            b.style.backgroundColor = "rgb(40, 40, 40)";
        });
        const allLabels = document.querySelectorAll("label");
        allLabels.forEach(label => {
            label.style.color = "white";
        });
        document.querySelector("body > h1 > div > div").textContent = "Night";
        document.querySelector("#ref").style.backgroundColor = "rgb(120, 120, 120)";
        document.querySelector("#ref").style.color = "black";
    } else {
        document.querySelector("body > h1").style.color = "rgb(252, 178, 255)";
        document.querySelector("body > h2").style.color = "rgb(252, 178, 255)";
        document.querySelector("#paper").style.backgroundColor = "rgb(255, 223, 229)";
        document.querySelector("#doiinput").style.backgroundColor = "rgb(255, 223, 229)";
        document.querySelector("body > div:nth-child(2) > div").style.backgroundColor = "rgb(252, 178, 255)";
        document.querySelector("body").style.backgroundColor = "rgb(8, 0, 255)";
        document.querySelector("body > div:nth-child(2) > div > div.box2 > div").style.backgroundColor = "rgba(127, 255, 212, 0.773)";
        const allBs = document.querySelectorAll("b");
        allBs.forEach(b => {
            b.style.backgroundColor = "rgb(8, 0, 255)";
        });
        const allLabels = document.querySelectorAll("label");
        allLabels.forEach(label => {
            label.style.color = "black";
        });
        document.querySelector("body > h1 > div > div").textContent = "Light";
        document.querySelector("#ref").style.backgroundColor = "rgb(252, 178, 255)";
        document.querySelector("#ref").style.color = "white";
    }
    isDark = !isDark;
    setCookie("isDark", JSON.stringify(isDark));
}

const setCookie = (cname, cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

if (getCookie("isDark") === "true") {
    isDark = true;
    switchMode();
} else {
    isDark = false;
    switchMode();
}

window.onload = async() => {
    await document.querySelector("body > h1 > label > span").addEventListener('click', switchMode);
}