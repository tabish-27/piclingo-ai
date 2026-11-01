import {FastAverageColor} from 'fast-average-color' // ✅ use default import

const ColorExtractor = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject('No file provided')

    const imageUrl = URL.createObjectURL(file)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl

    img.onload = async () => {
      const fac = new FastAverageColor()
      try {
        const color = await fac.getColorAsync(img)
        resolve(color.rgb) // e.g., "rgb(123, 45, 67)"
      } catch (error) {
        reject(error)
      } finally {
        URL.revokeObjectURL(imageUrl)
      }
    }

    img.onerror = () => {
      reject('Image failed to load')
    }
  })
}

export default ColorExtractor
