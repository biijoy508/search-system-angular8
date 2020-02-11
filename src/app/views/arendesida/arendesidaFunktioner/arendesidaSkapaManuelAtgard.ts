export function hanteraLaggTillAtgardBekraftaKnappStatus(atgardSelectElement, laggTillAtgardBekraftaKnapp) {
  if (atgardSelectElement.selectedIndex === 0 || atgardSelectElement.selectedIndex === -1) {
    laggTillAtgardBekraftaKnapp.setAttribute('disabled', 'disabled');
  }
  atgardSelectElement.addEventListener('change', () => {
    if (atgardSelectElement.selectedIndex === 0 || atgardSelectElement.selectedIndex === -1) {
      laggTillAtgardBekraftaKnapp.setAttribute('disabled', 'disabled');
    } else {
      laggTillAtgardBekraftaKnapp.removeAttribute('disabled');
    }
  });
}
export function avbrytLaggTillAtgard(skapaManuellAtgardBlock, atgardSelectElement) {
  deselectLaggtillAtgardSelectElement(atgardSelectElement);
  skapaManuellAtgardBlock.style.display = 'none';
}

export function deselectLaggtillAtgardSelectElement(atgardSelectElement) {
  atgardSelectElement.selectedIndex = -1;
  atgardSelectElement.dispatchEvent(new Event('change'));
}
