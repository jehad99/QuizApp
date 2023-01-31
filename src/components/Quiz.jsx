import { Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from '../api/api'
import { getFormatedTime } from '../helper/getFormatedTime'
import useStateContext from '../hooks/useStateContext'

export default function Quiz() {
  const [qns, setQns] = useState([])
  const [qnIndex, setQnIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const {context, setContext} = useStateContext()
  let timer

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev+1)
    }, [1000])
  }

  const updateAnswer = (qnId, optionIndex) => {
    const temp = [...context.selectedOptions]
    temp.push({
      qnId,
      selected: optionIndex
    })
    if (qnIndex < 4) {
      setContext({selectedOptions:[...temp]})
      setQnIndex(qnIndex + 1)
    }
    else {
      setContext({selectedOptions:[...temp], timeTaken})
    }
  }

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions:[]
    })
    // fetch every reload
    createAPIEndpoint(ENDPOINTS.questions)
      .fetch()
      .then(res => {
        setQns(res.data)
        startTimer()
        console.log(res.data)
      })
      .catch(err => console.error(err))
    return () => {clearInterval(timer)}
  }, [])

  return (
    qns.length != 0 ?
      <Card  sx={{width:"400px", m:"auto"}}>
        <CardHeader
          title={'Question ' + (qnIndex + 1) + ' of 5'}
          action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
        />
        <Box>
          <LinearProgress variant='determinate' value={(qnIndex+1)*100/5} />
        </Box>
        {qns[qnIndex].imgName != null ?
          <CardMedia
            component="img"
            image={BASE_URL + 'images/' + qns[qnIndex].imgName}            
          />
          : null
        }
        <CardContent>
          <Typography variant='h6'>
            {qns[qnIndex].qnInWords}
          </Typography>
          <List>
            {qns[qnIndex].options.map((item, idx) => 
              <ListItemButton key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                <div>
                  <b>{ String.fromCharCode(65+idx) + " . "}</b>{item}
                </div>
              </ListItemButton>
            )}
          </List>
        </CardContent>
      </Card>
      :null
  )
}
