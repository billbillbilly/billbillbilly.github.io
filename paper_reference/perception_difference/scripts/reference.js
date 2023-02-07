// npm install citation-js
// npm install -g browserify
// browserify reference.js -o bundle.js

const Cite = require('citation-js');

const refList = {
    'Fan et al., 2017':'10.1109/ACII.2017.8273600',
    'Aiello et al., 2016':'10.1098/rsos.150690',
    'Gemmeke et al., 2017':'10.1109/ICASSP.2017.7952261',
    'Seresinhe et al., 2015': '10.1038/srep16899',
    'Xie et al., 2022': '10.1177/23998083211059838',
    'Konrad et al., 2021': '10.1002/pan3.10215',
}

const sortObj = (obj) => {
    return Object.keys(obj).sort().reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}

const sortedRef = sortObj(refList);

window.onload = async() => {
    for (const auth in sortedRef) {
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
