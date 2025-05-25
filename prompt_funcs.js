async function promptAnswers() {
  const answersElem = document.getElementById('answers')
  const apiKey = document.getElementById('api_input').value;
  if (apiKey == "") {
    answersElem.value = "Вы не вставили API ключ в соответствующее поле!"
    return
  }
  const promptText = document.getElementById('ready').value;
  if (promptText == "") {
    answersElem.value = "Мне нечего спрашивать у нейронки"
    return
  }
  if (promptText == "Ошибка при парсинге!") {
    answersElem.value = "Пропарси нормально да, не мороси"
    return
  }
  if (promptText == "Вы точно не забыли вставить HTML слева?") {
    answersElem.value = "Видимо, забыли..."
    return
  }
  try {
    answersElem.value = "Думаем..."
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-small-3.1-24b-instruct:free",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": promptText
              }
            ]
          }
        ]
      })
    });
    const data = await response.json();
    answersElem.value = data.choices?.[0]?.message?.content || "Нет ответа от модели.";
  } catch (err) {
    console.error("We got an error :(", err);
    answersElem.value = "Ошибка при отправке запроса: " + err.message;
  }
}