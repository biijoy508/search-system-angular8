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
