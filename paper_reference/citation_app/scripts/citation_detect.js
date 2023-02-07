const one_auth_pattern1 = /(?<!and|&\s)([A-Z][a-z]+),\s(\d{4})/g;
const one_auth_pattern2 = /(?<!and|&\s)([A-Z][a-z]+)\s\((\d{4})\)/g;
const two_auth_pattern1 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+), (\d{4})/g;
const two_auth_pattern2 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+) \((\d{4})\)/g;
const multi_auth_pattern = /([A-Z][a-z]+ et al\., \d{4})/g;

// console.log(string.match(two_auth_pattern2));
let fullText;
let authorList = [];
let display = document.querySelector("#display");
// console.log(string.match(one_auth_pattern2));
const cleanData = () => {
    localStorage.clear();
}
const loadPaper = () => {
    let citation = {};
    fullText = document.querySelector("#paper").value;
    if (fullText.match(one_auth_pattern1)) {
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

if (localStorage.getItem('dic')) {
    setTimeout(() => {
        document.querySelector("body > div:nth-child(2) > div > div.box2 > div").textContent = localStorage.getItem('dic');
    }, 1000*2);
    

    for (let index = 0; index < localStorage.length; index++) {
        if (localStorage.getItem(localStorage.key(index)) === '') {

        }
        
    }
}

