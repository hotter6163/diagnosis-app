import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyA9HoS5Rj5f67LoGt9XzQYNau_X3Hw2GIc",
  authDomain: "albona-internship.firebaseapp.com",
  projectId: "albona-internship",
  storageBucket: "albona-internship.appspot.com",
  messagingSenderId: "971560592339",
  appId: "1:971560592339:web:4e956279e24ef5727bc526"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

type FirebaseKeyType = 'character'

type CharacterType = {
  id: string
  name: string
  englishName: string
}

// CharacterType[]のためのアサーション関数
export const assertIsCharacters = (unknown: any): asserts unknown is CharacterType[] => {
  if (!Array.isArray(unknown)) throw new Error('assertIsCharacters: 配列ではありません')
  if (!unknown.every((row) => isCharacter(row))) {
    throw new Error('assertIsCharacters: CharacterTypeでない要素があります')
  }
}

// 引数がCharacterTypeかどうかを確認する
export const isCharacter = (unknown: any): boolean => {
  if (unknown === null) return false
  if (typeof unknown !== 'object') return false

  if (unknown.id !== 'string') return false
  if (unknown.name !== 'string') return false
  if (unknown.englishName !== 'string') return false

  return true
}

export const fetcherFirestore = async (key: FirebaseKeyType) => {
  const snapshot = await getDocs(collection(db, 'character'))
  return snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
}
