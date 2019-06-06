const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
const path = require("path");
let musicFilesPath = [];

$("select-music").addEventListener("click", () => {
  ipcRenderer.send("open-music-file");
});

const renderListHTML = pathes => {
  const musicList = $("music-list");
  const musicItemHTML = pathes.reduce((html, music) => {
    html += `<li class="list-group-item">${path.basename(music)}</li>`;
    return html;
  }, "");
  musicList.innerHTML = `<ul class="list-group">${musicItemHTML}</ul>`;
};
ipcRenderer.on("selected-file", (event, path) => {
  if (Array.isArray(path)) {
    musicFilesPath = path;
    renderListHTML(path);
  }
});

$("add-music").addEventListener("click", () => {
  ipcRenderer.send("add-tracks", musicFilesPath);
});
