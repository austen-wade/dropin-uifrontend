import truncate from "../truncate"

const hw = document.querySelector('.helloworld')
const button = hw?.querySelector('button')

button?.addEventListener('click', () => {
  if (button.textContent !== null) {
    button.textContent = truncate(button.textContent);
  }
});
