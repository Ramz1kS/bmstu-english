// chat gpt generated because im a monkey that doesnt want to rewrite this whole thing
// on typescript on my own.

// turnt up im way to geeked, come get your girl off me, big drank been calling me
// don't kill the don't kill the don't kill the party please!

function parseSingleTask1(taskElement: Element): string[] {
  const extracted = extractQuestionAndAnswers(taskElement);
  const number = extractNumber(taskElement);
  return [`Task ${number}.`, extracted.question, extracted.answers];
}

function parseSingleTask2(taskElement: Element): string[] {
  const number = extractNumber(taskElement);
  return [`Task ${number}.`, extractTextAndOptions(taskElement)];
}

function extractTextAndOptions(taskElement: Element): string {
  let text = '';
  let ind = 0;
  const selects: string[][] = [];

  const taskContent = taskElement.getElementsByClassName('content');
  for (let element of Array.from(taskContent)) {
    for (let cringe of Array.from(element.getElementsByClassName('accesshide'))) {
      cringe.textContent = '';
    }
    for (let blank of Array.from(element.getElementsByClassName('sr-only'))) {
      blank.textContent = '';
    }
    for (let select of Array.from(element.querySelectorAll('select'))) {
      const blankOptions: string[] = [];
      for (let option of Array.from(select.querySelectorAll('option'))) {
        const optionText = option.textContent?.trim();
        if (optionText) {
          blankOptions.push(optionText);
        }
      }
      selects.push(blankOptions);
      select.textContent = `[[BLANK-${ind}]]`;
      ind += 1;
    }

    text = element.textContent?.trim() || '';

    ind = 0;
    for (let select of selects) {
      text = text.replace(`[[BLANK-${ind}]]`, `[${ind + 1}: ${select.join(', ')}]`);
      ind += 1;
    }
  }
  return text;
}

function extractQuestion(elements: HTMLCollectionOf<Element>): string {
  const questions: string[] = [];
  for (let element of Array.from(elements)) {
    const text = element.textContent?.trim();
    if (text) questions.push(text);
  }
  let res = questions.join('');
  while (res.includes('  ')) res = res.replace('  ', ' ');
  return res;
}

function extractAnswers(elements: HTMLCollectionOf<Element>): string {
  const answers: string[] = [];
  for (let element of Array.from(elements)) {
    const text = element.textContent?.trim();
    if (text) {
      for (let a of text.split('\n')) {
        a = a.trim();
        if (a) {
          const lastAnswer = answers[answers.length - 1];
          if (lastAnswer && lastAnswer.length <= 2 && lastAnswer.endsWith('.')) {
            answers[answers.length - 1] = lastAnswer + a;
          } else {
            answers.push(a);
          }
        }
      }
    }
  }
  return answers.join('; ');
}

function extractQuestionAndAnswers(element: Element): { question: string; answers: string; number: string } {
  const questionElements = element.getElementsByClassName('qtext');
  const answerElements = element.getElementsByClassName('answer');
  const numberElements = element.getElementsByClassName('qno');

  const question = extractQuestion(questionElements);
  const answers = extractAnswers(answerElements);
  const number = numberElements[0]?.textContent?.trim() || 'Unknown';

  return { question, answers, number };
}

function extractNumber(element: Element): string {
  const numberElements = element.getElementsByClassName('qno');
  return numberElements[0]?.textContent?.trim() || 'Unknown';
}

type Task = {
  type: number;
  element: Element;
};

function extractTasks(content: string): Task[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const pageContent = doc.getElementById('page-content');

  const tasks: Task[] = [];

  if (!pageContent) return tasks;

  const soup = pageContent.getElementsByClassName('que');

  for (let element of Array.from(soup)) {
    const hasSelect = element.getElementsByClassName('content')[0]?.querySelectorAll('select').length > 0;
    tasks.push({ type: hasSelect ? 2 : 1, element });
  }

  return tasks;
}

export function parseAll(content: string): string {
  try {
    const tasks = extractTasks(content);
    const lines: string[] = [];

    if (tasks.length === 0) return 'Задач не обнаружено.';

    if (tasks[0].type === 1) {
      console.log('task 1');
      lines.push(
        'Choose a, b or c to fill the gaps. Write the answers each on new line in the format: ' +
          'n) letter. answer, where n is the question number, letter is a, b or c and answer is the associated ' +
          'with the letter answer that fits the gap best. NOTHING ELSE should be in the answer!',
        ''
      );
    } else if (tasks[0].type === 2) {
      console.log('task 2');
      lines.push(
        'Choose the best word to fill the gap. Write the answers each on new line in the ' +
          'format: n. chosen_word, where n is the number of the blank and chosen_word is your choice. ' +
          'NOTHING ELSE should be in the answer!',
        ''
      );
    }

    for (let task of tasks) {
      if (task.type === 1) {
        lines.push(...parseSingleTask1(task.element), '');
      } else if (task.type === 2) {
        lines.push(...parseSingleTask2(task.element), '');
      }
    }

    return lines.join('\n');
  } catch (error) {
    return 'Ошибка при парсинге!';
  }
}
