console.log('main script is loaded');
const dataUrl = '/data/test/'

const teacher = document.getElementById('teacher'); //
const klass = document.getElementById('class'); //
const replacement = document.getElementById('replacement'); //
const replacementClass = document.getElementById('replacementClass');
const hour = document.getElementById('hour'); //
const additionalInfo = document.getElementById('additionalInfo');
const room = document.getElementById('room');


function accessAdmin() {
    const password = window.prompt('Please Enter the Admin-Access Password');

    window.location.replace('/admin/' + password);
}

async function reloadPlan() {
    const responese = await fetch(dataUrl);
    const data = await responese.json();
    console.log(data);
    await writePlan(data);
}

async function writePlan(data) {
    
}

function main() {
    reloadPlan();
}

main();