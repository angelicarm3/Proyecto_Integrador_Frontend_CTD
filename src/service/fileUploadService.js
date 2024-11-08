import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios'
import { storage } from '../api/firebaseConfig'

const shortenUrlWithTinyUrl = async (longUrl) => {
  const tinyUrlApiUrl = 'https://api.tinyurl.com/create'
  const apiToken = '0kaOBjjo3qYlmT9iNWLVxQmtHBgQH42zy7NhBGRi4NGAqt0ZMdBqC9AEhf67'
  try {
    const response = await axios.post(
      tinyUrlApiUrl,
      {
        url: longUrl,
        domain: 'tiny.one'
      },
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.data.tiny_url
  } catch (error) {
    console.error('Error al acortar URL con TinyURL:', error)
    return longUrl
  }
}

const handleFileUpload = async (files) => {
  try {
    const urls = await Promise.all(
      files.map(async (file) => {
        const filename = `${crypto.randomUUID()}-${crypto.randomUUID()}`
        const storageRef = ref(storage, `images/${filename}`)
        await uploadBytes(storageRef, file)
        const longUrl = await getDownloadURL(storageRef)
        const shortUrl = await shortenUrlWithTinyUrl(longUrl)
        return shortUrl
      })
    )
    return urls
  } catch (error) {
    console.error('Error al subir archivos:', error)
    return []
  }
}

export default handleFileUpload
