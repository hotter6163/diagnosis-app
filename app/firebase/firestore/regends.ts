import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'

import { app } from '../app'

export const db = getFirestore(app)

export const regends = [
  'pathfinder', 'loba',       'bloodhound', 'gibraltar',  'lifeline',
  'wraith',     'bangalore',  'coustic',    'mirage',     'octane',
  'wattson',    'crypto',     'revenant',   'rampart',    'horizon',
  'fuse',       'valkyrie',    'seer',       'ash',       'madmaggie',
  'newcastle',
] as const
export type RegendNameType = typeof regends[number]

export type RegendType = {
  id: string
  name: string
  englishName: string
}

// CharacterType[]のためのアサーション関数
export function assertIsRegends(unknown: any): asserts unknown is RegendType[] {
  if (!Array.isArray(unknown)) throw new Error('assertIsCharacters: 配列ではありません')
  if (!unknown.every((row) => isRegend(row))) {
    throw new Error('assertIsCharacters: CharacterTypeでない要素があります')
  }
}

// 引数がCharacterTypeかどうかを確認する
export const isRegend = (unknown: any): boolean => {
  if (unknown === null) return false
  if (typeof unknown !== 'object') return false

  if (typeof unknown.id !== 'string') return false
  if (typeof unknown.name !== 'string') return false
  if (typeof unknown.englishName !== 'string') return false

  return true
}

export const fetchAllRegends = async (): Promise<RegendType[]> => {
  const snapshot = await getDocs(collection(db, 'character'))
  const allData = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  assertIsRegends(allData)

  return allData
}
