import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { unregister } from './serviceWorker'
import App from './App'

unregister()

ReactDOM.render(<App />, document.getElementById('root'))
