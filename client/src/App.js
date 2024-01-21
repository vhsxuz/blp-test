import { Stack } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

const App = () => {
  return (
    <BrowserRouter>
      <Stack>
        <Router />
      </Stack>
    </BrowserRouter>
  )
}

export default App