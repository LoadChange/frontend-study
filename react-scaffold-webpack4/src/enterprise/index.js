import React from 'react'
import ReactDom from 'react-dom'
import './css/index.scss'
import img from './img/merchant.png'
import img32 from './img/32.jpeg'

ReactDom.render((<div className="test">Hello <img src={img} alt=""/><img src={img32} alt=""/></div>), document.getElementById('root'))
