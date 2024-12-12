import axios from 'axios'

// Tu clave API de DeepL
const apiKey = 'a7585ff0-d636-4195-990c-de4e5b373134:fx'

// Configura el endpoint de DeepL
const endpoint = 'https://api-free.deepl.com/v2/translate'

// Texto a traducir
const text = 'Hello, how are you?'

// Idioma de destino
const targetLang = 'en'
const sourceLang = 'es'

async function translateText (text) {
  try {
    const response = await axios.post(
      endpoint,
      new URLSearchParams({
        auth_key: apiKey, // Tu clave API
        text, // Texto a traducir
        target_lang: targetLang, // Idioma de destino
        source_lang: sourceLang
      })
    )
    return response.data.translations[0].text // Retorna la traducción
  } catch (error) {
    console.error('Error al traducir:', error.response ? error.response.data : error.message)
    return text // En caso de error, devuelve el texto original
  }
}

export { translateText }
