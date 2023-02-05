import { Alert, Button, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api/api'
import { getFormatedTime } from '../helper/getFormatedTime'
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors'
import Answer from './Answer'

export default function Results() {
  const [ans, setAns] = useState([])
  const { context, setContext } = useStateContext(' ')
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId)
    createAPIEndpoint(ENDPOINTS.answers)
      .post(ids)
      .then(res => {
        setAns(context.selectedOptions
          .map(x => ({
            ...x,
            ...(res.data.find(y => y.id == x.qnId))
          })))          
        
        })
        .catch(err => console.error(err))
      }, [])
      const score = ans.map(a => a.selected + 1 == a.answer).filter(x => x == true).length

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
      .then(res => {
        console.log(res)
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        },4000)
      })
      .catch(err => console.error(err))
  }
  
  return (
    <>
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', m: 3 }}>
        <CardContent sx={{ flex: '1 0 auto', my: 1 }}>
          <Typography component="div" variant="h5">
            Congratulations!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            YOUR SCORE
          </Typography>
          <Typography variant="h5" component="div">
            <Typography variant="span" color="green">
              {score } 
            </Typography>/ 5
          </Typography> 
          <div>
            <Typography variant="p">
              Took {getFormatedTime(context.timeTaken)} mins
            </Typography>
          </div>
          <Button 
            variant='contained'
            sx={{ mx: 2 }}
          onClick={submitScore}>
            Submit
          </Button>
          <Button 
            variant='contained'
            sx={{ mx: 1 }}
          onClick={restart}>
            Retry
          </Button>
          <Alert
            variant='string'
            severity='success'
            sx={{visibility: showAlert ? 'visible':'hidden'}}
          >
            Score Updated
          </Alert>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="./cup.png"
        alt="Live from space album cover"
      />
      </Card>
      <Answer qnAns={ans} />
      </>
  )
}
