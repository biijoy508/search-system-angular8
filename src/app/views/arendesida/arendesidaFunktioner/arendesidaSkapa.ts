export function hanteraLaggTillBekraftaKnappStatus(selectElement, laggTillBekraftaKnapp) {
  if (selectElement.selectedIndex === 0 || selectElement.selectedIndex === -1) {
    laggTillBekraftaKnapp.setAttribute('disabled', 'disabled');
  }
  selectElement.addEventListener('change', () => {
    if (selectElement.selectedIndex === 0 || selectElement.selectedIndex === -1) {
      laggTillBekraftaKnapp.setAttribute('disabled', 'disabled');
    } else {
      laggTillBekraftaKnapp.removeAttribute('disabled');
    }
  });
}

export function avbrytLaggTill(skapaBlock, selectElement) {
  deselectLaggtillSelectElement(selectElement);
  skapaBlock.style.display = 'none';
}

export function deselectLaggtillSelectElement(selectElement) {
  selectElement.selectedIndex = -1;
  selectElement.dispatchEvent(new Event('change'));
}
