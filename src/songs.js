async function loadSongs() {
  const { default: songs } = await import(/* webpackChunkName: "songs" */ /* webpackPreload: true */ './songs.json')
  return songs
}

export default loadSongs