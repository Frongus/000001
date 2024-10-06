const updateDate = document.getElementById('updateDate');

function setDate() {
    var currentdate = new Date();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = `${dd}-${mm}-${yyyy}`;
    var datetime = "Datum: " + today + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    updateDate.innerHTML = datetime;
}

setInterval(function() {
    setDate();
}, 100);