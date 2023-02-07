// npm install citation-js
// npm install -g browserify
// browserify citation.js -o bundle.js
const Cite = require('citation-js');

const sortObj = (obj) => {
    return Object.keys(obj).sort().reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

window.onload = async() => {
    if (localStorage.getItem('dic')) {
        document.querySelector('#ref').innerHTML = "";
        let sortedRef = sortObj(JSON.parse(localStorage.getItem('dic')));
        for (const auth in sortedRef) {
            if (sortedRef[auth] != '') {
                let citeation = await Cite.async(sortedRef[auth]);
                let ref = citeation.format(
                    'bibliography', 
                {
                    format: 'html',
                    template: 'apa',
                    lang: 'en-US'
                });
                document.querySelector('#ref').innerHTML += ref;
                document.querySelector('#ref').innerHTML += "<br>";
            }
        }
    }
}