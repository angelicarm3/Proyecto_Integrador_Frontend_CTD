import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '../api/firebaseConfig'

const handleFileUpload = async (files) => {
  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const filename = `${crypto.randomUUID()}-${crypto.randomUUID()}`
        const storageRef = ref(storage, `images/${filename}`)
        await uploadBytes(storageRef, file)
        return await getDownloadURL(storageRef)
      })
    )
    console.log(urls)
    return urls
  } catch (error) {
    console.error('Error al subir archivos:', error)
    return []
  }
}

export default handleFileUpload
