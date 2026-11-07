(() => {
  const lb = document.getElementById('lb');
  const img = lb.querySelector('img');
  const cnt = lb.querySelector('.cnt');
  let list = [], i = 0;

  const show = () => {
    img.src = list[i].href;
    cnt.textContent = `${i + 1} / ${list.length}`;
  };
  const open = (a) => {
    list = [...document.querySelectorAll(`a[data-group="${a.dataset.group}"]`)];
    i = list.indexOf(a);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    show();
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; };
  const step = (d) => { i = (i + d + list.length) % list.length; show(); };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-group]');
    if (a) { e.preventDefault(); open(a); }
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.p').onclick = () => step(-1);
  lb.querySelector('.n').onclick = () => step(1);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
