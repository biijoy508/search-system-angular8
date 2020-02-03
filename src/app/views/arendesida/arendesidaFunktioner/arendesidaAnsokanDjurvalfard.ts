export function redigeraAnsDjurValView(button: HTMLButtonElement) {
  const redigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.redigerbarAnsDjurElement');
  const oredigerbarAnsokanDjurvalfardElements = document.querySelectorAll('.oredigerbarAnsDjurElement');
  if (button.innerText === 'Redigera') {
    button.innerText = 'Spara';
    for (let i = 0; i < redigerbarAnsokanDjurvalfardElements.length; i++) {
      (redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'block';
    }
    for (let j = 0; j < oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'none';
    }
  } else if (button.innerText === 'Spara') {
    button.innerText = 'Redigera';
    for (let i = 0; i < redigerbarAnsokanDjurvalfardElements.length; i++) {
      (redigerbarAnsokanDjurvalfardElements[i] as HTMLDivElement).style.display = 'none';
    }
    for (let j = 0; j < oredigerbarAnsokanDjurvalfardElements.length; j++) {
      (oredigerbarAnsokanDjurvalfardElements[j] as HTMLDivElement).style.display = 'block';
    }
  }
}
