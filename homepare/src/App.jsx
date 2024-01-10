import { useState } from 'react'
import './App.css'
import { Dashboard } from './dashboard'
import { Register } from './register'
import { Login } from './login'
import { Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  

  return (
    <>
    <MantineProvider>
    <Routes> 
      <Route
        path="/"
        element={<Dashboard />}
        />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
        />
    </Routes>
    </MantineProvider>
  
    </>
  )
}

export default App
