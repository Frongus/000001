console.log('admin script loaded');

const fileInput = document.getElementById('file');
const checkBtn = document.getElementById('checkButton');
const infoText = document.getElementById('uploadInfoText');

var serverPath = ''
var password = "";

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        infoText.innerHTML = `Die folgende Datei ist ausgewählt: ${fileInput.files[0].name}`;
    } else {
        infoText.innerHTML = 'Keine Datei ausgewählt';
    }
});

function uploadPlan() {
    serverPath = '/data/setPlan/';
    if (!fileInput.files.length) {
        alert('Keine Datei Ausgewählt');
        return;
    }

    if (!checkBtn.checked) {
        alert('Bitte Checkbox ankreuzen um zu bestätigen dass die Korrekte Datei ausgewählt wurde');
        return;
    }

    password = window.prompt('Bitte Plan Passwort eingeben');
    if (!password) {
        alert('Passwort erforderlich');
        return;
    }

    console.log('Beginning upload');
    sendToServer(fileInput.files[0], password);
}

function uploadPlan2() {
    serverPath = '/data/setNews/';  
    if (!fileInput.files.length) {
        alert('Keine Datei Ausgewählt');
        return;
    }

    if (!checkBtn.checked) {
        alert('Bitte Checkbox ankreuzen um zu bestätigen dass die Korrekte Datei ausgewählt wurde');
        return;
    }

    password = window.prompt('Bitte Plan Passwort eingeben');
    if (!password) {
        alert('Passwort erforderlich');
        return;
    }

    console.log('Beginning upload');
    sendToServer(fileInput.files[0], password);
}

async function sendToServer(file, pass) {

    if(!file.name.includes('.pdf')) {
        return(alert("Datei ist keine Pdf Datei!"));
    }

    console.log('Uploading file:', file.name);


    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', pass); 

    try {

        const response = await fetch(serverPath, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error response from server:', errorMessage);
            alert(`Error: ${errorMessage}`);
            return;
        }

        const result = await response.json();
        console.log('Server response:', result);

        if (result && result.message) {
            alert(result.message);
        } else {
            alert('Upload erfolgreich!');
        }

    } catch (error) {
        console.error('Error during upload:', error);
        alert('Fehler beim Hochladen der Datei.');
    }
}

function accessNews() {
    const password = window.prompt('Please Enter the NewsManagement-Access Password');

    window.location.replace('/newsManagement/' + password);
}