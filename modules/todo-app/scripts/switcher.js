export async function switcher(btn) {
  btn.classList.toggle('local');
  btn.textContent = btn.classList.contains('local') ? 'change to database' : 'change to localstorage';
}

export function isLocalstorage(switchBtn, change = null) {
  if (window.localStorage.getItem('local') === null) {
    window.localStorage.setItem('local', 'true');
    return;
  }
  if (change) {
    if (window.localStorage.getItem('local') === 'true') {
      window.localStorage.setItem('local', 'false');
    } else window.localStorage.setItem('local', 'true');
    window.localStorage.getItem('local');
    return;
  }
  if (window.localStorage.getItem('local') === 'false') {
    switchBtn.classList.remove('local');
  } else {
    switchBtn.classList.add('local');
  }
  switchBtn.textContent = switchBtn.classList.contains('local') ? 'change to database' : 'change to localstorage';
}
