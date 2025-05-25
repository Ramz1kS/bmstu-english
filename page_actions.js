const contentElement = document.getElementById('content');
const readyElement = document.getElementById('ready');

contentElement.addEventListener('input', parse);

async function copyres() {
  await navigator.clipboard.writeText(readyElement.value)
}

async function pastebuf() {
  contentElement.value = await navigator.clipboard.readText()
  parse()
}

function parse() {
  if (contentElement.value) {
    readyElement.value = parseAll(contentElement.value);
  } else
    readyElement.value = 'Вы точно не забыли вставить HTML слева?';
}