async function loadSongs() {
  try {
    const response = await fetch('/songs.json')
    const json = await response.json()

    return json
  } catch (err) {
    console.log(`Error: ${err}`)
    return {}
  }
}

export default loadSongs