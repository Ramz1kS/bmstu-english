import { useState } from 'react'
import './App.css'
import { CustomTextArea } from './components/CustomTextArea/CustomTextArea'
import { Footer } from './components/Footer/Footer'
import { TextAreaList } from './components/TextAreaList/TextAreaList'

function App() {
  return (
    <div className="mainContainer">
      <div className="greeting">
        <h1>ЧЁ, ОТВЕТОВ ЗАХОТЕЛ?</h1>
        <p>да пожалуйста! тебе нужно только...</p>
      </div>
      <TextAreaList></TextAreaList>
      <Footer></Footer>
    </div>
  )
}

export default App
