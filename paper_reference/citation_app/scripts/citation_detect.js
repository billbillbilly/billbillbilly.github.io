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