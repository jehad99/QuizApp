import { TextField, Button, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api/api'
import useForm from '../hooks/useForm'
import useStateContext from '../hooks/useStateContext'

export default function Login() {
  const getFreshModelObject = () => ({
    name: '',
    email: ''     
  })
  const { context, setContext, resetContext } = useStateContext()
  const navigate = useNavigate()
  const login = e => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participants)
        .post(values)
        .then(res => {
          console.log(res)
          setContext({ participantId: res.data.id })
          console.log(context)
          //after login (participant post) we navigate to Quiz component see the Routes in App.jsx
          navigate('/quiz')
        })
        .catch(err => console.error(err))
    }
  }

  const {
    values,
    setValues,
    error,
    setError,
    handleInputChange
  } = useForm(getFreshModelObject)
  
  useEffect(() => {
  resetContext()
}, [])

  const validate = () => {
    let temp = {}
    temp.name = values.name ? "" : "This field is required."
    temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
    setError(temp)
    return Object.values(temp).every(x => x == "")
  }
  return (
    <Card sx={{width:'400px'}}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant='h3' sx={{my:3}}>
          Quiz
        </Typography>
        <Box sx={{
          '& .MuiTextField-root': {
            m: 1,
            width:'90%',
          }
        }}>
        <form autoComplete='true' onSubmit={login}>
          <TextField
            label="Email"
            name='email'
            value={values.email}
            onChange={handleInputChange}
            variant='outlined'
            {...(error.email && {error:true, helperText:error.email})}
          />
          <TextField
            label="Name"
            name='name'
            value={values.name}
            onChange={handleInputChange}
            variant='outlined'
            {...(error.name && {error:true, helperText:error.name})}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            sx={{width:'90%'}}
          >Start</Button>
          </form>
        </Box>

      </CardContent>
    </Card>
  )
}
