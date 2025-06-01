import { useEffect, useState } from 'react'
import { parseAll } from '../../funcs_idc/parser'
import { promptAnswers } from '../../funcs_idc/prompt_funcs'
import classes from './TextAreaList.module.css'
import { CustomTextArea } from '../CustomTextArea/CustomTextArea'

export const TextAreaList = () => {
  const [codeText, setCodeText] = useState("")
  const onCodeClicked = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setCodeText(text)
    } catch (err) {
      console.error('Ошибка при доступе к буферу обмена: ', err)
    }
  }
  const [promptText, setPromptText] = useState("")
  const onPromptClick = async () => {
    try {
      await navigator.clipboard.writeText(promptText)
    } catch (err) {
      console.error('Ошибка при доступе к буферу обмена: ', err)
    }
  }
  const [answersText, setAnswersText] = useState("")
  const onAIClick = async () => {
    if (promptText == "Задач не обнаружено.") {
      setAnswersText("А где вопросы?")
      return
    }
    setAnswersText("Думаем...")
    const answer = await promptAnswers(promptText);
    setAnswersText(answer);
  } 
  useEffect(() => {
    setPromptText(parseAll(codeText))
  }, [codeText])
  return (
    <div className={classes.list}>
      <CustomTextArea name='Код элемента:' buttonName='Вставить из буфера обмена'
      text={codeText} setText={setCodeText} onClick={onCodeClicked}></CustomTextArea>
      <CustomTextArea name='Промпт для нейросети:' buttonName='Скопировать' readonly
      text={promptText} setText={setPromptText} onClick={onPromptClick}></CustomTextArea>
      <CustomTextArea name='Ответ от нейросети:' buttonName='Получить ответы' readonly
      text={answersText} setText={setAnswersText} onClick={onAIClick}></CustomTextArea>
    </div>
  )
}
