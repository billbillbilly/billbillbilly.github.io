let fullText;

const string = "Author & Author (2021) wfwf(Jones, 2022)wf. Afddm, 2021 fsfksj Author and Auor (2021)hfksh (Author & Author, 2021). another citation ";

const one_auth_pattern1 = /(?<!and|&\s)([A-Z][a-z]+),\s(\d{4})/g;
const one_auth_pattern2 = /(?<!and|&\s)([A-Z][a-z]+)\s\((\d{4})\)/g;
const two_auth_pattern1 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+), (\d{4})/g;
const two_auth_pattern2 = /([A-Z][a-z]+ and [A-Z][a-z]+|[A-Z][a-z]+ & [A-Z][a-z]+) \((\d{4})\)/g;
const multi_auth_pattern = /([A-Z][a-z]+ et al\., \d{4})/g;

// console.log(string.match(two_auth_pattern2));

let authorList = [];
console.log(string.match(one_auth_pattern2));

// const runApp = () => {
//     if 
// }