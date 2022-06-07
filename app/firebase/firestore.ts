import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'

import { app } from './app'

export const db = getFirestore(app)

type FirebaseKeyType = 'character'

export type CharacterType = {
  id: string
  name: string
  englishName: string
}

// CharacterType[]のためのアサーション関数
export function assertIsCharacters(unknown: any): asserts unknown is CharacterType[] {
  if (!Array.isArray(unknown)) throw new Error('assertIsCharacters: 配列ではありません')
  if (!unknown.every((row) => isCharacter(row))) {
    throw new Error('assertIsCharacters: CharacterTypeでない要素があります')
  }
}

// 引数がCharacterTypeかどうかを確認する
export const isCharacter = (unknown: any): boolean => {
  if (unknown === null) return false
  if (typeof unknown !== 'object') return false

  if (typeof unknown.id !== 'string') return false
  if (typeof unknown.name !== 'string') return false
  if (typeof unknown.englishName !== 'string') return false

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
