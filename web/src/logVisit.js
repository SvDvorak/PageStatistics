var xhr = new XMLHttpRequest();
xhr.open("POST", "http://pagestatistics.anwilc.com/visit", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4)
        console.log("Logged visit")
}
xhr.onerror = () => {
    console.log("Unable to log visit to statistics service")
}

var page = document.currentScript.getAttribute('page');
xhr.send(JSON.stringify({
    "page": page
}));