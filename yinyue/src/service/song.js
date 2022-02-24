import { get } from './base'

export async function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  const result = await get('/api/getSongsUrl', {
    mid: songs.map((song) => song.mid)
  })

  const map = result.map
  return songs
    .map((song) => {
      song.url = map[song.mid]
      return song
    })
    .filter((song) => song.url && song.url.indexOf('vkey') > -1)
}
