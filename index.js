try {
    require('electron-reloader')(module);
} catch (_) {}

const fs = require('fs');
const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
    }
});

    // and load the index.html of the app.
    win.loadFile('index.html');

    win.webContents.on('did-finish-load', function () {
        fs.readFile(__dirname + '/tailwind-ui.min.css', 'utf-8', function (
            error,
            data
        ) {
            console.log('ok');
            if (!error) {
                var formatedData = data.replace(/\s{2,10}/g, ' ').trim();
                win.webContents.insertCSS(formatedData);
            }
        });
    });

}

app.whenReady().then(createWindow);
