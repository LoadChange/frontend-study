const { ipcRenderer } = require("electron");
const { $ } = require("./helper");

$("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

const renderListHTML = tracks => {
  const tracksList = $("tracks-list");
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `
        <li class="row music-track list-group-item d-flex justify-content-between align-item-center">
            <div class="col-10">
                <i class="mr-2">🎵</i>
                <b>${track.fileName}</b>
            </div>
            <div class="col-2">
                <span class="mr-3">▶️</span>
                <span>❌</span>
            </div>
        </li>`;
    return html;
  }, "");
  const emtyTrackHTML =
    '<div class="alert alert-primary">还没有添加任何音乐</div>';
  tracksList.innerHTML = tracks.length
    ? `<ul class="list-group">${tracksListHTML}</ul>`
    : emtyTrackHTML;
};

ipcRenderer.on("getTracks", (event, tracks) => {
  renderListHTML(tracks);
});
