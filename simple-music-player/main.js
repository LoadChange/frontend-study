const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const Store = require('electron-store');
const store = new Store();
console.log(app.getPath('userData'))
store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined
class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    };
    const finalConfig = Object.assign(basicConfig, config);
    super(finalConfig);
    this.loadFile(fileLocation);
    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

app.on("ready", () => {
  const mainWindow = new AppWindow({}, "./renderer/index.html");

  ipcMain.on("add-music-window", () => {
    const addWindow = new AppWindow(
      {
        width: 500,
        height: 400,
        webPreferences: {
          nodeIntegration: true
        }, 
        parent: mainWindow 
      },
      "./renderer/add.html"
    );
  });
  ipcMain.on("open-music-file", event => {
    dialog.showOpenDialog(
      {
        properties: ["openFile", "multiSelections"],
        filters: [{ name: "Music", extensions: ["mp3"] }]
      },
      files => {
        if (files) {
          event.sender.send("selected-file", files);
        }
        console.log(files);
      }
    );
  });
});
