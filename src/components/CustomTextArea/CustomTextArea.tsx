import { type FC } from 'react'
import classes from './CustomTextArea.module.css'

interface CustomTextAreaProps {
  name?: string
  buttonName?: string
  readonly?: boolean
  placeholder?: string
  text: string
  setText: (val: string | ((val: string) => string)) => void
  onClick?: (val: any) => any
}

export const CustomTextArea: FC<CustomTextAreaProps> = ({
  name = "Это текстовое поле", buttonName = "Нажми на меня", placeholder, readonly = false,
  text, setText, onClick = () => {}
}) => {
  return (
    <div className={classes.textAreaContainer}>
      <p>{name}</p>
      <textarea
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)} 
      readOnly={readonly}
      cols={50} 
      rows={30}></textarea>
      {onClick ? <button onClick={onClick}>{buttonName}</button> : <></>}
    </div>
  )
}
