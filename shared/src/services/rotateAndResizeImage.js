import loadImage from 'blueimp-load-image'
import 'blueimp-canvas-to-blob'

function blobToFile(blob, name) {
  blob.lastModified = new Date().getTime()
  blob.lastModifiedDate = new Date()
  blob.name = name
  return blob
}


export default function(image, maxWidth, maxHeight) {
  return new Promise((resolve) => {
    loadImage(
      image,
      function(canvas) {
        canvas.toBlob((blob) => {
          resolve(blobToFile(blob, image.name))
        })
      },
      {orientation: true, maxWidth, maxHeight}
    )
  })
}
