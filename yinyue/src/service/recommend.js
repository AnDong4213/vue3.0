import { get } from './base'

export function getRecommend() {
  return get('/api/getRecommend')
}

export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}
const m = 1
// export const m = 1
// export { m }
export default m
console.log(m)
