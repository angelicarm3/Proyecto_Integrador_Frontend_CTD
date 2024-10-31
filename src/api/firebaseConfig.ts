import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCSKye8LmjlB9xzUQTbMbLwTRUzLhVhxo0',
  authDomain: 'uploadimage-57442.firebaseapp.com',
  projectId: 'uploadimage-57442',
  storageBucket: 'uploadimage-57442.appspot.com',
  messagingSenderId: '164462507131',
  appId: '1:164462507131:web:ffaf87c306fbf8f1c49ede',
  measurementId: 'G-X3NW2202R7'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
