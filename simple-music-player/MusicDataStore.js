const Store = require("electron-store");
const uuidv4 = require("uuid/v4");
const path = require("path");

class DataStore extends Store {
  constructor(sttings) {
    super(sttings);
    this.tracks = this.get("tracks") || [];
  }

  saveTracks() {
    this.set("tracks", this.tracks);
    return this;
  }
  getTracks() {
    return this.get("tracks") || [];
  }
  addTracks(tracks) {
    const tracksWithProps = tracks
      .map(track => ({
        id: uuidv4(),
        path: track,
        fileName: path.basename(track)
      }))
      .filter(track => {
        const currentTracksPath = this.getTracks().map(track => track.path);
        return currentTracksPath.indexOf(track.path) < 0;
      });
    this.tracks = [...this.tracks, ...tracksWithProps];
    return this.saveTracks();
  }
  deleteTracks(deleteId) {
    this.tracks = this.tracks.filter(({ id }) => deleteId !== id);
    return this.saveTracks();
  }
}
module.exports = DataStore;
