export default {
  foo () {
    return 'foo'
  },
  randomNumber (max = 100) {
    return Math.floor(Math.random() * max) + 1
  },
  randomMS (min, max) {
    const random = Math.random() * (max - min) + min
    return Math.floor(random) * 1000
  },
  diffDaysTime (dayFrom, dayTo) {
    return (dayTo.getTime() - dayFrom.getTime()) / (1000 * 3600 * 24)
  },
  findUrlImgString (str) {
    if (!str) return false

    const regex = /\b(https?:\/\/\S+(?:png|jpe?g|webp|gif)\S*)\b/igm
    const images = str.match(regex)
    const text = str.replace(regex, '')

    return {
      images: images || null,
      text: text || null
    }
  }
}
