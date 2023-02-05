import { Button, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api/api'
import { getFormatedTime } from '../helper/getFormatedTime'
import useStateContext from '../hooks/useStateContext'

export default function Results() {
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()
  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions:[]
    })
    navigate("/quiz")
  }
  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participants)
      .put(context.participantId, {
        id: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
  
  const ans = context.selectedOptions.map(a => a.answer == (a.selected + 1)).filter(a => a == true)
  const score = ans.length
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Congratulations!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            YOUR SCORE: {score} / 5
          </Typography>
          <Typography variant="h6">
            Took {getFormatedTime(context.timeTaken)} mins
          </Typography>
          <Button 
            variant='contained'
            sx={{ mx: 1 }}
          onClick={submitScore}>
            Submit
          </Button>
          <Button 
            variant='contained'
            sx={{ mx: 1 }}
          onClick={restart}>
            Retry
          </Button>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="./cup.png"
        alt="Live from space album cover"
      />
    </Card>
  )
}
