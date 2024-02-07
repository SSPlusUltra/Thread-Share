import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, HashRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import { ColorSchemeScript, MantineProvider, Text } from '@mantine/core';


ReactDOM.render(

  <React.StrictMode>
    <HashRouter>
    <MantineProvider forceColorScheme="dark">
      <App /> 
      </MantineProvider>
    </HashRouter>  
  </React.StrictMode> ,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
