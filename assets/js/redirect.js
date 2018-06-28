
var language = navigator.language.split('-')[0];
var redirectLanguage = 'en';

if (languagesSupported.indexOf(language) !== -1){
    redirectLanguage = language;
} 

var newLoc = '/' + redirectLanguage + location.pathname + location.hash;
window.location = newLoc;
document.querySelector('#redirect').setAttribute('href', newLoc);