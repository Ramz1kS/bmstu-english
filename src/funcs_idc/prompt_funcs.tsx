export async function promptAnswers(promptText: string): Promise<string> {
  const API_KEY = import.meta.env.VITE_API_KEY
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
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
    return data.choices?.[0]?.message?.content || "Нет ответа от модели.";
  } catch (err) {
    console.error("We got an error :(", err);
    return "Ошибка при отправке запроса :(";
  }
}