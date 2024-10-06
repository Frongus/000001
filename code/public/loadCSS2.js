function loadCSSFile(filename) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = filename;
    document.head.appendChild(link);
}

function loadDeviceSpecificCSS() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 767) {
        // Mobile devices
        loadCSSFile('../css/style3.css');
    } else {
        // Desktop devices
        loadCSSFile('../css/style.css');
    }
}

window.onload = loadDeviceSpecificCSS;

window.onresize = loadDeviceSpecificCSS;