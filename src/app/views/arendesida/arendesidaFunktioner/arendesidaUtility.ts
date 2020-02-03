export function showToaster(message: any) {
  const toaster = document.querySelector('.c-toaster') as HTMLDivElement;
  const toasterMessage = toaster.querySelector('.toasterMessage');
  toaster.style.display = 'block';
  toasterMessage.innerHTML = message;
  setTimeout(() => {
    closeToaster(toaster, toasterMessage);
  }, 2000);
}
export function closeToaster(toaster, toasterMessage) {
  toaster.style.display = 'none';
  toasterMessage.innerHTML = '';
}

export function kontrolleraFlikar(arende) {
  if (arende.ansokansTyp === 'UTBET') {
    toggleAktivFlik(arende.status);
    kontrolleraAnsokanDjurvalfard(arende.arendeTyp);
  } else {
    const utbetFlikar = document.querySelector('#utbetFlikar') as HTMLElement;
    if (utbetFlikar) {
      utbetFlikar.style.display = 'none';
    }
  }
}

export function toggleAktivFlik(arendeStatus: string) {
  if (arendeStatus === 'BESL' || arendeStatus === 'BER') {
    document.getElementById('beslut').click();
  } else {
    document.getElementById('ansokanDjurvalfard').click();
  }
}

export function kontrolleraAnsokanDjurvalfard(arendeTyp: string) {
  if (arendeTyp !== 'FARERS' && arendeTyp !== 'KLOVERS' && arendeTyp !== 'SUGGERS') {
    const ansokanDjurvalfardElement = document.getElementById('ansokanDjurvalfard') as HTMLElement;
    ansokanDjurvalfardElement.style.display = 'none';
    ansokanDjurvalfardElement.setAttribute('aria-selected', 'false');
    document.getElementById('attribut').click();
  }
}
