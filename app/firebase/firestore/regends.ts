import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore/lite'

import { app } from '../app'

export const db = getFirestore(app)

// 初期キャラのみでとりあえず作成
export const regends = [
  'pathfinder', 'bloodhound', 'gibraltar',
  'wraith',     'bangalore',  'lifeline',
]

// シーズン13時点の全キャラ
// 今はコメントアウト
// export const regends = [
//   'pathfinder', 'loba',       'bloodhound', 'gibraltar',  'lifeline',
//   'wraith',     'bangalore',  'coustic',    'mirage',     'octane',
//   'wattson',    'crypto',     'revenant',   'rampart',    'horizon',
//   'fuse',       'valkyrie',    'seer',       'ash',       'madmaggie',
//   'newcastle',
// ] as const
export type RegendNameType = typeof regends[number]

export type RegendType = {
  id: string
  name: string
  englishName: string
  textColor: string
}

// CharacterType[]のためのアサーション関数
export function assertIsRegends(unknown: any): asserts unknown is RegendType[] {
  if (!Array.isArray(unknown)) throw new Error('assertIsCharacters: 配列ではありません')
  if (!unknown.length) throw new Error('assertIsCharacters: データの取得に失敗しています')
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
  if (typeof unknown.textColor !== 'string') return false

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

export const fetchorRegendByEnglishName = (key: RegendNameType) => {
  return getDocs(
    query(
      collection(db, 'character'),
      where('englishName', '==', key)
    )
  )
}

export const fetchRegendByEnglishName =  async (name: RegendNameType): Promise<RegendType> => {
  const snapshot = await getDocs(
    query(
      collection(db, 'character'),
      where('englishName', '==', name)
    )
  )

  const allData = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  assertIsRegends(allData)

  return allData[0]
}
