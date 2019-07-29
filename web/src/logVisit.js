var page = document.currentScript.getAttribute('page');

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://pagestatistics.anwilc.com/visit", true);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status == 200)
        console.log("Logged visit with " + page);
}
xhr.onerror = () => {
    console.log("Unable to log visit to statistics service");
}

xhr.send(JSON.stringify({
    "page": page
}));