const { ipcRenderer } = require("electron");
const { $ } = require("./helper");
const musicAudio = new Audio();
let allTracks = [];
let currentTrack = null;

$("add-music-button").addEventListener("click", () => {
  ipcRenderer.send("add-music-window");
});

const renderListHTML = tracks => {
  const tracksList = $("tracks-list");
  const tracksListHTML = tracks.reduce((html, track) => {
    html += `
        <li
        class="row music-track list-group-item d-flex justify-content-between align-item-center"
        data-id=${track.id}
        data-path=${track.path}
        data-file-name=${track.fileName}
        >
            <div class="col-10">
                <i class="mr-2">🎵</i>
                <b class="pointer">${track.fileName}</b>
            </div>
            <div class="col-2">
                <span class="pointer js-play mr-3">▶️</span>
                <span class="pointer js-delete">❌</span>
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
  allTracks = tracks;
});

$("tracks-list").addEventListener("click", event => {
  event.preventDefault();
  const [eventName] = ["js-play", "js-pause", "js-delete"].filter(
    e => event.target.className.indexOf(e) >= 0
  );
  if (!eventName) return;
  const { dataset } = event.target.parentElement.parentElement;
  const { id, fileName, path } = dataset;
  if (eventName === "js-play") {
    if ((currentTrack && currentTrack.id !== id) || !currentTrack) {
      currentTrack = allTracks.find(track => track.id === id);
      musicAudio.src = encodeURI(currentTrack.path);
    }
    musicAudio.play();
    const [pre] = document.getElementsByClassName("js-pause");
    if (pre) {
      pre.innerHTML = "️️▶️";
      pre.classList.replace("js-pause", "js-play");
    }
    event.target.innerHTML = "⏸";
    event.target.classList.replace("js-play", "js-pause");
  }
  if (eventName === "js-pause") {
    musicAudio.pause();
    event.target.innerHTML = "▶️";
    event.target.classList.replace("js-pause", "js-play");
  }
  if (eventName === "js-delete") {
    if (currentTrack && currentTrack.id === id) {
      musicAudio.pause();
    }
    ipcRenderer.send("delete-track", id);
  }
  console.log(id, fileName, path);
});

const renderPlayerHTML = (name, duration) => {
  const player = $("player-status");
  const html = `
    <div class="col fot-weight-bold">
        正在播放：${name}
    </div>
    <div class="col">
        <span id="current-seeker">00:00</span> / ${duration}
    </div>
    `;
  player.innerHTML = html;
};
const updateProgressHTML = currentTime => {
  const seeker = $("current-seeker");
  seeker.innerHTML = currentTime;
};
musicAudio.addEventListener("loadedmetadata", () => {
  renderPlayerHTML(currentTrack.fileName, musicAudio.duration);
});

musicAudio.addEventListener("timeupdate", () => {
  updateProgressHTML(musicAudio.currentTime);
});
