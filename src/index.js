import React from 'react'
import ReactDOM from 'react-dom/client'
import MathJax from 'react-mathjax'
import './styles/index.css'
import { App } from './App'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <MathJax.Provider>
            <App />
        </MathJax.Provider>
    </React.StrictMode>
)