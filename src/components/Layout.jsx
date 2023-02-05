import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useStateContext from '../hooks/useStateContext'

export default function Layout() {
  const { resetContext } = useStateContext()
  const navigate = useNavigate()
  const logout = () => {
    resetContext()
    navigate("/")
  }
  return (
    <>
    <AppBar position='fixed' sx={{ top: 0 }}>
      <Toolbar>
        <Typography
          variant='h4'
          align="center"
          sx={{flexGrow:1}}
        >
          Quiz App
          </Typography>
          <Button onClick={logout}>LOGOUT</Button>
      </Toolbar>
    </AppBar>
      <Outlet />
      </>
  )
}
