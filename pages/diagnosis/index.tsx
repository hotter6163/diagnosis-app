import { useState } from 'react'
import type { NextPage } from 'next'
import Router from 'next/router'
import {
  Button,
  Typography
} from '@mui/material'

const Diagnosis:NextPage = () => {
  const handleClickResult = () => {
    Router.push('/diagnosis/results')
  }

  return (
    <main>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        className="text-3xl font-medium"
      >
        Apexキャラ診断
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        className="text-xl font-normal"
      >
        質問に答えてください。
      </Typography>
      <Button variant="contained" className="bg-blue-500" size="large" onClick={handleClickResult}>
        診断結果を見る
      </Button>
    </main>
  )
}


export default Diagnosis
