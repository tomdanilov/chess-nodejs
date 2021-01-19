const { app, BrowserWindow } = require('electron')
const DEBUG = true;
var win_future_width;

function createWindow () {
    if (DEBUG)
    {
        win_future_width = 800;
    } else {
        win_future_width = 600;
    }

    const win = new BrowserWindow({
        width: win_future_width,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.on('resize', function () {
        let size = win.getSize();
        let width  = size[0];

        win.setSize(width, width);
    });

    win.setMenu(null)
    
    if (DEBUG)
    {
        win.webContents.openDevTools()
    }

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
