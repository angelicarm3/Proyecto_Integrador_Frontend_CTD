import { useState } from 'react'

const useImageUpload = (maxFiles = 10) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [imagesRequiredError, setImagesRequiredError] = useState(false)

  const handleFileChange = (event) => {
    setImagesRequiredError(false)
    const files = Array.from(event.target.files).slice(0, maxFiles)
    setSelectedImages(files)
    setFilePreviews(files.map((file) => ({ url: URL.createObjectURL(file) })))
  }

  const removeImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index)
    const updatedPreviews = filePreviews.filter((_, i) => i !== index)

    setSelectedImages(updatedImages)
    setFilePreviews(updatedPreviews)
  }

  return { selectedImages, filePreviews, setFilePreviews, imagesRequiredError, setImagesRequiredError, handleFileChange, removeImage }
}

export default useImageUpload
