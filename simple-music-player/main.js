const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const DataStore = require("./MusicDataStore");
const myStore = new DataStore({ name: "MusicData" });
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

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.send("getTracks", myStore.getTracks());
  });

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
 
  ipcMain.on("add-tracks", (event, tracks) => {
    const updateTracks = myStore.addTracks(tracks).getTracks();
    mainWindow.send("getTracks", updateTracks);
  });
  ipcMain.on("delete-track", (event, deleteId) => {
    const updateTracks = myStore.deleteTracks(deleteId).getTracks();
    mainWindow.send("getTracks", updateTracks);
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
      }
    );
  });
});
