import classes from './Footer.module.css'

export const Footer = () => {
  return (
    <div className={classes.footer}>
      <div>
        <a href="https://github.com/Ramz1kS" target="_blank">Автор форка</a>
      </div>
      <div>
        <a href="https://github.com/siberianbearofficial" target="_blank">Автор парсера</a>
      </div>
      <div>
        <a href="https://t.me/addstickers/iu7_secondB" target="_blank">От ИУ7 с любовью</a>
      </div>
    </div>
  )
}
